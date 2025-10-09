import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const StartLearningIcon = ({width, height}) => (
  <Svg
    width={width || 56}
    height={height || 56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

  >
    <Circle cx={28} cy={28} r={28} fill="#33569F" />
    <Path
      d="M22.8182 38L22.8182 35.143C22.519 32.1656 19 30.5717 19 26.0004C19 21.4291 21.7274 17.9437 27.1819 18.0007C31.1094 18.0417 34.8182 20.2863 34.8182 24.8576L37 28.286C37 30.5717 34.8182 30.5717 34.8182 30.5717C34.8182 30.5717 35.3636 36.2858 30.4545 36.2858V38"
      stroke="#ACCFFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27 28C28.1046 28 29 27.1046 29 26C29 24.8954 28.1046 24 27 24C26.6357 24 26.2942 24.0974 26 24.2676C25.4022 24.6134 25 25.2597 25 26C25 26.7403 25.4022 27.3866 26 27.7324C26.2942 27.9026 26.6357 28 27 28Z"
      stroke="#ACCFFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27 29C28.6569 29 30 27.6569 30 26C30 24.3432 28.6569 23 27 23C25.3432 23 24 24.3432 24 26C24 27.6569 25.3432 29 27 29Z"
      stroke="#ACCFFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="0.3 2"
    />
  </Svg>
);
export default StartLearningIcon;
