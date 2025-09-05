#!/bin/bash
set -e

# Deployment script for AIKinkLab
# Usage: ./scripts/deploy.sh [environment] [branch]

ENVIRONMENT=${1:-staging}
BRANCH=${2:-develop}
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Validate environment
validate_environment() {
    case $ENVIRONMENT in
        development|staging|production)
            log_info "Deploying to $ENVIRONMENT environment"
            ;;
        *)
            log_error "Invalid environment: $ENVIRONMENT. Use development, staging, or production"
            ;;
    esac
}

# Pre-deployment checks
pre_deployment_checks() {
    log_info "Running pre-deployment checks..."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
    fi
    
    # Check for uncommitted changes in production
    if [[ $ENVIRONMENT == "production" ]]; then
        if ! git diff-index --quiet HEAD --; then
            log_error "Uncommitted changes detected. Commit or stash changes before production deployment"
        fi
    fi
    
    # Verify branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [[ $CURRENT_BRANCH != $BRANCH ]]; then
        log_warning "Current branch ($CURRENT_BRANCH) differs from target branch ($BRANCH)"
        read -p "Continue deployment? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "Deployment cancelled"
        fi
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | sed 's/v//')
    REQUIRED_VERSION="18.0.0"
    if ! node -e "process.exit(process.version.substring(1).split('.')[0] >= 18 ? 0 : 1)"; then
        log_error "Node.js version $NODE_VERSION is not supported. Minimum required: $REQUIRED_VERSION"
    fi
    
    log_success "Pre-deployment checks passed"
}

# Environment setup
setup_environment() {
    log_info "Setting up environment variables for $ENVIRONMENT..."
    
    # Load environment-specific variables
    ENV_FILE="$PROJECT_ROOT/environments/${ENVIRONMENT}.env"
    if [[ -f $ENV_FILE ]]; then
        log_info "Loading environment file: $ENV_FILE"
        set -a
        source "$ENV_FILE"
        set +a
    else
        log_warning "Environment file not found: $ENV_FILE"
    fi
    
    # Verify critical environment variables
    REQUIRED_VARS=("NODE_ENV" "NEXT_PUBLIC_APP_URL")
    for var in "${REQUIRED_VARS[@]}"; do
        if [[ -z "${!var}" ]]; then
            log_error "Required environment variable $var is not set"
        fi
    done
}

# Build application
build_application() {
    log_info "Building application for $ENVIRONMENT..."
    
    cd "$PROJECT_ROOT"
    
    # Clean previous builds
    rm -rf .next
    rm -rf out
    
    # Install dependencies
    log_info "Installing dependencies..."
    npm ci --silent
    
    # Run security audit
    if [[ $ENVIRONMENT == "production" ]]; then
        log_info "Running security audit..."
        npm audit --audit-level high || log_warning "Security audit found vulnerabilities"
    fi
    
    # Run linting
    log_info "Running code linting..."
    npm run lint || log_error "Linting failed"
    
    # Type checking
    log_info "Running type check..."
    npx tsc --noEmit || log_error "Type checking failed"
    
    # Run tests
    if command -v npm test &> /dev/null; then
        log_info "Running tests..."
        npm test -- --passWithNoTests || log_error "Tests failed"
    fi
    
    # Build the application
    log_info "Building Next.js application..."
    npm run build || log_error "Build failed"
    
    log_success "Application built successfully"
}

# Deploy to Vercel
deploy_to_vercel() {
    log_info "Deploying to Vercel ($ENVIRONMENT)..."
    
    # Install Vercel CLI if not present
    if ! command -v vercel &> /dev/null; then
        log_info "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    # Set deployment target
    case $ENVIRONMENT in
        production)
            VERCEL_TARGET="--prod"
            ;;
        staging)
            VERCEL_TARGET=""
            ;;
        *)
            VERCEL_TARGET=""
            ;;
    esac
    
    # Deploy
    log_info "Deploying with Vercel..."
    DEPLOYMENT_URL=$(vercel deploy $VERCEL_TARGET --token="$VERCEL_TOKEN" | tail -1)
    
    if [[ $? -eq 0 ]]; then
        log_success "Deployment successful: $DEPLOYMENT_URL"
        echo "DEPLOYMENT_URL=$DEPLOYMENT_URL" >> "$GITHUB_OUTPUT" 2>/dev/null || true
    else
        log_error "Deployment failed"
    fi
}

# Post-deployment checks
post_deployment_checks() {
    log_info "Running post-deployment checks..."
    
    # Wait for deployment to be ready
    sleep 30
    
    # Health check
    HEALTH_URL="${NEXT_PUBLIC_APP_URL}/api/health"
    if curl -f -s "$HEALTH_URL" > /dev/null; then
        log_success "Health check passed: $HEALTH_URL"
    else
        log_warning "Health check failed: $HEALTH_URL"
    fi
    
    # Test critical pages
    PAGES=("/" "/test" "/bdsm-test" "/sitemap.xml" "/robots.txt")
    for page in "${PAGES[@]}"; do
        URL="${NEXT_PUBLIC_APP_URL}${page}"
        if curl -f -s "$URL" > /dev/null; then
            log_info "✓ $page"
        else
            log_warning "✗ $page (HTTP error)"
        fi
    done
    
    # Performance check
    if [[ $ENVIRONMENT == "production" ]]; then
        log_info "Running basic performance check..."
        RESPONSE_TIME=$(curl -w "%{time_total}" -s -o /dev/null "$NEXT_PUBLIC_APP_URL")
        if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
            log_success "Response time: ${RESPONSE_TIME}s"
        else
            log_warning "Slow response time: ${RESPONSE_TIME}s"
        fi
    fi
}

# Rollback function
rollback_deployment() {
    log_warning "Rolling back deployment..."
    
    # Get previous deployment
    PREVIOUS_DEPLOYMENT=$(vercel list --token="$VERCEL_TOKEN" | head -3 | tail -1 | awk '{print $1}')
    
    if [[ -n $PREVIOUS_DEPLOYMENT ]]; then
        log_info "Promoting previous deployment: $PREVIOUS_DEPLOYMENT"
        vercel promote "$PREVIOUS_DEPLOYMENT" --token="$VERCEL_TOKEN"
        log_success "Rollback completed"
    else
        log_error "No previous deployment found for rollback"
    fi
}

# Cleanup
cleanup() {
    log_info "Cleaning up..."
    # Remove temporary files if any
    rm -f /tmp/deployment-*
    log_success "Cleanup completed"
}

# Main deployment function
main() {
    log_info "Starting deployment process..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Branch: $BRANCH"
    log_info "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    
    # Trap to ensure cleanup on exit
    trap cleanup EXIT
    
    # Trap to handle rollback on failure
    if [[ $ENVIRONMENT == "production" ]]; then
        trap 'log_error "Deployment failed, initiating rollback..."; rollback_deployment' ERR
    fi
    
    validate_environment
    pre_deployment_checks
    setup_environment
    build_application
    deploy_to_vercel
    post_deployment_checks
    
    log_success "Deployment completed successfully!"
    log_info "Environment: $ENVIRONMENT"
    log_info "URL: $NEXT_PUBLIC_APP_URL"
    log_info "Deployment URL: ${DEPLOYMENT_URL:-$NEXT_PUBLIC_APP_URL}"
}

# Handle script interruption
trap 'log_error "Deployment interrupted by user"' INT

# Run main function
main "$@"