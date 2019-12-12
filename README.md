# Practera-app-v2

## Requirements

- Ionic 4 
- Angular 7

## Development Notes

Run `npm install` to install necessary packages

Run `npm run start` to start a development server on your local, and calling stage-test.practera.com for API

Run `npm run local` to start a development server on your local, and calling 127.0.0.1:8080 for API

### Release Processes

1. Merge `develop` branch to `master` (if we are releasing develop branch)
1. Merge `master` branch to `release/eos` 
1. Create a new release in [Github](https://github.com/intersective/practera-app-v2/releases) with the release pull request link as the description
1. Change the version number on Slack `team-dev` channel 
  - `master` is always + 0.01 version ahead of `live`
  - `develop` is always + 0.1 version ahead of `live`

### New Relics Setup

1. Before we deploy app to live server, we'll need to create a `newrelic.js` file from project root directory's `/assets` folder
1. Please select either `newrelic.js.dev` or `newrelic.js.prod` based on the deployment environment
1. Live environment, use `newrelic.js.prod`. Development environment, use `newrelic.js.dev`
1. With the step above, new relic can collect and group collected information based on different environment.

### Useful links

1. [Ionic Components](https://ionicframework.com/docs/api/)
1. [Protractor API](https://www.protractortest.org/#/api)
1. [Chai API](https://www.chaijs.com/api/bdd/)

## External link format

### 1. Direct link login 

`*.com?do=secure&auth_token=*`

### 2. Direct link login and redirect to a specific page

`*.com?do=secure&auth_token=*&redirect=*&tl=*`

#### Required parameters:
- `auth_token` - the auth token used to authenticate user
- `redirect` - the page you will be redirect to 
- `tl` - timeline id of the program you are in

#### Valid `redirect` values:
- `home` - redirect to home page
- `project` - redirect to project page
- `activity` - redirect to project page with the following parameters
  - `act` - activity id
- `assessment` - redirect to assessment page with the following parameters
  - `act` - activity id
  - `ctxt` - context id
  - `asmt` - assessment id
- `reviews` - redirect to reviews list page
- `review` - redirect to assessment review page with the following parameters
  - `ctxt` - context id
  - `asmt` - assessment id
  - `sm` - submission id
- `chat` - redirect to chat list page
- `settings` - redirect to settings page

#### Examples:

1. `*.com?do=secure&auth_token=abcdefg&redirect=project&tl=312` will redirect you to the project page
1. `*.com?do=secure&auth_token=abcdefg&redirect=assessment&tl=312&act=231&ctxt=393&asmt=928` will redirect you to the assessment page

### 3. Reset password

`*.com?do=resetpassword&key=*&email=*`

### 4. Registration

`*.com?do=registration&key=*&email=*`