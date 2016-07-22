# Poffer

Automated Twitter content strategy based on the combination of Pocket+Buffer.

## Motivation

*WIP*

## Installation

* `git clone git@github.com:Zhouzi/Poffer.git` - Clone this repository
* `cd Poffer` - Move to the new Poffer directory
* `npm install` - Install NodeJS dependencies

## Commands

* `npm start` - Start application
* `npm run build` - Build assets for production environment
* `npm run dev` - Build assets and watch for change for development environment

For obvious security reasons, there's no secret tokens and whatsoever stored in this repository.
During development, you can create a `start.sh` script to make it easier to start the application:

```bash
#!/usr/bin/env bash

POCKET_CONSUMER_KEY=<pocket_consumer_key> \
POCKET_REDIRECT_URI=<pocket_redirect_uri> \
BUFFER_CLIENT_ID=<buffer_client_id> \
BUFFER_CLIENT_SECRET=<buffer_client_secret> \
BUFFER_REDIRECT_URI=<buffer_redirect_uri> \
npm start
```

Make sure to replace the placeholder values `<...>` by the relevant information after creating a Pocket and Buffer app.
