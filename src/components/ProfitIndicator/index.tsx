import * as React from "react";
import { Svg } from "expo";
import { colors } from "../../theme/index";

export enum TYPES {
  IN,
  OUT
}

interface IProps {
  direction: TYPES;
}

export const ArrowIcon: React.SFC<IProps & { color: string; }> = ({ direction, color }) => (
  <Svg width={20} height={20} viewBox="0 0 284.929 284.929">
    <Svg.G transform={`rotate(${direction === TYPES.IN ? 180 : 0})`}>
      <Svg.Path
        d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
      C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
      c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
      c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
      C284.929,199.378,283.984,197.188,282.082,195.285z"
        fill={color}
      />
    </Svg.G>
  </Svg>
);

const ProfitIndicator: React.SFC<IProps> = ({ direction }) => (
  <ArrowIcon direction={direction} color={direction === TYPES.IN ? colors.green : colors.gray1} />
);

export default ProfitIndicator;
