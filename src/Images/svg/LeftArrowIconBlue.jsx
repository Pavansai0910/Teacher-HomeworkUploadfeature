import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LeftArrowIconBlue = ({flip}) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: flip ? [{ scaleX: -1 }] : undefined, // Apply horizontal flip if flip prop is true
    }}
  >
    <Path
      d="M12.5 5L7.5 10L12.5 15"
      stroke="#33569F"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LeftArrowIconBlue;
