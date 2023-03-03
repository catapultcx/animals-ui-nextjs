Next.js UI for the animals service.

This is the front end layer to the animals service. It uses the [animals-api](https://github.com/catapultcx/animals-api) to manage data. 

This front end adopts [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) through use of SSR and no dependency on Javascript in the browser.

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

## Commands

Run the development server locally and then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
npm run dev
```

Run the unit tests

```bash
npm test
```

Run the cypress tests (when the server already started)

```bash
npm run cypress
```

Run the cypress tests (this will start and stop the server)

```bash
npm run e2e
```

## Learn More

To learn more about the tech used, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Bootstrap documentation](https://react-bootstrap.github.io) 

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Steps to Recreate Project

- [Create the NextJS project](https://nextjs.org/docs/getting-started)
- [Add in React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
- [Set logo](https://nextjs.org/docs/basic-features/static-file-serving)
- [Add React SSR wrap](https://react-bootstrap.github.io/getting-started/server-side-rendering)
- [Add UI components](https://react-bootstrap.github.io/components/alerts)
- [General guide](https://blog.logrocket.com/handling-bootstrap-integration-next-js)
