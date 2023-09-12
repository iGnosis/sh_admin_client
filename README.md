# Sound Health - Admin Client

This repo contains the front-end code for Sound Health Admin Client.

The code is based on [ngx-admin](https://github.com/akveo/ngx-admin) build on Nebular design system.

## Getting Started

### Requirements
[Node.js](https://nodejs.org/en) >= v14.16

### Local setup

1. Use the package manager [npm](https://www.npmjs.com/) to install the required dependencies
```bash
npm install
```
2. Copy the `environment.ts` file for the local environment into `src/environments/local/environment.local.default.ts` and make necessary changes to the environment variables
3. After completing the installation, you can start the local server by running the following command:
```bash
npm start
```

This will start the local server, and you can access the application in your web browser at `http://localhost:4100`

### Build for Production

1. Create a copy of environment file `environment.ts` into the `src/environments` directory and name it `environment.prod.ts` and make necessary changes to the environment variables
2. Run the following command to build the application for production:
```bash
npm run build:prod
```

This will create a `dist` directory in your project containing the production-ready files which can be uploaded to any static site hosting service of choice.

### Troubleshooting

#### Conflicting packages

If you encounter conflicts or issues with package dependencies during installation, you can try running the following command to bypass peer dependency checks:
```bash
npm install --legacy-peer-deps
```

This can help resolve conflicts and allow you to install the required packages.
## Contributing

WIP

## License

WIP
