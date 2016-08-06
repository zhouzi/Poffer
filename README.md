# Poffer

A tool that makes it easier to share the content you like thanks to Pocket+Buffer.

* [Web App](http://poffer.gabinaureche.com)
* [Demo](#demo)
* [Motivation](#motivation)
* [How it works](#how-it-works)
* [Limitations](#limitations)
* [Installation](#installation)

## Demo

![Poffer demo screencast](http://g.recordit.co/GLNgo4Pdjd.gif)

## Motivation

I've always been a terrible Twitter user.
Despite the fact I often stumble and save content I'd like to share, I always failed to do it.
I feel like you got to be always connected and have the reflex of tweeting right away.
I've tried many times but without success so I eventually gave up.

I've recently been exposed to a few tips, e.g why it's ok/advised to tweet many times the same content and how Buffer can actually help you being a good Twitter citizen.
I couldn't set up a proper workflow with IFTT/Zapier so I thought I'd build it.

You can read the full story here: [I am a terrible Twitter user so I built a tool to help me out](https://wizbii.tech/i-am-a-terrible-twitter-user-so-i-built-a-tool-to-help-me-out-b757c32c69b5?utm_source=github&utm_medium=readme&utm_campaign=open%20source).

## How it works

The process is:

1. Save items to your Pocket account
2. Retrieve them on Poffer
3. Write different tweets for the same content
4. Review your queue (Poffer orders the tweets to avoid repetition)
5. Add them to your Buffer queue

## Limitations

To avoid the need for storage (and thus costs), by default no data is saved anywhere.
That's why you need to authorize the application every time and why you can't pick a Buffer account from a list.

There's one thing though that can't be done without storage: remembering what items you shared.
If you share an item once and reload the page to retrieve your Pocket items, the same ones are going to show up.

The feature to keep track of your tweets history is implemented but requires a database.
So there are a few ways to benefit from it...

### Support the project

I don't want to make any money out of Poffer but I do have to run a server linked to a database to make it work.
So if you want to support the project and get a "VIP" account (with the extra feature mentioned above) I'd appreciate your support.
I'm not setting any price/fee/whatever, that's not the point so it could be 0.01€ or 10€ it's up to you: [paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FJGD394HHNZAJ).

If you decide to do so, please be sure to provide me with:

* An email address so I can get in touch
* Your Pocket user name - should be the email address you used to sign up

Feel free to get in touch if you have any questions: hello@gabinaureche.com

### Install a copy

Poffer is an open source project so you can clone it and run the application locally (or on your server).
Have a look at the documentation further below to get started.

### Remove Pocket tag

If you decided to add the tag "poffer" to the items you want to share, you can remove this tag from the ones you tweeted so it won't be retrieved anymore.

## Installation

* `git clone git@github.com:Zhouzi/Poffer.git` - Clone this repository
* `cd Poffer` - Move to the new Poffer directory
* `npm install` - Install NodeJS dependencies

### Requirements

1. NodeJS, MongoDB
2. Create a Pocket application
3. Create a Buffer application

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

### Commands

* `npm start` - Start application
* `npm run build` - Build assets for production environment
* `npm run dev` - Build assets and watch for change for development environment

### Scripts

* `node ./app/scripts/addUser --email [email] --poffer [poffer_username]` - Add a "VIP" user
