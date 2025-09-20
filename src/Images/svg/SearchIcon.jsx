import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = ({width, height}) => (
  <Svg
    width={width || 14}
    height={height || 14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.85454 9.86992L11.6512 11.6666M11.1326 6.7555C11.1326 9.19792 9.1592 11.1778 6.72554 11.1778C4.29129 11.1778 2.31787 9.19792 2.31787 6.75609C2.31787 4.3125 4.29129 2.33325 6.72495 2.33325C9.1592 2.33325 11.1326 4.31309 11.1326 6.7555Z"
      stroke="#696969"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SearchIcon;
