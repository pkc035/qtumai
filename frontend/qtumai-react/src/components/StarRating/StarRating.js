import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({
  name,
  setTaste,
  setClear,
  setServices,
  setMood,
  setPrice,
}) => {
  const [rating, setRating] = useState("");

  const RatingReview = ratingValue => {
    setRating(ratingValue);

    if (name === "맛") {
      setTaste(ratingValue);
    } else if (name === "청결") {
      setClear(ratingValue);
    } else if (name === "서비스") {
      setServices(ratingValue);
    } else if (name === "분위기") {
      setMood(ratingValue);
    } else if (name === "가성비") {
      setPrice(ratingValue);
    }
  };

  return (
    <div>
      {[...Array(5)].map((star, idx) => {
        const ratingValue = idx + 1;
        return (
          <label>
            <RadioButton
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => RatingReview(ratingValue)}
            />
            <Star
              className="star"
              color={ratingValue <= rating ? "#ff3000" : "#e4e5e9"}
              size={25}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;

const Star = styled(FaStar)`
  padding-right: 7px;
`;

const RadioButton = styled.input`
  display: none;
`;
