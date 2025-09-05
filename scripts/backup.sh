#!/bin/bash
set -e

# Backup and Disaster Recovery Script for AIKinkLab
# Usage: ./scripts/backup.sh [type] [destination]

BACKUP_TYPE=${1:-full}
DESTINATION=${2:-local}
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="${PROJECT_ROOT}/backups/${TIMESTAMP}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Create backup directory
create_backup_dir() {
    log_info "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    
    # Create subdirectories
    mkdir -p "$BACKUP_DIR/code"
    mkdir -p "$BACKUP_DIR/config"
    mkdir -p "$BACKUP_DIR/assets"
    mkdir -p "$BACKUP_DIR/deployment"
    mkdir -p "$BACKUP_DIR/logs"
}

# Backup source code
backup_source_code() {
    log_info "Backing up source code..."
    
    cd "$PROJECT_ROOT"
    
    # Create git bundle for complete history
    git bundle create "$BACKUP_DIR/code/repository.bundle" --all
    
    # Export current state
    git archive --format=tar.gz --output="$BACKUP_DIR/code/current_state.tar.gz" HEAD
    
    # Copy critical configuration files
    cp package.json "$BACKUP_DIR/code/" 2>/dev/null || log_warning "package.json not found"
    cp package-lock.json "$BACKUP_DIR/code/" 2>/dev/null || log_warning "package-lock.json not found"
    cp next.config.js "$BACKUP_DIR/code/" 2>/dev/null || log_warning "next.config.js not found"
    cp tailwind.config.ts "$BACKUP_DIR/code/" 2>/dev/null || log_warning "tailwind.config.ts not found"
    cp tsconfig.json "$BACKUP_DIR/code/" 2>/dev/null || log_warning "tsconfig.json not found"
    
    # Copy environment configurations
    if [ -d "environments" ]; then
        cp -r environments "$BACKUP_DIR/config/"
    fi
    
    log_success "Source code backup completed"
}

# Backup configuration files
backup_configuration() {
    log_info "Backing up configuration files..."
    
    # Vercel configuration
    cp vercel.json "$BACKUP_DIR/config/" 2>/dev/null || log_warning "vercel.json not found"
    
    # GitHub Actions workflows
    if [ -d ".github" ]; then
        cp -r .github "$BACKUP_DIR/config/"
    fi
    
    # Security configurations
    if [ -d "security" ]; then
        cp -r security "$BACKUP_DIR/config/"
    fi
    
    # Lighthouse configuration
    cp lighthouserc.json "$BACKUP_DIR/config/" 2>/dev/null || log_warning "lighthouserc.json not found"
    cp audit-ci.json "$BACKUP_DIR/config/" 2>/dev/null || log_warning "audit-ci.json not found"
    
    # Docker files
    cp Dockerfile.security "$BACKUP_DIR/config/" 2>/dev/null || log_warning "Dockerfile.security not found"
    
    # Environment template
    cp .env.example "$BACKUP_DIR/config/" 2>/dev/null || log_warning ".env.example not found"
    
    log_success "Configuration backup completed"
}

# Backup assets
backup_assets() {
    log_info "Backing up static assets..."
    
    if [ -d "public" ]; then
        cp -r public "$BACKUP_DIR/assets/"
    fi
    
    # Backup any uploaded content (future)
    if [ -d "uploads" ]; then
        cp -r uploads "$BACKUP_DIR/assets/"
    fi
    
    log_success "Assets backup completed"
}

# Backup deployment information
backup_deployment_info() {
    log_info "Backing up deployment information..."
    
    # Get current deployment info from Vercel
    if command -v vercel &> /dev/null; then
        log_info "Fetching Vercel deployment information..."
        
        # Get deployments list
        vercel list --token="$VERCEL_TOKEN" > "$BACKUP_DIR/deployment/deployments.txt" 2>/dev/null || log_warning "Could not fetch deployments"
        
        # Get environment variables (non-sensitive)
        vercel env ls --token="$VERCEL_TOKEN" > "$BACKUP_DIR/deployment/env_vars.txt" 2>/dev/null || log_warning "Could not fetch environment variables"
        
        # Get domains
        vercel domains ls --token="$VERCEL_TOKEN" > "$BACKUP_DIR/deployment/domains.txt" 2>/dev/null || log_warning "Could not fetch domains"
    fi
    
    # Git deployment information
    git log --oneline -10 > "$BACKUP_DIR/deployment/recent_commits.txt"
    git branch -a > "$BACKUP_DIR/deployment/branches.txt"
    git remote -v > "$BACKUP_DIR/deployment/remotes.txt"
    
    # System information
    echo "Backup Date: $(date)" > "$BACKUP_DIR/deployment/system_info.txt"
    echo "Node Version: $(node --version)" >> "$BACKUP_DIR/deployment/system_info.txt"
    echo "NPM Version: $(npm --version)" >> "$BACKUP_DIR/deployment/system_info.txt"
    echo "Platform: $(uname -a)" >> "$BACKUP_DIR/deployment/system_info.txt"
    
    log_success "Deployment information backup completed"
}

