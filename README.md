# Express Server with Typescript & Jest

## Getting Started

### Run the Express server
```
npm start
```

### Development

To debug the Express server with auto-restart,
```
npm run dev
```

### 🛎 Available Commands for the Server

- Run the Server in production mode : `npm run start`
- Run the Server in development mode : `npm run dev`
- Run all unit-tests : `npm test`
- Check for linting errors : `npm run lint` => ESLint, Prettier :: Code Formatter is used
- Fix for linting : `npm run lint:fix`

### 🔮 PM2 :: Advanced, Production process manager for Node.js

[PM2](https://pm2.keymetrics.io/) is a daemon process manager that will help you manage and keep your application online 24/7.

- production mode :: `npm run deploy:prod` or `pm2 start ecosystem.config.js --only prod`
- development mode :: `npm run deploy:dev` or `pm2 start ecosystem.config.js --only dev`

Modify `ecosystem.config.js` file to your source code.

### 🏎 SWC :: a super-fast JavaScript / TypeScript compiler

[SWC](https://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.

`SWC is 20x faster than Babel on a single thread and 70x faster on four cores.`

- tsc build :: `npm run build`
- swc build :: `npm run build:swc`

Modify `.swcrc` file to your source code.


## Notes

- I have used [ForeRunnerDB](https://www.npmjs.com/package/forerunnerdb) as `in-memory` Database
  - This DB will get `clear` each time when the server will start
- Tests will run in a sequence like the below:
  1. CREATE USER
  2. GET ALL USERS or BY USER ID
  3. UPDATE USER DETAILS
  4. DELETE USER

