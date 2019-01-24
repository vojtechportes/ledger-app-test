import * as React from "react";
import { LinearGradient } from "expo";
import styled, { colors } from "../../theme";

const StyledLoading: any = styled(LinearGradient)`
  ${({ marginTop }: any) => marginTop ? `
    margin-top: ${marginTop};
  ` : ``}  
  ${({ marginBottom }: any) => marginBottom ? `
    margin-bottom: ${marginBottom};
  ` : ``}
  ${({ marginLeft }: any) => marginLeft ? `
    margin-left: ${marginLeft};
  ` : ``}  
  ${({ marginRight }: any) => marginRight ? `
    margin-right: ${marginRight};
  ` : ``}    
  ${({ type, height, width, borderRadius }: any) =>
    type === "circle"
      ? `
    height: ${width};
    border-radius: ${width};
  `
      : `
    height: ${height};
    border-radius: ${borderRadius}px;
  `};
`;

enum TYPES {
  line,
  circle
}

interface IProps {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number;
  type?: TYPES;
  borderRadius?: boolean | number;  
  gradient?: [string, string];
}

const Loading: React.SFC<IProps> = props => {
  let borderRadius;

  if (!props.borderRadius && props.borderRadius !== 0) {
    borderRadius = props.height ? props.height / 2 : 0;
  } else {
    borderRadius = props.borderRadius;
  }

  return (
    <StyledLoading
      marginBottom={props.marginBottom}
      colors={[colors[props.gradient[0]], colors[props.gradient[1]]]}
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      borderRadius={borderRadius}
      height={props.height}
      width={props.width}
      type={props.type}
    />
  );
};

Loading.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  width: "100%",
  height: 20,
  type: TYPES.line,
  borderRadius: false,
  gradient: ["gray3", "gray4"]
};

export default Loading;
