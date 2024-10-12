import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SpriteActionScreen from "./screens/SpriteAction";
import { store } from "./Store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: "Scratch",
              headerTitleStyle: { color: "orange", fontWeight: "bold" },
            }}
          />
          <Stack.Screen name="SpriteAction" component={SpriteActionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
