import React, { Component } from "react";
import { WebView } from "react-native-webview";

// import { useAsyncStorage } from "@react-native-community/async-storage";
// const { setItem } = useAsyncStorage("토큰 key 값");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';

  _handleMessage = async (event) => {
    console.log(JSON.parse(event.nativeEvent.data));
    let result = JSON.parse(event.nativeEvent.data);
    let success = result.message;
    // if (success) {
    //   let userToken = result.Authorization;
    //   try {
    //     // await setItem(userToken);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    this.props.closeSocialModal();
  };

  render() {
    return (
      <WebView
        // ref={this._refWebView}
        originWhitelist={["*"]}
        injectedJavaScript={this.INJECTED_JAVASCRIPT}
        source={this.props.source}
        javaScriptEnabled={true}
        onMessage={this._handleMessage}
      />
    );
  }
}
