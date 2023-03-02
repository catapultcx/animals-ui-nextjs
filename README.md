Next.js UI for the animals service.

This is the front end layer to the animals service. It uses the [animals-api](https://github.com/catapultcx/animals-api) to manage data. 

## Prerequisites

Developers should install the following on their machines:

* [NodeJS](https://nodejs.org/en/download), recommended to use [NVM](https://github.com/nvm-sh/nvm)

Optional

* [Docker](https://docs.docker.com/install)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Dependencies

This UI depends on the [animals-api](https://github.com/catapultcx/animals-api) for managing data.

### Setup

Environment variables are defined in the `.env.example` file. This should be copied locally into
`.env` but NOT commited.

Install the modules
```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the tech used, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Bootstrap documentation](https://react-bootstrap.github.io) 

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Steps to recreate project

- [Create the NextJS project](https://nextjs.org/docs/getting-started)
- [Add in React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
- [Set logo](https://nextjs.org/docs/basic-features/static-file-serving)
- [Add React SSR wrap](https://react-bootstrap.github.io/getting-started/server-side-rendering)
- [Add UI components](https://react-bootstrap.github.io/components/alerts)
- [General guide](https://blog.logrocket.com/handling-bootstrap-integration-next-js)
