#!/usr/bin/env node

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

/**
 * Performance Testing Suite for AIKinkLab
 * Measures Core Web Vitals and generates comprehensive performance report
 */

const URLS = [
  'http://localhost:3000',
  'http://localhost:3000/test',
  'http://localhost:3000/bdsm-test', 
  'http://localhost:3000/lab',
  'http://localhost:3000/lab/what-is-my-kink-test'
];

const CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'
  }
};

const MOBILE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150 * 3.75,
      downloadThroughputKbps: 1638.4,
      uploadThroughputKbps: 675
    },
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 2.625,
      disabled: false,
    }
  }
};

async function runLighthouse(url, config, device = 'desktop') {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json'
    }, config);
    
    await chrome.kill();
    return result;
  } catch (error) {
    await chrome.kill();
    throw error;
  }
}

function extractMetrics(result) {
  const audits = result.audits;
  const categories = result.categories;
  
  return {
    performance: categories.performance.score * 100,
    accessibility: categories.accessibility.score * 100,
    bestPractices: categories['best-practices'].score * 100,
    seo: categories.seo.score * 100,
    metrics: {
      // Core Web Vitals
      lcp: audits['largest-contentful-paint'].numericValue,
      fid: audits['max-potential-fid'].numericValue,
      cls: audits['cumulative-layout-shift'].numericValue,
      inp: audits['experimental-interaction-to-next-paint']?.numericValue || 0,
      
      // Loading Performance
      fcp: audits['first-contentful-paint'].numericValue,
      si: audits['speed-index'].numericValue,
      tti: audits['interactive'].numericValue,
      tbt: audits['total-blocking-time'].numericValue,
      
      // Resource Metrics
      totalByteWeight: audits['total-byte-weight'].numericValue,
      unusedCssRules: audits['unused-css-rules'].details?.overallSavingsBytes || 0,
      unusedJavaScript: audits['unused-javascript'].details?.overallSavingsBytes || 0,
      modernImageFormats: audits['modern-image-formats'].details?.overallSavingsBytes || 0,
      
      // Network Metrics
      networkRequests: audits['network-requests'].details?.items?.length || 0,
      mainThreadWork: audits['mainthread-work-breakdown'].numericValue,
      bootupTime: audits['bootup-time'].numericValue,
    },
    opportunities: {
      renderBlockingResources: audits['render-blocking-resources'].details?.overallSavingsMs || 0,
      unusedCss: audits['unused-css-rules'].details?.overallSavingsBytes || 0,
      unusedJs: audits['unused-javascript'].details?.overallSavingsBytes || 0,
      nextGenImages: audits['modern-image-formats'].details?.overallSavingsBytes || 0,
      imageSizing: audits['uses-responsive-images'].details?.overallSavingsBytes || 0,
      textCompression: audits['uses-text-compression'].details?.overallSavingsBytes || 0,
    }
  };
}

