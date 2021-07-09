import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';

const Home = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.0.69:3001' }}
      style={{ marginTop: 20 }}
    />
  );
};
const Like = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.0.69:3001' }}
      style={{ marginTop: 20 }} 
    />
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Like' component={Like} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
