export interface MobileMenuProps {
  open: boolean
  links: NavItem[]
  activeLink: string
  onLinkClick: () => void
}

export interface NavItem {
  label: string
  href: string
}

export interface HamburgerIconProps {
  open: boolean
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nómadas', href: '/nomadas' },
  { label: 'Aliados', href: '/aliados' },
]
