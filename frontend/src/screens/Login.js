import React, { useState } from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { StatusBar } from "react-native";
import { URI } from "../config";

const Login = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <WebView
        source={{ uri: `${URI}/signup/preference` }}
        onMessage={(event) =>
          event.nativeEvent.data === "Success!"
            ? navigation.navigate("Home")
            : null
        }
        userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
`;

// import React, { Component } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// import SocialWebviewModal from "./SocialWebviewModal";

// export default class LoginScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       socialModalVisible: false,
//       source: undefined,
//     };
//   }
//   //소셜 로그인
//   onPressSocial = async (social) => {
//     this.setState({
//       socialModalVisible: !this.state.socialModalVisible,
//       source: `서버주소/oauth/${social}`,
//     });
//   };

//   closeSocialModal = async () => {
//     this.setState({
//       socialModalVisible: !this.state.socialModalVisible,
//     });
//   };

//   render() {
//     return (
//       ///다른 코드 생략
//       <View>
//         {this.state.source !== undefined ? (
//           <SocialWebviewModal
//             visible={this.state.socialModalVisible}
//             source={this.state.source}
//             closeSocialModal={this.closeSocialModal}
//           />
//         ) : null}
//         <TouchableOpacity
//           style={
//             {
//               //
//             }
//           }
//           onPress={() => this.onPressSocial("kakao")}
//         >
//           <Text
//             style={{
//               color: "#391B1B",
//               fontSize: 18,
//               fontWeight: "bold",
//               marginTop: 20,
//             }}
//           >
//             카카오 로그인
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
