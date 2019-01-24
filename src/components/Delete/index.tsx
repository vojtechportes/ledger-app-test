import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Svg } from "expo";
import { colors } from "../../theme/index";


interface IProps {
  width: number;
  height: number;
  marginLeft?: number;
  marginRight?: number;
  onPress?: any;
}

const Delete: React.SFC<IProps> = ({ width, height, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Svg width={width} height={height} viewBox="0 0 459 459">
      <Svg.Path
        d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5 H51v51h357V25.5z"
        fill={colors.gray2}
      />
    </Svg>
  </TouchableOpacity>
);

export default Delete;
