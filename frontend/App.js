import * as React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';

const Home = () => {
  return (
    <WebView
      source={{ uri: 'http://localhost:3000/login' }}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
      userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
      originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
    />
  );
};
const Like = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.0.69:3000/signup' }}
    />
  );
};

const Profile = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.0.69:3000/profile' }}
    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <StatusBar backgroundColor='#121212' barStyle='light-content' />
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Like' component={Like} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}
