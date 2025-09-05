import { render, screen, fireEvent } from '../../utils/test-utils'
import { Navigation } from '../../../components/layout/Navigation'
import { usePathname } from 'next/navigation'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock the Logo component
jest.mock('../../../components/layout/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Desktop Navigation', () => {
    it('should render all navigation items', () => {
      render(<Navigation />)
      
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Lab' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Start Test' })).toBeInTheDocument()
    })

    it('should render logo and brand name', () => {
      render(<Navigation />)
      
      expect(screen.getByTestId('logo')).toBeInTheDocument()
      expect(screen.getByText('AiKinkLab')).toBeInTheDocument()
    })

    it('should have correct links with proper hrefs', () => {
      render(<Navigation />)
      
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: 'Lab' })).toHaveAttribute('href', '/lab')
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
      expect(screen.getByRole('link', { name: 'Start Test' })).toHaveAttribute('href', '/test')
    })

    it('should highlight active navigation item', () => {
      mockUsePathname.mockReturnValue('/about')
      render(<Navigation />)
      
      const aboutLink = screen.getByRole('link', { name: 'About' })
      expect(aboutLink).toHaveClass('text-neon-magenta')
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('text-neutral-gray')
    })

    it('should handle root path highlighting correctly', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Navigation />)
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('text-neon-magenta')
    })
  })

  describe('Mobile Navigation', () => {
    it('should show mobile menu button on mobile', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      expect(menuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu when button is clicked', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      
      // Initially menu should be closed
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
      
      // Click to open menu
      fireEvent.click(menuButton)
      
      // Menu should now be open with close button
      expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    })

    it('should show mobile navigation items when menu is open', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      fireEvent.click(menuButton)
      
      // Should show all navigation items in mobile menu
      const mobileLinks = screen.getAllByRole('link')
      const homeLinks = mobileLinks.filter(link => link.textContent === 'Home')
      const labLinks = mobileLinks.filter(link => link.textContent === 'Lab')
      
      // Should have both desktop and mobile versions
      expect(homeLinks).toHaveLength(2) // Desktop + Mobile
      expect(labLinks).toHaveLength(2) // Desktop + Mobile
    })

    it('should close mobile menu when navigation item is clicked', () => {
      render(<Navigation />)
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      fireEvent.click(menuButton)
      
      expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
      
      // Click on a mobile navigation item
      const mobileLinks = screen.getAllByRole('link', { name: 'Home' })
      const mobileHomeLink = mobileLinks[1] // Second one is the mobile version
      fireEvent.click(mobileHomeLink)
      
      // Menu should close
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
    })

    it('should close mobile menu when Start Test is clicked', () => {
      render(<Navigation />)
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      fireEvent.click(menuButton)
      
      // Click Start Test in mobile menu
      const testLinks = screen.getAllByRole('link', { name: 'Start Test' })
      const mobileTestLink = testLinks[1] // Second one is mobile version
      fireEvent.click(mobileTestLink)
      
      // Menu should close
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
    })

    it('should have proper ARIA labels for menu button', () => {
      render(<Navigation />)
      
      let menuButton = screen.getByRole('button', { name: 'Open menu' })
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu')
      
      // After clicking, label should change
      fireEvent.click(menuButton)
      
      menuButton = screen.getByRole('button', { name: 'Close menu' })
      expect(menuButton).toHaveAttribute('aria-label', 'Close menu')
    })
  })

  describe('Active State Management', () => {
    const testPaths = [
      { path: '/', activeItem: 'Home' },
      { path: '/lab', activeItem: 'Lab' },
      { path: '/about', activeItem: 'About' },
      { path: '/contact', activeItem: 'Contact' },
    ]

    testPaths.forEach(({ path, activeItem }) => {
      it(`should highlight ${activeItem} when on ${path}`, () => {
        mockUsePathname.mockReturnValue(path)
        render(<Navigation />)
        
        const activeLink = screen.getByRole('link', { name: activeItem })
        expect(activeLink).toHaveClass('text-neon-magenta')
      })
    })

    it('should handle nested paths correctly', () => {
      mockUsePathname.mockReturnValue('/lab/some-article')
      render(<Navigation />)
      
      // Lab should not be highlighted for nested paths
      const labLink = screen.getByRole('link', { name: 'Lab' })
      expect(labLink).toHaveClass('text-neutral-gray')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      render(<Navigation />)
      
      // All links should be focusable
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('should have focus management for mobile menu', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button')
      expect(menuButton).toHaveClass('focus-ring')
    })

    it('should have touch targets for mobile interactions', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button')
      expect(menuButton).toHaveClass('touch-target')
    })

    it('should provide semantic navigation structure', () => {
      render(<Navigation />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Visual States', () => {
    it('should apply correct CSS classes for desktop links', () => {
      render(<Navigation />)
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('transition-colors', 'duration-200')
    })

    it('should apply primary button styles to Start Test', () => {
      render(<Navigation />)
      
      const testLinks = screen.getAllByRole('link', { name: 'Start Test' })
      testLinks.forEach(link => {
        expect(link).toHaveClass('btn-primary')
      })
    })

    it('should have proper mobile menu animation classes', () => {
      render(<Navigation />)
      
      // Find the mobile menu container
      const mobileMenu = document.querySelector('[class*="max-h-0"]')
      expect(mobileMenu).toHaveClass('transition-all', 'duration-300', 'ease-in-out')
    })
  })

  describe('Responsive Behavior', () => {
    it('should hide desktop navigation on mobile', () => {
      render(<Navigation />)
      
      const desktopNav = document.querySelector('.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()
    })

    it('should hide mobile menu button on desktop', () => {
      render(<Navigation />)
      
      const mobileMenuContainer = document.querySelector('.md\\:hidden')
      expect(mobileMenuContainer).toBeInTheDocument()
    })

    it('should hide brand name on small screens', () => {
      render(<Navigation />)
      
      const brandName = screen.getByText('AiKinkLab')
      expect(brandName).toHaveClass('hidden', 'sm:block')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing pathname gracefully', () => {
      mockUsePathname.mockReturnValue(undefined as any)
      
      expect(() => render(<Navigation />)).not.toThrow()
    })

    it('should handle rapid menu toggle clicks', () => {
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: 'Open menu' })
      
      // Rapid clicks should not cause errors
      fireEvent.click(menuButton)
      fireEvent.click(menuButton)
      fireEvent.click(menuButton)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Integration with Next.js', () => {
    it('should use Next.js Link component for navigation', () => {
      render(<Navigation />)
      
      // All navigation items should be proper Next.js links
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
      
      // Each link should have an href attribute (indicating Next.js Link)
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('should integrate with Next.js usePathname hook', () => {
      render(<Navigation />)
      
      expect(mockUsePathname).toHaveBeenCalled()
    })
  })
})