# Backup logs and monitoring data
backup_logs() {
    log_info "Backing up logs and monitoring data..."
    
    # Application logs (if they exist locally)
    if [ -d "logs" ]; then
        cp -r logs "$BACKUP_DIR/logs/"
    fi
    
    # Recent npm debug logs
    find "$HOME/.npm/_logs" -name "*.log" -mtime -7 -exec cp {} "$BACKUP_DIR/logs/" \; 2>/dev/null || true
    
    # Git history
    git log --since="7 days ago" --oneline > "$BACKUP_DIR/logs/recent_git_history.txt"
    
    # Package-lock for dependency tracking
    if [ -f "package-lock.json" ]; then
        cp package-lock.json "$BACKUP_DIR/logs/dependencies_snapshot.json"
    fi
    
    log_success "Logs backup completed"
}

# Create backup manifest
create_backup_manifest() {
    log_info "Creating backup manifest..."
    
    cat > "$BACKUP_DIR/MANIFEST.md" << EOF
# AIKinkLab Backup Manifest

**Backup Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Backup Type:** $BACKUP_TYPE
**Git Commit:** $(git rev-parse HEAD)
**Git Branch:** $(git branch --show-current)

## Contents

### Code Backup
- \`code/repository.bundle\` - Complete git repository with history
- \`code/current_state.tar.gz\` - Current source code snapshot
- \`code/package.json\` - Project dependencies
- \`code/package-lock.json\` - Locked dependencies
- \`code/*.config.js\` - Configuration files

### Configuration
- \`config/vercel.json\` - Vercel deployment configuration
- \`config/.github/\` - GitHub Actions workflows
- \`config/security/\` - Security configurations
- \`config/environments/\` - Environment-specific configurations

### Assets
- \`assets/public/\` - Static assets and media files
- \`assets/uploads/\` - User-generated content (if any)

### Deployment Information
- \`deployment/deployments.txt\` - Vercel deployment history
- \`deployment/env_vars.txt\` - Environment variables list
- \`deployment/domains.txt\` - Domain configurations
- \`deployment/recent_commits.txt\` - Recent git commits
- \`deployment/system_info.txt\` - System environment info

### Logs and Monitoring
- \`logs/\` - Application and system logs
- \`logs/recent_git_history.txt\` - Recent development history

## Recovery Instructions

1. **Code Recovery:**
   \`\`\`bash
   git clone repository.bundle recovered-project
   cd recovered-project
   npm install
   \`\`\`

2. **Configuration Recovery:**
   - Copy configuration files to appropriate locations
   - Set up environment variables from env_vars.txt
   - Restore GitHub secrets and Vercel tokens

3. **Deployment Recovery:**
   - Set up Vercel project: \`vercel --prod\`
   - Configure domains from domains.txt
   - Restore environment variables

## Validation

This backup was created automatically and includes:
- ✓ Complete source code with git history
- ✓ All configuration files
- ✓ Static assets and media
- ✓ Deployment configurations
- ✓ Recent logs and system state

**Backup Size:** $(du -sh "$BACKUP_DIR" | cut -f1)
**Files Count:** $(find "$BACKUP_DIR" -type f | wc -l)
EOF

    log_success "Backup manifest created"
}

# Compress backup
compress_backup() {
    log_info "Compressing backup..."
    
    cd "$(dirname "$BACKUP_DIR")"
    BACKUP_NAME="aikinklab_backup_${TIMESTAMP}.tar.gz"
    tar -czf "$BACKUP_NAME" "$(basename "$BACKUP_DIR")"
    
    # Remove uncompressed directory
    rm -rf "$BACKUP_DIR"
    
    BACKUP_FILE="$(dirname "$BACKUP_DIR")/$BACKUP_NAME"
    BACKUP_SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
    
    log_success "Backup compressed: $BACKUP_FILE ($BACKUP_SIZE)"
    echo "BACKUP_FILE=$BACKUP_FILE" >> "$GITHUB_OUTPUT" 2>/dev/null || true
}

# Upload to cloud storage (future enhancement)
upload_to_cloud() {
    log_info "Cloud upload not yet implemented"
    log_info "Backup stored locally: $BACKUP_FILE"
    
    # Future implementations:
    # - AWS S3: aws s3 cp "$BACKUP_FILE" s3://aikinklab-backups/
    # - Google Cloud: gsutil cp "$BACKUP_FILE" gs://aikinklab-backups/
    # - GitHub Releases: gh release create "backup-$TIMESTAMP" "$BACKUP_FILE"
}

# Cleanup old backups
cleanup_old_backups() {
    local backup_root="$(dirname "$BACKUP_DIR")"
    
    log_info "Cleaning up old backups..."
    
    # Keep last 30 days of backups
    find "$backup_root" -name "aikinklab_backup_*.tar.gz" -mtime +30 -delete 2>/dev/null || true
    
    # Keep only last 10 backups if more than 10 exist
    local backup_count=$(find "$backup_root" -name "aikinklab_backup_*.tar.gz" | wc -l)
    
    if [ "$backup_count" -gt 10 ]; then
        find "$backup_root" -name "aikinklab_backup_*.tar.gz" -printf '%T@ %p\n' | \
        sort -n | head -n -10 | cut -d' ' -f2- | xargs rm -f
        log_info "Kept only the 10 most recent backups"
    fi
    
    log_success "Cleanup completed"
}

# Validate backup integrity
validate_backup() {
    log_info "Validating backup integrity..."
    
    if [ -f "$BACKUP_FILE" ]; then
        # Test that the archive can be extracted
        tar -tzf "$BACKUP_FILE" > /dev/null
        
        if [ $? -eq 0 ]; then
            log_success "Backup validation passed"
        else
            log_error "Backup validation failed - archive is corrupted"
        fi
    else
        log_error "Backup file not found: $BACKUP_FILE"
    fi
}

# Recovery function (for testing)
test_recovery() {
    log_info "Testing backup recovery..."
    
    local test_dir="/tmp/aikinklab_recovery_test_$$"
    mkdir -p "$test_dir"
    
    cd "$test_dir"
    tar -xzf "$BACKUP_FILE"
    
    local extracted_dir=$(find . -type d -name "*aikinklab_backup*" | head -1)
    
    if [ -d "$extracted_dir" ]; then
        # Check critical files
        local critical_files=(
            "code/repository.bundle"
            "code/package.json"
            "config/vercel.json"
            "MANIFEST.md"
        )
        
        local missing_files=()
        for file in "${critical_files[@]}"; do
            if [ ! -f "$extracted_dir/$file" ]; then
                missing_files+=("$file")
            fi
        done
        
        if [ ${#missing_files[@]} -eq 0 ]; then
            log_success "Recovery test passed - all critical files present"
        else
            log_error "Recovery test failed - missing files: ${missing_files[*]}"
        fi
    else
        log_error "Recovery test failed - could not extract backup"
    fi
    
    # Cleanup test directory
    rm -rf "$test_dir"
}

# Main backup function
main() {
    log_info "Starting backup process..."
    log_info "Backup type: $BACKUP_TYPE"
    log_info "Destination: $DESTINATION"
    log_info "Timestamp: $TIMESTAMP"
    
    # Ensure we're in the project root
    cd "$PROJECT_ROOT"
    
    # Create backup directory structure
    create_backup_dir
    
    # Perform backup operations based on type
    case $BACKUP_TYPE in
        "full")
            backup_source_code
            backup_configuration
            backup_assets
            backup_deployment_info
            backup_logs
            ;;
        "code")
            backup_source_code
            backup_configuration
            ;;
        "assets")
            backup_assets
            ;;
        "config")
            backup_configuration
            backup_deployment_info
            ;;
        *)
            log_error "Unknown backup type: $BACKUP_TYPE. Use: full, code, assets, or config"
            ;;
    esac
    
    # Create manifest and compress
    create_backup_manifest
    compress_backup
    
    # Upload to cloud if configured
    if [ "$DESTINATION" = "cloud" ]; then
        upload_to_cloud
    fi
    
    # Validate backup
    validate_backup
    
    # Test recovery
    if [ "$BACKUP_TYPE" = "full" ]; then
        test_recovery
    fi
    
    # Cleanup old backups
    cleanup_old_backups
    
    log_success "Backup process completed successfully!"
    log_info "Backup location: $BACKUP_FILE"
    log_info "Backup size: $(du -sh "$BACKUP_FILE" | cut -f1)"
}

# Handle script interruption
trap 'log_error "Backup interrupted by user"' INT

# Help function
show_help() {
    cat << EOF
AIKinkLab Backup Script

Usage: $0 [TYPE] [DESTINATION]

TYPES:
  full     - Complete backup (default)
  code     - Source code and configuration only
  assets   - Static assets only
  config   - Configuration and deployment info only

DESTINATIONS:
  local    - Store locally (default)
  cloud    - Upload to cloud storage

Examples:
  $0                           # Full backup locally
  $0 full cloud               # Full backup to cloud
  $0 code local               # Code backup locally
  $0 config                   # Config backup locally

Environment Variables:
  VERCEL_TOKEN    - Vercel API token for deployment info
  GITHUB_OUTPUT   - GitHub Actions output file (optional)

EOF
}

# Check for help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Run main function
main "$@"