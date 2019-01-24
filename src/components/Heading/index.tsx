import * as React from "react";
import { Text } from "react-native";
import styled from "../../theme";

const StyledHeading: any = styled(Text)`
  color: ${({ theme, color }: any) => theme.colors[color]};
  font-weight: bold;
  text-align: ${({ align }: any) => align};
    ${({ size, marginBottom }: any) =>
      size === "large" &&
      `
    font-size: 34;
    margin-bottom: ${marginBottom ? marginBottom : 20};
  `}
    ${({ size, marginBottom }: any) =>
      size === "normal" &&
      `
    font-size: 26;
    margin-bottom: ${marginBottom ? marginBottom : 16};
  `}
    ${({ size, marginBottom }: any) =>
      size === "small" &&
      `
    font-size: 20;
    margin-bottom: ${marginBottom ? marginBottom : 12};
  `}
    ${({ size, marginBottom }: any) =>
      size === "extra-small" &&
      `
    font-size: 16;
    margin-bottom: ${marginBottom ? marginBottom : 12};
  `};
`;

interface IProps {
  size?: "large" | "normal" | "small" | "extra-small";
  align?: "left" | "center" | "right";
  marginBottom?: number;
  color?: any;
  children?: React.ReactNode | React.ReactNodeArray;
}

const Heading: React.SFC<IProps> = ({
  size,
  align,
  color,
  children,
  marginBottom
}) => (
  <StyledHeading
    size={size}
    align={align}
    color={color}
    marginBottom={marginBottom}
  >
    {children}
  </StyledHeading>
);

Heading.defaultProps = {
  size: "normal",
  align: "left",
  color: "gray1",
  children: ""
};

export default Heading;
