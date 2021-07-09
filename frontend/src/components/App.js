import * as React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Carousel from 'react-native-snap-carousel';

// export class MyCarousel extends Component {
//     _renderItem = ({ item, index }) => {
//         return (
//             <View style={styles.slide}>
//                 <Text style={styles.title}>{item.title}</Text>
//             </View>
//         );
//     };

//     render() {
//         return (
//             <Carousel
//                 ref={(c) => {
//                     this._carousel = c;
//                 }}
//                 data={this.state.entries}
//                 renderItem={this._renderItem}
//                 sliderWidth={sliderWidth}
//                 itemWidth={itemWidth}
//             />
//         );
//     }
// }

function SettingsScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Settings!</Text>
        </View>
    );
}
function LikeScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>LikeScreen!</Text>
        </View>
    );
}

function HeartScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>HeartScreen!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>ProfileScreen!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                {/* <Tab.Screen name="Home" component={Home} /> */}
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Like" component={LikeScreen} />
                <Tab.Screen name="Heart" component={HeartScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
