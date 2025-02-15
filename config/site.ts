export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Cnc Lab recruiter',
  description: 'Demo',
  navItems: [
    {
      label: 'เกี่ยวกับ LAB',
      href: '#about-lab',
    },
    {
      label: 'กำหนดการณ์',
      href: '#timeline',
    },
    {
      label: 'สถานที่',
      href: '#location',
    },
    {
      label: 'ติดตามข่าวสาร',
      href: '#connect',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
