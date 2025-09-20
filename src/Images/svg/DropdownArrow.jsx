import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DropDownArrow = ({ size = 30, flip = "right", color = "#000000" }) => {
  let transformStyle = [];

  // Flip based on the direction (left, right, up, down)
  switch (flip) {
    
    case "up":
      transformStyle = [{ rotate: "90deg" }];
      break;
    case "down":
      transformStyle = [{ rotate: "270deg" }];
      break;
    default:
      transformStyle = []; // Default is right (no transformation needed)
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: transformStyle,
      }}
    >
      <Path
        d="M12.5 5L7.5 10L12.5 15"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DropDownArrow;
