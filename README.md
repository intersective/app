# Practera-app

![Build Status](https://codebuild.ap-southeast-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiYVA3Zi9rVHlUSlNWT1VkZkY3R1FPS3pwd01EeWo4UTlFanUyQk1UanUveW1VRlgvdnhudVR3RUhsUXBhYk9kYXhmNnJTYjBramVuTkRTc3JyNkZJajZFPSIsIml2UGFyYW1ldGVyU3BlYyI6IkVabm9Va3hoUnhhSmNTSTEiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## Requirements

- Ionic v7
- Angular v17

## Development Notes

Run `npm install` to install necessary packages

Run `npm run lint` to lint app codebase

Run `npm start` to launch App locally

Run `npm run i18n` to update coverage of translateable static text

### Starting a development server calling the stage environment

Run `npm start` to start a development server on your local, and calling p2-stage.practera.com or core-graphql endpoint for API

### Starting a development server on the local environment

Run `npm run local` to serve app on localhost and calling 127.0.0.1:8080 for API

Run `npm start` to serve app on localhost

### Release Processes

1. Merge `develop` branch to `master` (if we are releasing develop branch)
1. Merge `master` branch to `release/eos`
1. Create a new release in [Github](https://github.com/intersective/practera-app-v2/releases) with the release pull request link as the description
1. Change the version number on Slack `team-dev` channel
  - `master` is always + 0.01 version ahead of `live`
  - `develop` is always + 0.1 version ahead of `live`

### New Relics Setup (retired)

1. Before we deploy app to live server, we'll need to create a `newrelic.js` file from project root directory's `/assets` folder
1. Please select either `newrelic.js.dev` or `newrelic.js.prod` based on the deployment environment
1. Live environment, use `newrelic.js.prod`. Development environment, use `newrelic.js.dev`
1. With the step above, new relic can collect and group collected information based on different environment.

### Useful links

1. [Ionic Components](https://ionicframework.com/docs/api/)
1. [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

## Automation Test

### NPM commands

1. `npm run e2e` test all features for desktop & Android & Iphone
1. `npm run e2e-dev` used for devs to develop tests
1. `npm run e2e-sandbox` used to run automation test on sandbox

### Development

- Copy & paste `e2e/config/index.default.ts` and change the name to `index.ts` and fill in correct accounts
- Copy & paste `e2e/protractor-dev.default.conf.js` and change the name to `protractor-dev.conf.js`
- Change the feature file path in `e2e/protractor-dev.conf.js` to the feature that you are developing
- If you need to develop automation test for mobile, uncomment the `chromeOptions->mobileEmulation` part inside `e2e/protractor-dev.conf.js`
- run `npm run e2e-dev` to see the result

## External link format

### Login Options
1. Normal login with user's credentials
1. Direct link Login (core / login app)
    - Simplest form - `*.com?do=secure&auth_token=*`
    - Deeplinking form - `*.com?do=secure&auth_token=*&redirect=*&tl=*`
1. Global Login (core / login app)
    - Format: `*.com?service=LOGIN&multiple=true&apikey=*&stack_uuid=*`

#### Deeplinking parameters:
- `auth_token` - the auth token used to authenticate user
- `tl` - timeline id of the program you are in
- `redirect` - the page you will be redirect to (see details below)

##### Valid `redirect` parameter values/options:
- `home` - redirect to home page
- `project` - redirect to project page
- `activity` - redirect to activity page with the following parameters
  - `act` - activity id
- `activity_task` - redirect to activity-task page(without menu) with the following parameters
  - `act` - activity id
  - `activity_task_referrer_url` - if this url is passed in, we will redirect the user to this url when user click back button on activity detail page, or click continue button of last task
- `assessment` - redirect to assessment page with the following parameters
  - `act` - activity id
  - `ctxt` - context id
  - `asmt` - assessment id
  - `sm` - submission id - [optional] if provide, will redirect user to `assessment/:activityId/:contextId/:id/:submissionId`
  - `assessment_referrer_url` - if this url is passed in, we will redirect the user to this url when user click back button or continue button on assessment page
- `topic` - redirect to topic page with the following parameters
  - `act` - activity id
  - `top` - topic id
- `reviews` - redirect to reviews list page
- `review` - redirect to assessment review page with the following parameters
  - `ctxt` - context id
  - `asmt` - assessment id
  - `sm` - submission id
  - `assessment_referrer_url` - if this url is passed in, we will redirect the user to this url when user click back button or continue button on review page
- `chat` - redirect to chat list page
- `settings` - redirect to settings page
- `settings-embed` - redirect to settings embed page

##### Optional parameters:
- `return_url` - when user switch program, he/she will be redirect to this url

##### Examples:
1. `*.com?do=secure&auth_token=abcdefg&redirect=project&tl=312` will redirect you to the project page
1. `*.com?do=secure&auth_token=abcdefg&redirect=assessment&tl=312&act=231&ctxt=393&asmt=928` will redirect you to the assessment page

### 3. Reset password

`*.com?do=resetpassword&key=*&email=*`

### 4. Registration

`*.com?do=registration&key=*&email=*`

## AWS code build

See buildspec.yml for the steps needed for the CodeBuild.

### Environmental variables

Any variables that will be passed with the prefix CUSTOM_ will be merged into the the [src/environments/environment.custom.ts](./src/environments/environment.custom.ts) file and in the [angular.json](./angular.json). See the [env.sh](./env.sh) file for details.

Other variables that need to be passed to the codebuild project are:

* S3_BUCKET - the S3 bucket where the code will be deployed.
* CF_DIST_ID - the CF distribution that will be invalidated when a deploy happens
* CUSTOM_COUNTRY - country for the installation, supported values - `AUS`, `US`
* CUSTOM_JS_ENVIRONEMENT - used in [angular.json](./angular.json) for new relic, possible values `prod`,  `dev`
* CUSTOM_ENVIRONMENT - the env variable used in the [src/environments/environment.custom.ts](./src/environments/environment.custom.ts). Possible values `develop`, `sandbox`, `stage`, `live`
* CUSTOM_S3_BUCKET - the bucket used for the filestack uploads
* CUSTOM_API_ENDPOINT - the API endpoint
* CUSTOM_APP - the name of the app, used to prefix the file uploads, needed for multi tenancy
* CUSTOM_AWS_REGION - the region the app will work in
* CUSTOM_GRAPH_QL - the graph QL endpoint
* CUSTOM_INTERCOM - intercom details
* CUSTOM_APPKEY - Appkey used to talk to the API
* CUSTOM_PUSHERKEY - pusherKey used
* CUSTOM_FILESTACK_SIGNATURE - the filestack signature
* CUSTOM_FILESTACK_POLICY - the filestack policy
* CUSTOM_FILESTACK_VIRUS_DETECTION - the filestack virus detection policy
* CUSTOM_FILESTACK_KEY - the filestack key


###Read More [Documentation](./docs/docs.md)