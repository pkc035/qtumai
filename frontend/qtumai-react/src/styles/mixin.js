import { css } from "styled-components";

const flexSet = (
  justify = "center",
  items = "center",
  direction = "row"
) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${items};
  flex-direction: ${direction};
`;

const imageSet = (
  img = "",
  size = "cover",
  position = "center",
  repeat = "no-repeat"
) => css`
  background-image: ${img};
  background-size: ${size};
  background-position: ${position};
  background-repeat: ${repeat};
`;

const mixin = { flexSet, imageSet };

export default mixin;
