import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PausedButton = ({size}) => (
  <Svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

  >
    <G filter="url(#filter0_i_862_8541)">
      <Rect width={36} height={36} rx={18} fill="#5189FC" />
      <Rect width={6} height={14} transform="translate(10 11)" fill="white" />
      <Rect width={6} height={14} transform="translate(20 11)" fill="white" />
    </G>
    <Defs></Defs>
  </Svg>
);
export default PausedButton;
