# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

local lib:
    
- axios
- tanstack

## How to Use


### Install dependencies

require 
    
    - Docker
    - Node 20 or above

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:


```bash
npm install
```

or 

```bash
pnpm i
```

### Run the development server

```bash
npm run dev
```

or 

```bash
pnpm dev
```

## To Build Image

first type command 

```bash
docker build -t cnc-recruit-project .
```
 
!!make sure your project has Dockerfile!!

and then use 

```bash
docker run -dp 3000:3000 cnc-recruit-project
```
to run project

and then you can go to ` localhost:3000 ` with your browser 

NOTE:

-d is stand for runnin in background
-p is to specify port



