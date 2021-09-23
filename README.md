This starter is a collection of libraries and approaches from my personal experience. No hard judgements ✌️

For more information, check out [Why](#why) section.

## Getting Started

#### Quick start with [cli-rn](https://github.com/kanzitelli/cli-rn)

Coming soon...

#### Manual setup

1. Clone the repo

```bash
> git clone https://github.com/kanzitelli/rn-starter.git AppName && cd AppName
```

2. Remove `.git` file (if not planning to contribute)

```bash
> rm -rf .git
```

3. Install packages and pods

```bash
> yarn && yarn ios:pods
```

4. Run it!

Open XCode or Android Studio to run the project (recommended) or do

```bash
> yarn ios
> yarn android
```

If you need to rename the app, do the following (based on [react-native-rename](https://github.com/junedomingo/react-native-rename)):

```bash
> yarn rename NewAppName
> yarn ios:pods
```

## What's inside

- [React Navigation](https://github.com/react-navigation/react-navigation) - routing and navigation for React Native apps. If you'd like to use [React Native Navigation](https://github.com/wix/react-native-navigation) by Wix, check out [rnn-starter](https://github.com/kanzitelli/rnn-starter).
- [RN UI lib](https://github.com/wix/react-native-ui-lib) - amazing Design System, UI toolset & components library for React Native. Dark Mode is implemented using this library.
- [Reanimated 2](https://github.com/software-mansion/react-native-reanimated) - React Native's Animated library reimplemented.
- [MobX](https://github.com/mobxjs/mobx) - simple, scalable state management, with [mobx-persist-store](https://github.com/quarrant/mobx-persist-store) for persisting your stores.
- ~~AsyncStorage~~ [MMKV](https://github.com/mrousavy/react-native-mmkv) - efficient, small mobile key-value storage framework developed by WeChat. [~30x faster](https://github.com/mrousavy/react-native-mmkv#benchmark) than _AsyncStorage_!

#### Extra helpful libraries

- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler) - native touches and gesture system for React Native.
- [React Native Device Info](https://github.com/react-native-community/react-native-device-info) - device information for React Native iOS and Android.
- [Hermes Engine](https://reactnative.dev/docs/hermes) - a JavaScript engine optimized for running React Native apps.
- [ESLint](https://github.com/eslint/eslint) + [Prettier](https://github.com/prettier/prettier) - keep your code neat and structured.
- [Patch Package](https://github.com/ds300/patch-package) - useful for fixing node modules instantly.
- [Release It](https://github.com/release-it/release-it) - automate versioning and publishing of your app.
- [Typescript](https://www.typescriptlang.org/) - strict syntactical superset of JavaScript.

#### Useful services/methods

- `navigation` - a service where all navigation configuration takes place in. It simplifies and abstracts the process of registering screens, layouts, etc.
- `translate` - a service that brings easy integration of localization for an app by using [i18n-js](https://github.com/fnando/i18n-js) and [react-native-localize](https://github.com/zoontek/react-native-localize). You can see an example of `en` and `ru` localizations in `Example` screen.
- `onStart` - a service where you can write your own logic when app is launched. For example, you can increment number of `appLaunches` there.
- `configureDesignSystem()` - a method where all settings for an app's design system is taking place. You can customize there colors, schemes, typegraphy, spacings, etc.

## Advantages

#### Describe app screens in one place

All setup for your screens takes place in one file `src/screens/index.ts`:

```
type Screen = 'Main' | 'Example' | 'Settings';
type Tabs = 'Main' | 'WIP' | 'Settings';

const screens: ScreenLayouts = {
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'Home',
    }),
  },
  // ...
}

const tabs: TabScreenLayouts = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
    }),
  },
  // ...
}
```

#### Build layouts with ease

Stack Navigator:

```
const HomeStack = () => genStackNavigator([screens.Main, screens.Example]);
```

Tab Navigator:

```
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.WIP, tabs.Settings]);
```

#### Navigate to other screens with predictability

```
const Screen = ({componentId}) => {
  const {nav} = useServices();

  return (
    <View>
      <Button
        label="Open Settings"
        onPress={() => nav.push('Settings')}
      />
    </View>
  )
}
```

#### Samples for new screens, services, stores and components.

So you have one structure within the project. You can find them in corresponding folders. Just copy&paste it and make the necessary changes.

## Enhancements

There are still some things I would like to add to the starter:

#### General

- [x] Passing props to a screen example
- [x] Constants: add Dimensions
- [x] AsyncStorage stores persisting example
- [ ] Shared transitions example

#### Production

- [ ] Auth flow
- [ ] Fast Image - [DylanVann/react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [ ] Notifications — [wix/react-native-notifications](https://github.com/wix/react-native-notifications)
- [ ] E2E tests - [wix/Detox](https://github.com/wix/Detox)
- [ ] Permissions — [zoontek/react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [ ] FB SDK — [thebergamo/react-native-fbsdk-next](https://github.com/thebergamo/react-native-fbsdk-next)
- [ ] Appodeal — [appodeal/react-native-appodeal](https://github.com/appodeal/react-native-appodeal)
- [ ] In-app purchases — [dooboolab/react-native-iap](https://github.com/dooboolab/react-native-iap)?

Feel free to open an issue for suggestions.

## Known issues (warnings)

- _Large title is not shown on 2nd+ tab_. This [issue](https://github.com/software-mansion/react-native-screens/issues/649) exists and there is a [patch](https://github.com/software-mansion/react-native-screens/issues/649#issuecomment-727553714) for fixing it. You can find it in `patches/react-native+0.65.1.patch`. It will be autorun when you do `yarn add/remove/etc`.
- _Over-The-Air Updates_. They have been removed from the current version as I had some problems publishing one of the apps to AppStore. Check out [my tweet](https://twitter.com/kanzitelli/status/1398229619862642692) and be aware of the issue if you'd like to use them anyways.

## Worth checking

### Articles

- Expo + React Native Navigation? Yes! - [Medium](https://kanzitelli.medium.com/expo-react-native-navigation-yes-ebda0cbfa4b1), [Dev.to](https://dev.to/kanzitelli/expo-react-native-navigation-1pll)
- cli-rn — making RN app developing experience as smooth as possible - [Medium](https://kanzitelli.medium.com/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-1022aae3a0d3), [Dev.to](https://dev.to/kanzitelli/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-4e98)

### Apps in production

- Wallpapers App - [Twitter](https://twitter.com/kanzitelli/status/1408192827155177472?s=20), App Store soon
- Rabbit App. Lite Reddit client - [Github](https://github.com/kanzitelli/rabbit-app), [App Store](https://apps.apple.com/ru/app/rabbit-app-lite-reddit-client/id1535084154), [Google Play](https://play.google.com/store/apps/details?id=io.batyr.rabbitapp)
- Trip Music Radio - [App Store](https://apps.apple.com/ru/app/id1525645826), [Google Play](https://play.google.com/store/apps/details?id=team.ggc.tripmusic)
- App for VK - [App Store](https://apps.apple.com/ru/app/id1067670987)
- Messenger for VK - [App Store](https://apps.apple.com/ru/app/id891605076)
- Christmas Market - [App Store](https://apps.apple.com/ru/app/id1446775875)

## Why

...do we need yet another starter/boilerplate? Well, I work with React Native for more than 3 years and during the time I started having my own project structure which was a good fit for almost all of the delivered apps. Also, I have come up with some custom [useful services/methods](#useful-servicesmethods) which simplify usage of [React Navigation](https://github.com/react-navigation/react-navigation) and other libraries. Check out [Advantages](#advantages) section.
If you'd like to use [React Native Navigation](https://github.com/wix/react-native-navigation) by Wix, check out [rnn-starter](https://github.com/kanzitelli/rnn-starter).

## License

This project is [MIT licensed](/LICENSE.md)
