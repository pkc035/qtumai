// import * as React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { WebView } from 'react-native-webview';
// import { FloatingAction } from 'react-native-floating-action';
// import Icon from 'react-native-vector-icons/Ionicons';
// import styled from 'styled-components';

// const actions = [
//   {
//     text: 'Accessibility',
//     name: 'Where',
//     position: 1,
//   },
//   {
//     text: 'Language',
//     name: 'Who',
//     position: 2,
//   },
// ];

// const Home = () => {
//   return <WebView source={{ uri: 'http://192.168.0.70:3000/' }} />;
// };
// const Map = () => {
//   return <WebView source={{ uri: 'http://192.168.0.70:3000/Map' }} />;
// };

// const HaveNewData = (name) => {
//   return <WebView source={{ uri: `http://www.naver.com` }} />;
// };

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <View style={{ flex: 1 }}>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name='Home' component={Home} />
//           <Tab.Screen name='Map' component={Map} />
//         </Tab.Navigator>
//         <FloatingAction
//           actions={actions}
//           onPressItem={(name) => {
//             HaveNewData(name);
//           }}
//         />
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});
