# AIKinkLab Deployment Guide

## Overview

This guide provides detailed instructions for deploying AIKinkLab across different environments. It covers automated CI/CD processes, manual deployment procedures, and troubleshooting steps.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Automated Deployments](#automated-deployments)
4. [Manual Deployments](#manual-deployments)
5. [Environment Management](#environment-management)
6. [Rollback Procedures](#rollback-procedures)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

## Prerequisites

### Required Tools
- Node.js 18+ and npm
- Git
- Vercel CLI (`npm install -g vercel`)
- GitHub CLI (`gh`) for release management

### Required Access
- GitHub repository access
- Vercel project access
- Environment variable access
- DNS management access

### Environment Variables
Set up the following secrets in GitHub Actions and Vercel:

```bash
# Vercel Configuration
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx

# Analytics (Optional)
GA_TRACKING_ID=xxx
GTM_CONTAINER_ID=xxx

# Monitoring (Optional)
SENTRY_DSN=xxx
SENTRY_ORG=xxx
SENTRY_PROJECT=xxx

# Security
PRODUCTION_SESSION_SECRET=xxx
PRODUCTION_CSRF_SECRET=xxx
STAGING_SESSION_SECRET=xxx
STAGING_CSRF_SECRET=xxx
```

## Environment Configuration

### Production Environment
- **Domain**: https://www.aikinklab.com
- **Branch**: `main`
- **Deployment**: Automatic on push to main
- **Configuration**: `environments/production.env`

### Staging Environment
- **Domain**: https://staging.aikinklab.com
- **Branch**: `develop`
- **Deployment**: Automatic on push to develop
- **Configuration**: `environments/staging.env`

### Preview Environment
- **Domain**: Auto-generated preview URLs
- **Branch**: Any feature branch with PR
- **Deployment**: Automatic on PR creation/update
- **Configuration**: Default development settings

## Automated Deployments

### GitHub Actions Workflow

The CI/CD pipeline automatically handles deployments based on git branches:

```yaml
main branch → Production deployment
develop branch → Staging deployment
feature/* branches → Preview deployments
```

### Deployment Pipeline Steps

1. **Code Quality Checks**
   - ESLint code linting
   - TypeScript type checking
   - Security vulnerability scanning
   - Code quality analysis

2. **Testing**
   - Unit tests with Jest
   - Integration tests
   - End-to-end tests with Playwright
   - Performance testing

3. **Build & Deploy**
   - Next.js build optimization
   - Static asset generation
   - Vercel deployment
   - Health check verification

4. **Post-Deployment**
   - Performance monitoring
   - Security scanning
   - Analytics setup verification

### Triggering Deployments

#### Production Deployment
```bash
# Create and merge PR to main
git checkout main
git pull origin main
git merge develop
git push origin main
```

#### Staging Deployment
```bash
# Push to develop branch
git checkout develop
git pull origin develop
git merge feature/your-feature
git push origin develop
```

#### Preview Deployment
```bash
# Create pull request from feature branch
gh pr create --title "Feature: Your Feature" --body "Description"
```

## Manual Deployments

### Using npm Scripts

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

### Using Deployment Script

```bash
# Staging deployment
./scripts/deploy.sh staging develop

# Production deployment
./scripts/deploy.sh production main

# With rollback capability
./scripts/deploy.sh production main --enable-rollback
```

### Direct Vercel Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy specific directory
vercel --prod --cwd ./dist
```

### Manual Deployment Steps

1. **Pre-deployment**
   ```bash
   # Ensure clean working directory
   git status
   git pull origin main
   
   # Install dependencies
   npm ci
   
   # Run tests
   npm run test:all
   
   # Build application
   npm run build
   ```

2. **Deploy**
   ```bash
   # Production deployment
   vercel --prod --token=$VERCEL_TOKEN
   
   # Staging deployment
   vercel --token=$VERCEL_TOKEN
   ```

3. **Post-deployment**
   ```bash
   # Health check
   curl https://www.aikinklab.com/api/health
   
   # Performance check
   npm run lighthouse
   
   # Security verification
   npm run security-audit
   ```

## Environment Management

### Environment Variables

#### Adding New Variables
1. **Local Development**
   ```bash
   echo "NEW_VARIABLE=value" >> .env.local
   ```

2. **Staging**
   ```bash
   vercel env add NEW_VARIABLE staging
   ```

3. **Production**
   ```bash
   vercel env add NEW_VARIABLE production
   ```

4. **GitHub Actions**
   - Go to repository Settings → Secrets and variables → Actions
   - Add new repository secret

#### Updating Variables
```bash
# List current variables
vercel env ls

# Update variable
vercel env rm VARIABLE_NAME production
vercel env add VARIABLE_NAME production
```

### Configuration Files

#### Environment-Specific Configs
- `environments/production.env` - Production configuration
- `environments/staging.env` - Staging configuration  
- `.env.example` - Template for local development

#### Vercel Configuration
- `vercel.json` - Vercel deployment configuration
- Includes headers, redirects, rewrites, and cron jobs

### Branch Protection Rules

Production branch (`main`) requires:
- Pull request reviews
- Status checks to pass
- Up-to-date branches
- No direct pushes

## Rollback Procedures

### Automatic Rollback

GitHub Actions includes automatic rollback on deployment failure:

```yaml
# Rollback trigger conditions
- Build failure
- Health check failure  
- Security scan failure
- Performance regression
```

### Manual Rollback

#### Using Vercel Dashboard
1. Go to Vercel project dashboard
2. Find previous successful deployment
3. Click "Promote to Production"

#### Using Vercel CLI
```bash
# List recent deployments
vercel list

# Promote previous deployment
vercel promote https://previous-deployment-url.vercel.app
```

#### Using Git Revert
```bash
# Revert last commit
git revert HEAD
git push origin main

# Revert to specific commit
git revert <commit-hash>
git push origin main
```

### Emergency Rollback

For critical issues requiring immediate rollback:

```bash
# Emergency rollback script
./scripts/deploy.sh production main --emergency-rollback

# Direct Vercel rollback
vercel promote $(vercel list --json | jq -r '.[1].url') --prod
```

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check build logs
vercel logs <deployment-url>

# Local build test
npm run build

# Clear cache and retry
rm -rf .next node_modules
npm install
npm run build
```

#### Environment Variable Issues
```bash
# Verify environment variables
vercel env ls

# Check local environment
node -e "console.log(process.env)"

# Test configuration
npm run type-check
```

#### Network/Connectivity Issues
```bash
# Check Vercel status
curl https://api.vercel.com/status

# Test connectivity
ping vercel.com

# Check DNS resolution
nslookup www.aikinklab.com
```

#### Performance Issues
```bash
# Run performance audit
npm run lighthouse

# Check bundle size
npm run analyze

# Monitor Core Web Vitals
curl https://www.aikinklab.com/api/analytics/web-vitals
```

### Debugging Steps

1. **Check GitHub Actions Logs**
   - Go to Actions tab in GitHub repository
   - Find failed workflow run
   - Review job logs for errors

2. **Review Vercel Function Logs**
   - Open Vercel dashboard
   - Navigate to Functions tab
   - Check real-time logs

3. **Local Environment Testing**
   ```bash
   # Start development server
   npm run dev
   
   # Test production build locally
   npm run build && npm start
   
   # Run all tests
   npm run test:all
   ```

4. **Health Check Analysis**
   ```bash
   # Detailed health check
   curl -v https://www.aikinklab.com/api/health
   
   # Monitor endpoint
   watch -n 5 'curl -s https://www.aikinklab.com/api/health | jq'
   ```

### Recovery Procedures

#### Failed Deployment Recovery
1. **Identify Issue**
   - Review deployment logs
   - Check health endpoints
   - Verify recent changes

2. **Quick Fix**
   - Revert problematic commit
   - Push fix to trigger new deployment
   - Monitor deployment progress

3. **Full Recovery**
   - Rollback to last known good state
   - Investigate root cause
   - Implement proper fix
   - Test thoroughly before redeployment

## Best Practices

### Deployment Safety

1. **Always Use CI/CD Pipeline**
   - Avoid manual production deployments
   - Use automated testing and checks
   - Maintain deployment consistency

2. **Staged Rollouts**
   - Test changes in staging first
   - Use feature flags for gradual rollouts
   - Monitor metrics during deployment

3. **Monitoring and Alerts**
   - Set up deployment notifications
   - Monitor key metrics post-deployment
   - Have rollback plan ready

### Code Quality

1. **Pre-deployment Checks**
   ```bash
   npm run pre-commit  # Linting, type-check, tests
   npm run security-audit  # Security vulnerability scan
   npm run performance-test  # Performance regression check
   ```

2. **Version Control**
   - Use semantic versioning
   - Tag releases properly
   - Maintain clean commit history

3. **Documentation**
   - Document configuration changes
   - Update deployment procedures
   - Maintain environment documentation

### Security Considerations

1. **Secrets Management**
   - Never commit secrets to git
   - Use secure environment variable storage
   - Rotate secrets regularly

2. **Access Control**
   - Limit production access
   - Use principle of least privilege
   - Audit access regularly

3. **Security Scanning**
   - Regular dependency updates
   - Automated security scanning
   - Security header validation

### Performance Optimization

1. **Build Optimization**
   - Bundle size monitoring
   - Code splitting strategies
   - Asset optimization

2. **Caching Strategy**
   - CDN configuration
   - Service worker implementation
   - API response caching

3. **Monitoring**
   - Core Web Vitals tracking
   - Real user monitoring
   - Performance budget enforcement

## Quick Reference

### Common Commands
```bash
# Health check
curl https://www.aikinklab.com/api/health

# Deploy to staging
./scripts/deploy.sh staging develop

# Deploy to production
./scripts/deploy.sh production main

# Emergency rollback
vercel promote $(vercel list --json | jq -r '.[1].url') --prod

# Check deployment status
vercel list

# View logs
vercel logs <deployment-url>
```

### Emergency Contacts
- **DevOps Lead**: [Contact Information]
- **Security Team**: [Contact Information] 
- **Vercel Support**: support@vercel.com

### Useful Links
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions](https://github.com/your-org/aikinklab/actions)
- [Monitoring Dashboard](https://www.aikinklab.com/api/health)
- [Performance Metrics](https://www.aikinklab.com/api/analytics/web-vitals)