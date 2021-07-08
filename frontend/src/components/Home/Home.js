import * as React from 'react';
import { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Dimensions,
    ImageBackground,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

export default App = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselItems = [
        {
            title: 'Item 1',
            text: 'Text 1',
            backgroundImage: { uri: 'https://picsum.photos/id/11/200/300' },
        },
        {
            title: 'Item 2',
            text: 'Text 2',
            backgroundImage: { uri: 'https://picsum.photos/id/10/200/300' },
        },
        {
            title: 'Item 3',
            text: 'Text 3',
            backgroundImage: { uri: 'https://picsum.photos/id/12/200/300' },
        },
        {
            title: 'Item 4',
            text: 'Text 4',
            backgroundImage: { uri: 'https://picsum.photos/id/11/200/300' },
        },
        {
            title: 'Item 5',
            text: 'Text 5',
            backgroundImage: { uri: 'https://picsum.photos/id/11/200/300' },
        },
    ];

    const _renderImage = ({ item, index }) => {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginTop: 60,
                        marginLeft: 30,
                        zIndex: 1,
                    }}
                >
                    <Text>오늘의 추천</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ImageBackground
                        style={{ flex: 1 }}
                        source={item.backgroundImage}
                        resizeMode="cover"
                    />
                </View>
            </>
        );
    };

    const pagination = () => {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                }}
                inactiveDotStyle={
                    {
                        // Define styles for inactive dots here
                    }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={{
                    flex: 3,
                }}
            >
                <Carousel
                    layout={'default'}
                    ref={(ref) => (carousel = ref)}
                    sliderWidth={width}
                    itemWidth={width}
                    data={carouselItems}
                    renderItem={_renderImage}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    loop={true}
                    // autoplay={true}
                    itemHeight={1}
                    sliderHeight={500}
                ></Carousel>
            </SafeAreaView>
            <View style={{ flex: 2 }}></View>
        </View>
    );
};
