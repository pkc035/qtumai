import React, { useState } from "react";
// import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

function Where(props) {
  const [adress, setAdress] = useState("");
  const [isAdressOn, setIsAdressOn] = useState(false);

  const Postcode = data => {
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
    setAdress(fullAddress);
    setIsAdressOn(false);
  };
  return (
    <DaumPostcode
      onComplete={Postcode}
      autoClose={true}
      animation={true}
      height={500}
      style={{ paddingTop: "80px" }}
    />
  );
}

export default Where;
