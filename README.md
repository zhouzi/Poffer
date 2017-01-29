# Poffer

Automate sharing Pocket links to Twitter through Buffer.

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
That's why you need to authorize the application every time and why it can't suggest you to pick an user linked to your Buffer account (instead you need to enter the right Twitter user name).

There's one thing though that can't be done without storage: keeping track of your tweets history.
It means that if you share an item once and reload the page, the same Pocket item is going to show up again.

The feature to keep an history of your tweets is implemented but requires a database and thus costs.
There are a few ways you can benefit those "power" privileges...

### Support the project

I'd be glad to create you a VIP account on the application deployed at: [http://poffer.gabinaureche.com](http://poffer.gabinaureche.com).
I'd just kindly ask for your support by doing one or more of the following:

* Share Poffer on Twitter: [Tweet](https://twitter.com/home?status=If%20you%20use%20Pocket%20and%20Buffer,%20sharing%20the%20content%20you%20like%20on%20Twitter%20could%20get%20easier%20http%3A//poffer.gabinaureche.com%20via%20%40zh0uzi)
* Share Poffer on Facebook: [Share](https://www.facebook.com/sharer/sharer.php?u=http%3A//poffer.gabinaureche.com)
* Make a donation (anything, even 0.10€): [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FJGD394HHNZAJ)
* Say hello: hello@gabinaureche.com

I'll need two things to give you super powers:

1. An email address to get in touch
2. Your Poffer user name, which should be the email you used to sign up

### Remove Pocket tag

If you decided to add the tag "poffer" to the items you want to share, you can remove this tag from the ones you tweeted so it won't be retrieved anymore.

### Install a copy

Poffer is an open source project so you can clone it and run the application locally (or on your server).
Have a look at the documentation below to get started.

## Installation

Poffer is a NodeJS application that uses MongoDB as data base.
You'll also need to create a Pocket and Buffer application, which should be pretty straight forward.

* `git clone git@github.com:Zhouzi/Poffer.git` - Clone this repository
* `cd Poffer` - Move to the new Poffer directory
* `npm install` - Install NodeJS dependencies

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

Make sure to replace the placeholder values `<...>` by the relevant information.
With that file created, you can then start the application by running `bash start.sh` instead of `npm start`.

### Commands

* `npm start` - Start application
* `npm run build` - Build assets for production environment
* `npm run dev` - Build assets and watch for change for development environment

### Scripts

* `node ./app/scripts/addUser --email [email] --poffer [poffer_username]` - Add a "VIP" user
