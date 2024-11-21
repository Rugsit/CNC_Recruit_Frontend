import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Noto_Sans_Thai as FontSansThai,
  Kanit,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontKanit = Kanit({
  weight: '400',
  subsets: ['thai'],
  variable: '--font-kanit',
});

export const fontSansThai = FontSansThai({
  subsets: ['thai'],
  variable: '--font-sans-thai'
});
