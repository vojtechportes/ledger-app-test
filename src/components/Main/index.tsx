import { View } from "react-native";
import styled from "../../theme";

const Main: any = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default Main;
