import React from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Button, View, Text, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const Home = () => {
  const nav = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const iconColor = isDarkMode ? Colors.lighter : Colors.darker;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />

        <View center>
          <Icon name="infinite" size={30} color={iconColor} />
        </View>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <View center>
            <Button
              marginV-s2
              label="Open Example Screen"
              onPress={() => nav.navigate('Example')}
            />
          </View>

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
            back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Example = () => {
  const nav = useNavigation();
  // const {nav, t} = useServices();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View flex bg-bgColor style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View padding-s4>
          {/* <Section title={t.do('section.navigation.title')}> */}
          <Section title="Navigation">
            <View center>
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.push')}
                label="Push"
                onPress={() => nav.push('Example')}
              />
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.show')}
                label="Show"
                onPress={() => Alert.alert('Show')}
              />
              <Button
                marginV-s1
                // label={t.do('section.navigation.button.show')}
                label="Back"
                onPress={() => nav.goBack()}
              />
            </View>
          </Section>

          <Text black center>
            localized with i18n-js
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

type ScreenName = 'Main' | 'Example';
type Screen = {
  name: string;
  component: React.FC;
  options: NativeStackNavigationOptions;
};
type GenNavigatorProps = {
  screens: Screen[];
};
const genNavigator = ({screens}: GenNavigatorProps) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {screens.map(it => (
        <Stack.Screen key={it.name} name={it.name} component={it.component} options={it.options} />
      ))}
    </Stack.Navigator>
  );
};

const defaultOptions = (): NativeStackNavigationOptions => ({
  // headerStyle: {backgroundColor: 'white'},
  headerLargeTitle: true,
  // headerTransparent: true,
});

const screens: {[key in ScreenName]: Screen} = {
  Main: {
    name: 'Home',
    component: Home,
    options: {
      ...defaultOptions(),
      title: 'Home',
    },
  },

  Example: {
    name: 'Example',
    component: Example,
    options: {
      ...defaultOptions(),
      title: 'Example',
    },
  },
};

const HomeNavigator = () => genNavigator({screens: [screens.Main, screens.Example]});
const ExampleNavigator = () => genNavigator({screens: [screens.Example]});

const Tab = createBottomTabNavigator();
const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        const iconName = (() => {
          if (route.name === 'HomeNavigator') {
            return focused ? 'newspaper' : 'newspaper-outline';
          }
          if (route.name === 'ExampleNavigator') {
            return focused ? 'construct' : 'construct-outline';
          }

          return 'list';
        })();

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.grey30,
    })}
  >
    <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{title: 'Home'}} />
    <Tab.Screen name="ExampleNavigator" component={ExampleNavigator} options={{title: 'Example'}} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
