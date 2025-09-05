#!/usr/bin/env node

/**
 * Continuous Integration Performance Testing
 * Runs comprehensive performance tests and validates against budgets
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Performance budgets (in ms unless specified)
const PERFORMANCE_BUDGET = {
  lcp: 2500,     // Largest Contentful Paint
  fid: 100,      // First Input Delay  
  cls: 0.1,      // Cumulative Layout Shift
  inp: 200,      // Interaction to Next Paint
  fcp: 1800,     // First Contentful Paint
  si: 3000,      // Speed Index
  tti: 5000,     // Time to Interactive
  tbt: 300,      // Total Blocking Time
  bundleSize: 1000000, // 1MB in bytes
  performanceScore: 90,
  accessibilityScore: 95,
  bestPracticesScore: 90,
  seoScore: 95
};

// Test configurations
const TEST_CONFIGS = [
  {
    name: 'desktop',
    device: 'desktop',
    throttling: 'desktopDense4G',
    formFactor: 'desktop'
  },
  {
    name: 'mobile',
    device: 'mobile',
    throttling: 'mobileRegular3G', 
    formFactor: 'mobile'
  }
];

/**
 * Run Lighthouse tests
 */
async function runLighthouseTests() {
  console.log('🚀 Starting Lighthouse CI tests...\n');
  
  return new Promise((resolve, reject) => {
    const lhci = spawn('npx', ['@lhci/cli', 'autorun'], {
      stdio: 'inherit',
      env: { ...process.env, CI: 'true' }
    });
    
    lhci.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Lighthouse tests completed successfully');
        resolve();
      } else {
        console.error('❌ Lighthouse tests failed with code', code);
        reject(new Error(`Lighthouse tests failed with code ${code}`));
      }
    });
  });
}

/**
 * Analyze bundle size
 */
async function analyzeBundleSize() {
  console.log('📦 Analyzing bundle size...');
  
  const buildManifest = path.join(__dirname, '..', '.next', 'build-manifest.json');
  
  if (!fs.existsSync(buildManifest)) {
    console.warn('⚠️  Build manifest not found. Run `npm run build` first.');
    return { passed: false, size: 0 };
  }
  
  const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
  
  // Calculate total bundle size
  let totalSize = 0;
  const bundleFiles = [];
  
  // Get all JavaScript files from the manifest
  Object.values(manifest.pages).forEach(files => {
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(__dirname, '..', '.next', 'static', file);
        if (fs.existsSync(filePath)) {
          const size = fs.statSync(filePath).size;
          totalSize += size;
          bundleFiles.push({ file, size });
        }
      }
    });
  });
  
  const passed = totalSize <= PERFORMANCE_BUDGET.bundleSize;
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
  const budgetMB = (PERFORMANCE_BUDGET.bundleSize / 1024 / 1024).toFixed(2);
  
  console.log(`   Bundle size: ${sizeMB}MB (budget: ${budgetMB}MB)`);
  
  if (passed) {
    console.log('   ✅ Bundle size within budget');
  } else {
    console.log('   ❌ Bundle size exceeds budget');
    console.log('   Largest files:');
    bundleFiles
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .forEach(({ file, size }) => {
        console.log(`     - ${file}: ${(size / 1024).toFixed(1)}KB`);
      });
  }
  
  return { passed, size: totalSize, files: bundleFiles };
}

/**
 * Check performance regression
 */
async function checkPerformanceRegression() {
  console.log('📊 Checking for performance regressions...');
  
  const currentReport = path.join(__dirname, '..', '.lighthouseci', 'manifest.json');
  const previousReport = path.join(__dirname, '..', 'reports', 'lighthouse-baseline.json');
  
  if (!fs.existsSync(currentReport)) {
    console.warn('⚠️  No current Lighthouse report found');
    return { passed: true, regressions: [] };
  }
  
  if (!fs.existsSync(previousReport)) {
    console.log('   ℹ️  No baseline report found. Saving current as baseline...');
    fs.copyFileSync(currentReport, previousReport);
    return { passed: true, regressions: [] };
  }
  
  const current = JSON.parse(fs.readFileSync(currentReport, 'utf8'));
  const previous = JSON.parse(fs.readFileSync(previousReport, 'utf8'));
  
  const regressions = [];
  const REGRESSION_THRESHOLD = 0.05; // 5% regression threshold
  
  // Compare key metrics
  const metricsToCheck = ['performance', 'accessibility', 'best-practices', 'seo'];
  
  metricsToCheck.forEach(metric => {
    const currentScore = current[0]?.summary?.[metric] || 0;
    const previousScore = previous[0]?.summary?.[metric] || 0;
    
    const regression = (previousScore - currentScore) / previousScore;
    
    if (regression > REGRESSION_THRESHOLD) {
      regressions.push({
        metric,
        current: currentScore,
        previous: previousScore,
        regression: Math.round(regression * 100)
      });
    }
  });
  
  if (regressions.length > 0) {
    console.log('   ❌ Performance regressions detected:');
    regressions.forEach(reg => {
      console.log(`     - ${reg.metric}: ${reg.previous}% → ${reg.current}% (${reg.regression}% regression)`);
    });
  } else {
    console.log('   ✅ No significant performance regressions detected');
  }
  
  return { passed: regressions.length === 0, regressions };
}

/**
 * Generate performance report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    passed: results.every(r => r.passed),
    summary: {
      lighthouse: results.find(r => r.name === 'lighthouse'),
      bundleSize: results.find(r => r.name === 'bundleSize'), 
      regression: results.find(r => r.name === 'regression')
    },
    budget: PERFORMANCE_BUDGET
  };
  
  // Save report
  const reportsDir = path.join(__dirname, '..', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportsDir, `performance-ci-${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📋 Performance CI Report:`);
  console.log(`   Timestamp: ${report.timestamp}`);
  console.log(`   Overall: ${report.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Report saved to: ${reportPath}`);
  
  return report;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎯 AIKinkLab Performance CI\n');
  
  const results = [];
  
  try {
    // 1. Run Lighthouse tests
    try {
      await runLighthouseTests();
      results.push({ name: 'lighthouse', passed: true });
    } catch (error) {
      results.push({ name: 'lighthouse', passed: false, error: error.message });
    }
    
    // 2. Check bundle size
    const bundleResult = await analyzeBundleSize();
    results.push({ name: 'bundleSize', passed: bundleResult.passed, data: bundleResult });
    
    // 3. Check for regressions
    const regressionResult = await checkPerformanceRegression();
    results.push({ name: 'regression', passed: regressionResult.passed, data: regressionResult });
    
    // 4. Generate report
    const report = generateReport(results);
    
    // Exit with appropriate code
    const exitCode = report.passed ? 0 : 1;
    
    if (exitCode === 0) {
      console.log('\n🎉 All performance checks passed!');
    } else {
      console.log('\n💥 Some performance checks failed!');
      console.log('   Please review the issues above and optimize accordingly.');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    console.error('\n💥 Performance CI failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { 
  runLighthouseTests, 
  analyzeBundleSize, 
  checkPerformanceRegression,
  PERFORMANCE_BUDGET 
};