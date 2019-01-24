import * as React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "./store/index";
import { Home, Detail } from "./screens/index";
import { theme, ThemeProvider } from "./theme/index";

export const AppNavigator = createAppContainer(createStackNavigator(
  {
    Home,
    Detail
  },
  {
    initialRouteName: "Home"
  }
));

export default class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ThemeProvider>
    );
  }
}

