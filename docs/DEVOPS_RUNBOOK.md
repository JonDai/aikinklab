# AIKinkLab DevOps Runbook

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Deployment Procedures](#deployment-procedures)
4. [Monitoring and Alerting](#monitoring-and-alerting)
5. [Incident Response](#incident-response)
6. [Backup and Recovery](#backup-and-recovery)
7. [Security Operations](#security-operations)
8. [Performance Management](#performance-management)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Emergency Procedures](#emergency-procedures)

## Overview

This runbook provides comprehensive operational procedures for AIKinkLab's production infrastructure. It covers deployment, monitoring, incident response, and maintenance procedures.

### Key Information
- **Application**: AIKinkLab - AI-powered kink personality testing platform
- **Framework**: Next.js 14 with TypeScript
- **Hosting**: Vercel
- **Repository**: GitHub
- **Domain**: www.aikinklab.com

### Contact Information
- **Primary Administrator**: [Contact Information]
- **Security Contact**: [Security Contact]
- **Emergency Escalation**: [Emergency Contact]

## Architecture

### System Overview
```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   User Traffic  │───▶│   Vercel CDN │───▶│  Next.js App    │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │                      │
                              ▼                      ▼
                       ┌──────────────┐    ┌─────────────────┐
                       │ Edge Caching │    │   API Routes    │
                       └──────────────┘    └─────────────────┘
                              │                      │
                              ▼                      ▼
                       ┌──────────────┐    ┌─────────────────┐
                       │  Static      │    │   Monitoring    │
                       │  Assets      │    │   & Analytics   │
                       └──────────────┘    └─────────────────┘
```

### Components
- **Frontend**: React components with Tailwind CSS
- **Backend**: Next.js API routes
- **Monitoring**: Custom monitoring system + external services
- **Analytics**: Web Vitals tracking + Google Analytics
- **Security**: CSP headers, rate limiting, input validation

### Infrastructure Stack
- **Hosting**: Vercel (Serverless)
- **CDN**: Vercel Edge Network
- **DNS**: Vercel DNS
- **SSL**: Automatic SSL/TLS via Vercel
- **Monitoring**: Built-in monitoring + GitHub Actions

## Deployment Procedures

### Environment Overview
- **Production**: `main` branch → www.aikinklab.com
- **Staging**: `develop` branch → staging.aikinklab.com
- **Preview**: Pull requests → preview URLs

### Deployment Process

#### Automatic Deployment (Recommended)
1. **Production Deployment**:
   ```bash
   git checkout main
   git pull origin main
   git push origin main
   ```
   - Triggers GitHub Actions workflow
   - Runs quality checks, tests, and security scans
   - Deploys to production if all checks pass

2. **Staging Deployment**:
   ```bash
   git checkout develop
   git pull origin develop
   git push origin develop
   ```

#### Manual Deployment
```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

#### Emergency Deployment Script
```bash
./scripts/deploy.sh production main
```

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Security audit clean
- [ ] Performance metrics acceptable
- [ ] Database migrations ready (if applicable)
- [ ] Feature flags configured
- [ ] Monitoring alerts configured

### Post-Deployment Verification
1. **Health Check**: `curl https://www.aikinklab.com/api/health`
2. **Critical Pages**: Test key user journeys
3. **Performance**: Monitor Core Web Vitals
4. **Error Rates**: Check error monitoring
5. **Security**: Verify security headers

### Rollback Procedure
```bash
# Automatic rollback via Vercel
vercel promote <previous-deployment-url> --token=$VERCEL_TOKEN

# Or use deployment script
./scripts/deploy.sh production main --rollback
```

## Monitoring and Alerting

### Health Monitoring
- **Endpoint**: `/api/health`
- **Checks**: Application health, system metrics, dependencies
- **Frequency**: Every 30 seconds

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Response Times**: API endpoint monitoring
- **Error Rates**: 4xx/5xx error tracking
- **Resource Usage**: Memory and CPU monitoring

### Security Monitoring
- **Vulnerability Scanning**: Daily dependency scans
- **Security Headers**: Continuous header validation
- **Rate Limiting**: Abuse detection and prevention
- **SSL Certificate**: Certificate expiration monitoring

### Alert Channels
- **High Priority**: Email + SMS
- **Medium Priority**: Email
- **Low Priority**: Dashboard notifications

### Key Metrics
```yaml
SLA Targets:
  Uptime: 99.9%
  Response Time: < 2 seconds (95th percentile)
  Error Rate: < 0.1%
  
Performance Targets:
  LCP: < 2.5 seconds
  FID: < 100 milliseconds  
  CLS: < 0.1
```

## Incident Response

### Severity Levels

#### P0 - Critical (Immediate Response)
- Complete site outage
- Security breach
- Data loss
- Response Time: < 15 minutes

#### P1 - High (1 hour response)
- Significant feature unavailable
- Performance degradation > 50%
- Security vulnerability
- Response Time: < 1 hour

#### P2 - Medium (4 hour response)
- Minor feature issues
- Performance degradation < 50%
- Non-critical bugs
- Response Time: < 4 hours

#### P3 - Low (Next business day)
- Cosmetic issues
- Enhancement requests
- Documentation updates
- Response Time: < 24 hours

### Incident Response Process

1. **Detection**
   - Monitoring alerts
   - User reports
   - Team discovery

2. **Initial Response**
   - Acknowledge incident
   - Assess severity
   - Assemble response team
   - Begin incident log

3. **Investigation**
   - Gather logs and metrics
   - Identify root cause
   - Develop fix strategy
   - Implement temporary mitigations

4. **Resolution**
   - Deploy fix
   - Verify resolution
   - Monitor for regression
   - Update status page

5. **Post-Incident**
   - Conduct post-mortem
   - Document lessons learned
   - Implement preventive measures
   - Update runbooks

### Communication Templates

#### Initial Response
```
🚨 INCIDENT ALERT 🚨
Severity: [P0/P1/P2/P3]
Issue: [Brief description]
Impact: [User impact description]
Status: Investigating
ETA: [Expected resolution time]
Updates: Every 15/30/60 minutes
```

#### Resolution
```
✅ INCIDENT RESOLVED ✅
Issue: [Brief description]
Resolution: [What was done]
Duration: [Total downtime]
Root Cause: [Brief explanation]
Prevention: [Steps to prevent recurrence]
```

## Backup and Recovery

### Backup Strategy
- **Frequency**: Daily automated backups
- **Retention**: 30 days local, 90 days cloud
- **Types**: Full, incremental, configuration-only
- **Location**: GitHub releases + local storage

### Backup Contents
- Complete source code with git history
- Configuration files and environment settings
- Static assets and media files
- Deployment configurations
- Monitoring and log data

### Backup Commands
```bash
# Full backup
./scripts/backup.sh full

# Code-only backup
./scripts/backup.sh code

# Configuration backup
./scripts/backup.sh config
```

### Recovery Procedures

#### Complete System Recovery
1. **Download latest backup**:
   ```bash
   gh release download backup-YYYY-MM-DD-XXXXXX
   ```

2. **Extract and verify**:
   ```bash
   tar -xzf aikinklab_backup_*.tar.gz
   cd extracted_backup/
   ```

3. **Restore code**:
   ```bash
   git clone code/repository.bundle recovered-project
   cd recovered-project
   npm install
   ```

4. **Configure environment**:
   ```bash
   cp config/environments/production.env .env.local
   # Update environment variables as needed
   ```

5. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Database Recovery (Future)
When database is implemented:
```bash
# Restore database from backup
pg_restore -d aikinklab_production backup.sql
```

### RTO/RPO Targets
- **RTO (Recovery Time Objective)**: 1 hour
- **RPO (Recovery Point Objective)**: 24 hours

## Security Operations

### Security Monitoring
- **Vulnerability Scanning**: Daily dependency scans
- **Code Analysis**: Static analysis on every commit
- **Infrastructure Scanning**: Weekly security audits
- **Penetration Testing**: Quarterly external assessments

### Security Incident Response
1. **Contain**: Isolate affected systems
2. **Assess**: Determine scope and impact
3. **Eradicate**: Remove threat and vulnerabilities
4. **Recover**: Restore normal operations
5. **Learn**: Post-incident review and improvements

### Security Checklist
- [ ] SSL/TLS certificates valid
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] Access controls reviewed
- [ ] Backup encryption verified
- [ ] Incident response plan tested

### Emergency Security Procedures

#### Suspected Breach
1. **Immediate**: Isolate affected systems
2. **Assess**: Review logs and access patterns
3. **Notify**: Security team and stakeholders
4. **Document**: Preserve evidence
5. **Recover**: Implement fixes and monitoring

#### DDoS Attack
1. **Monitor**: Traffic patterns and response times
2. **Scale**: Increase rate limiting
3. **Block**: Malicious IP ranges
4. **Communicate**: Update status page
5. **Review**: Post-incident analysis

## Performance Management

### Performance Monitoring
- **Real User Monitoring**: Core Web Vitals tracking
- **Synthetic Monitoring**: Regular performance tests
- **Infrastructure Metrics**: Server resource usage
- **Business Metrics**: User engagement and conversion

### Performance Optimization

#### Frontend Optimization
- Image optimization and lazy loading
- Code splitting and bundle optimization
- Service worker caching
- Critical resource preloading

#### Backend Optimization
- API response caching
- Database query optimization
- CDN configuration
- Serverless function optimization

### Performance Alerts
- Response time > 3 seconds
- Core Web Vitals degradation
- Error rate > 1%
- Resource utilization > 80%

## Troubleshooting Guide

### Common Issues

#### Site Not Loading
1. Check Vercel status: `https://vercel-status.com`
2. Verify DNS: `nslookup www.aikinklab.com`
3. Check SSL certificate: `curl -I https://www.aikinklab.com`
4. Review deployment logs in Vercel dashboard

#### Performance Issues
1. Check Core Web Vitals: `/api/analytics/web-vitals`
2. Review Lighthouse audit results
3. Monitor resource usage in Vercel dashboard
4. Check for recent deployments or traffic spikes

#### Security Issues
1. Review security headers: `curl -I https://www.aikinklab.com`
2. Check for vulnerabilities: `npm audit`
3. Verify rate limiting is working
4. Review access logs for suspicious activity

### Diagnostic Commands
```bash
# Health check
curl https://www.aikinklab.com/api/health

# Performance test
npm run lighthouse

# Security audit
npm run security-audit

# Deployment status
vercel list
```

### Log Analysis
- **Vercel Function Logs**: Real-time function execution logs
- **GitHub Actions Logs**: CI/CD pipeline logs
- **Browser Console**: Client-side error tracking
- **Analytics Data**: User behavior and performance metrics

## Emergency Procedures

### Emergency Contacts
- **Primary On-Call**: [Phone] [Email]
- **Backup On-Call**: [Phone] [Email]
- **Management Escalation**: [Phone] [Email]
- **Vercel Support**: support@vercel.com

### Emergency Response Steps

#### Complete Outage
1. **Verify outage**: Check from multiple locations
2. **Check dependencies**: Vercel status, DNS, CDN
3. **Review recent changes**: Last 24 hours
4. **Implement rollback**: If recent deployment
5. **Communicate status**: Update status page
6. **Escalate**: If not resolved in 15 minutes

#### Security Emergency
1. **Isolate**: Restrict access if needed
2. **Assess**: Determine scope and impact
3. **Contain**: Prevent further damage
4. **Document**: Preserve evidence
5. **Notify**: Legal and compliance teams
6. **Recover**: Implement fixes and monitoring

#### Data Emergency
1. **Stop writes**: Prevent data corruption
2. **Assess damage**: Determine data impact
3. **Recover**: From most recent backup
4. **Verify**: Data integrity and completeness
5. **Resume operations**: Gradual restoration
6. **Investigate**: Root cause analysis

### Emergency Playbooks
- [Site Outage Playbook](./playbooks/site-outage.md)
- [Security Incident Playbook](./playbooks/security-incident.md)
- [Performance Degradation Playbook](./playbooks/performance-degradation.md)
- [Data Loss Playbook](./playbooks/data-loss.md)

---

## Revision History
| Date | Version | Changes | Author |
|------|---------|---------|---------|
| 2024-12-XX | 1.0 | Initial runbook creation | DevOps Team |

## Related Documents
- [Security Policy](./SECURITY_POLICY.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Monitoring Setup](./MONITORING_SETUP.md)
- [Incident Response Plan](./INCIDENT_RESPONSE.md)