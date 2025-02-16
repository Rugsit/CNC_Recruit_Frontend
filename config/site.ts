export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Cnc Lab recruiter',
  description: 'Demo',
  navItems: [
    {
      label: 'เกี่ยวกับ LAB',
      href: '/home#about-lab',
    },
    {
      label: 'กำหนดการณ์',
      href: '/home#timeline',
    },
    {
      label: 'สถานที่',
      href: '/home#location',
    },
    {
      label: 'ติดตามข่าวสาร',
      href: '/home#connect',
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
