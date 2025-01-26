const {heroui} = require('@heroui/theme');
import { darkLayout, nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        kanit: ['var(--font-kanit)'],
        "sans-thai": ['var(--font-sans-thai)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
      themes: {
        light: {
          colors: {
            background: '#F6F6F6',foreground: '#11181C',primary: {
              DEFAULT: '#42B5FC',foreground: '#FFFFFF',},secondary: {
              DEFAULT: '#F6F6F6',foreground: '#11181C',},focus: '#FFFFFF',},},dark: {
          colors: {
            primary: {
              DEFAULT: '#42B5FC',foreground: '#FFFFFF',},secondary: {
              DEFAULT: '#3B434F',foreground: '#FFFFFF',},focus: '#BEF264',},},},}),heroui()],
};
