import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const WhiteBackButton = (props) => (
  <Svg
    width={45}
    height={45}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_3127_232)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.8754 12.154C26.4295 6.70802 17.5998 6.70802 12.1539 12.154C6.70791 17.5999 6.70795 26.4295 12.1539 31.8755C17.5999 37.3215 26.4294 37.3215 31.8754 31.8755C37.3213 26.4295 37.3214 17.5999 31.8754 12.154ZM27.2038 22.9875C27.7411 22.9875 28.1767 22.5519 28.1767 22.0146C28.1767 21.4773 27.7412 21.0417 27.2038 21.0417L19.1748 21.0417L22.0542 18.1623C22.4342 17.7823 22.4342 17.1663 22.0542 16.7863C21.6743 16.4064 21.0583 16.4064 20.6783 16.7863L16.138 21.3266C15.7581 21.7065 15.7581 22.3226 16.138 22.7025L20.6784 27.2429C21.0583 27.6228 21.6743 27.6228 22.0543 27.2429C22.4342 26.8629 22.4342 26.2469 22.0543 25.8669L19.1748 22.9875L27.2038 22.9875Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3127_232">
        <Rect
          width={31.1335}
          height={31.1335}
          fill="white"
          transform="translate(22.0146) rotate(45)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default WhiteBackButton;
