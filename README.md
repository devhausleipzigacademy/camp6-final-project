# camp6-final-project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses the [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) package manager.

## Getting Started

First, install all dependencies:

```bash
yarn install
```

Then, either start Storybook to work on the components:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

Or run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Unit Testing with Vitest

We use Vitest to test our code. It is already set up, just make sure to **yarn install** and create a test file.

Test files should be placed in the same folder as the code you wish to test. The file be named spec.ts. For an example, check out pages/api/book/spec.ts.

For details and examples check the documentation linked below.

Open your terminal and use the following script to run Jest:

```bash
yarn test
```

Check out [the guide](https://vitest.dev/guide/#overview) for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Storybook

Installed the ESLint Plugin for Storybook
https://github.com/storybookjs/eslint-plugin-storybook#readme

For details and info on Storybook check the introduction file inside the stories folder.

To run Storybook use

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.
