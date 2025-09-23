import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const BlueSettingIcon = ({width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#33569F"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-settings-icon lucide-settings"
  >
    <Path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
);
export default BlueSettingIcon;
