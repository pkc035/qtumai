import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Main, Map, Like, Favorite, Profile } from '../screens/TabScreens';
import { MaterialIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Main'
        tabBarOptions={{ showLabel: false }}
      >
        <Tab.Screen
          name='Main'
          component={Main}
          options={{
            tabBarIcon: (props) => {
              return TabIcon({ ...props, name: 'mail' });
            },
          }}
        />
        <Tab.Screen
          name='Map'
          component={Map}
          options={{
            tabBarIcon: (props) => {
              return TabIcon({ ...props, name: 'map' });
            },
          }}
        />
        <Tab.Screen
          name='Like'
          component={Like}
          options={{
            tabBarIcon: (props) => {
              return TabIcon({ ...props, name: 'star' });
            },
          }}
        />
        <Tab.Screen
          name='Favorite'
          component={Favorite}
          options={{
            tabBarIcon: (props) => {
              return TabIcon({ ...props, name: 'settings' });
            },
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: (props) => {
              return TabIcon({ ...props, name: 'person' });
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;