function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      desktop: {},
      mobile: {}
    },
    pages: {},
    recommendations: []
  };

  // Process results for each URL and device
  Object.keys(results).forEach(url => {
    const urlResults = results[url];
    
    report.pages[url] = {
      desktop: urlResults.desktop ? extractMetrics(urlResults.desktop.lhr) : null,
      mobile: urlResults.mobile ? extractMetrics(urlResults.mobile.lhr) : null
    };
  });

  // Calculate averages
  ['desktop', 'mobile'].forEach(device => {
    const deviceResults = Object.values(report.pages)
      .map(page => page[device])
      .filter(Boolean);
    
    if (deviceResults.length > 0) {
      report.summary[device] = {
        performance: Math.round(deviceResults.reduce((sum, r) => sum + r.performance, 0) / deviceResults.length),
        accessibility: Math.round(deviceResults.reduce((sum, r) => sum + r.accessibility, 0) / deviceResults.length),
        bestPractices: Math.round(deviceResults.reduce((sum, r) => sum + r.bestPractices, 0) / deviceResults.length),
        seo: Math.round(deviceResults.reduce((sum, r) => sum + r.seo, 0) / deviceResults.length),
        avgLcp: Math.round(deviceResults.reduce((sum, r) => sum + r.metrics.lcp, 0) / deviceResults.length),
        avgFid: Math.round(deviceResults.reduce((sum, r) => sum + r.metrics.fid, 0) / deviceResults.length),
        avgCls: (deviceResults.reduce((sum, r) => sum + r.metrics.cls, 0) / deviceResults.length).toFixed(3),
        avgTotalBytes: Math.round(deviceResults.reduce((sum, r) => sum + r.metrics.totalByteWeight, 0) / deviceResults.length)
      };
    }
  });

  // Generate recommendations
  const desktopAvg = report.summary.desktop;
  const mobileAvg = report.summary.mobile;

  if (desktopAvg.performance < 90) {
    report.recommendations.push({
      priority: 'high',
      category: 'performance',
      issue: 'Performance score below 90',
      recommendation: 'Implement code splitting, optimize images, and reduce JavaScript bundle size'
    });
  }

  if (desktopAvg.avgLcp > 2500) {
    report.recommendations.push({
      priority: 'high', 
      category: 'core-web-vitals',
      issue: `LCP is ${Math.round(desktopAvg.avgLcp)}ms (should be < 2.5s)`,
      recommendation: 'Optimize largest contentful paint by preloading critical resources and optimizing images'
    });
  }

  if (parseFloat(desktopAvg.avgCls) > 0.1) {
    report.recommendations.push({
      priority: 'medium',
      category: 'core-web-vitals', 
      issue: `CLS is ${desktopAvg.avgCls} (should be < 0.1)`,
      recommendation: 'Add size attributes to images and reserve space for dynamic content'
    });
  }

  if (desktopAvg.avgTotalBytes > 1000000) {
    report.recommendations.push({
      priority: 'high',
      category: 'optimization',
      issue: `Total byte weight is ${Math.round(desktopAvg.avgTotalBytes / 1024)}KB`,
      recommendation: 'Implement image optimization, code splitting, and remove unused dependencies'
    });
  }

  return report;
}

async function main() {
  console.log('🚀 Starting AIKinkLab Performance Analysis...\n');
  
  const results = {};
  
  for (const url of URLS) {
    console.log(`📊 Testing ${url}...`);
    results[url] = {};
    
    try {
      // Desktop test
      console.log('  - Desktop...');
      results[url].desktop = await runLighthouse(url, CONFIG, 'desktop');
      
      // Mobile test  
      console.log('  - Mobile...');
      results[url].mobile = await runLighthouse(url, MOBILE_CONFIG, 'mobile');
      
      console.log('  ✅ Complete\n');
    } catch (error) {
      console.error(`  ❌ Error testing ${url}:`, error.message);
    }
  }

  // Generate report
  const report = generateReport(results);
  
  // Save detailed report
  const reportsDir = path.join(__dirname, '..', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportsDir, `performance-report-${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('📈 Performance Summary:');
  console.log('======================');
  
  ['desktop', 'mobile'].forEach(device => {
    const summary = report.summary[device];
    if (summary) {
      console.log(`\n${device.toUpperCase()}:`);
      console.log(`  Performance: ${summary.performance}/100`);
      console.log(`  Accessibility: ${summary.accessibility}/100`);
      console.log(`  Best Practices: ${summary.bestPractices}/100`);
      console.log(`  SEO: ${summary.seo}/100`);
      console.log(`  Avg LCP: ${summary.avgLcp}ms`);
      console.log(`  Avg FID: ${summary.avgFid}ms`);
      console.log(`  Avg CLS: ${summary.avgCls}`);
      console.log(`  Avg Bundle Size: ${Math.round(summary.avgTotalBytes / 1024)}KB`);
    }
  });

  if (report.recommendations.length > 0) {
    console.log('\n🎯 Optimization Recommendations:');
    console.log('================================');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.issue}`);
      console.log(`   → ${rec.recommendation}\n`);
    });
  }
  
  console.log(`\n📊 Detailed report saved to: ${reportPath}`);
  console.log('\n✨ Analysis complete!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runLighthouse, extractMetrics, generateReport };