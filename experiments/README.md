# Experiments
This is folder specifically created for experimental code, do not use them for production.

## Requirements
- Appium: get it [here](http://appium.io/) or through npm (install globally with `npm i appium -g`)
- XCUITest (iOS UI testing)
- UiAutomator2 (android testing)
- java (android testing)
- Android SDK (require Android Virtual Device ,or AVD, for android simulation)
- XCode (iOS testing + iOS simulation)
- nodejs

## Development Notes

### Android
WebDriver: [UiAutomator2](http://appium.io/docs/en/drivers/android-uiautomator2/)


### iOS
[XCUITesting Driver Requirement](http://appium.io/docs/en/drivers/ios-xcuitest/index.html#requirements-and-support)
Minimum test target version: *iOS 9.3*

## To-do

1. Appium
  - Android
  - iOS

1. Development
  1. Inside `/experiments/appium`, run `npm install`
  1. Run `appium`, it'll booted an Appium local web server (default port: 4723)
  1. For iOS UI Testing, you can unzip the _App.zip_ file and run `node index.js`
  1. For Android testing, you'll need to generate an apk from android studio and update the *app* value on `/experiments/appium/index.js`
  1. If you run into error, please check Appium for troubleshooting

### Testing your setup

1. You can test if your Appium setup is working on Android with the attached apk below inside */experiments/appium/ApiDemos-debug.apk*

1. Please update the value of *app* path inside */experiments/appium/index.js* according to the new apk file path.



### Troubleshotting
coming soon