import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

function Address() {
  const { kakao } = window;
  const [wantTOGo, setWantTOGo] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState("");

  const Postcode = data => {
    let geocoder = new kakao.maps.services.Geocoder();
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);

    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        setWantTOGo({
          address: address,
          latitude: coords.La,
          longitude: coords.Ma,
        });
      }
    });

    window.ReactNativeWebView.postMessage("Success!");

    console.log(wantTOGo);
  };
  return (
    <DaumPostcode
      onComplete={Postcode}
      autoClose={true}
      animation={true}
      height={"100%"}
      style={{ paddingTop: "80px", display: "block", position: "absolute" }}
    />
  );
}

export default Address;
