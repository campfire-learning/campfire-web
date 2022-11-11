# Campfire Web App
This React app relies on the Ruby on Rails API server for data access.

### Starting the application
First get an Oauth client ID from your local Ruby on Rails database. Make sure you have run `seeds.rb` against development database. Then in Rails console run `Doorkeeper::Application.where(name: 'Web')` to get an application object. Copy the `uid` - this is your client ID for web development.

Then edit the Oauth client ID in `.env.development.local`, like so:
```
REACT_APP_OAUTH_CLIENT_ID=<your Oauth client ID>
```

## Getting Started

`yarn dev` to start the app
or `yarn build` and `yarn start` to start a production version of the app
