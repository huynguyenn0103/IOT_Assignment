import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import EnvironmentChartScreen from "./screens/EnvironmentChartScreen";
import { Ionicons } from "@expo/vector-icons";
import DetailedEnvironmentChartScreen from "./screens/DetailedEnvironmentChartScreen";
import SchedulerScreen from "./screens/SchedulerScreen";
import AreaSelectorScreen from "./screens/AreaSelectorScreen";
import { useContext, useEffect } from "react";
import { ConnectToAda } from "./util/mqtt";
import AppContextProvider, { AppContext } from "./store/context";
import DeviceManagerScreen from "./screens/DeviceManagerScreen";
import LoginScreen from "./screens/LoginScreen";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const DrawNavigator = () => {
  useEffect(() => {
    //Todo: Connect to adafruit
    ConnectToAda();
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="User"
      screenOptions={{
        drawerActiveBackgroundColor: "#acfab2",
        drawerActiveTintColor: "#06550c",
        headerStyle: { backgroundColor: "#06550c" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          drawerLabel: "Welcome",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Environment Status"
        component={EnvironmentChartScreen}
        options={{
          drawerLabel: "Environment Status",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Scheduler"
        component={SchedulerScreen}
        options={{
          drawerLabel: "Scheduler",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-sharp" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Area"
        component={AreaSelectorScreen}
        options={{
          drawerLabel: "Area",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location-sharp" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Device Manager"
        component={DeviceManagerScreen}
        options={{
          drawerLabel: "Device Manager",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="build-sharp" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={UserScreen}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const Root = () => {
  const data = useContext(AppContext);
  return (
  <NavigationContainer>
    {data.login ? (
      <Stack.Navigator
        initialRouteName="User"
        screenOptions={{
          drawerActiveBackgroundColor: "#acfab2",
          drawerActiveTintColor: "#06550c",
          headerStyle: { backgroundColor: "#06550c" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detailed Chart"
          component={DetailedEnvironmentChartScreen}
        />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          drawerActiveBackgroundColor: "#acfab2",
          drawerActiveTintColor: "#06550c",
          headerStyle: { backgroundColor: "#06550c" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )}
  </NavigationContainer>);
};
export default function App() {
  return (
    <AppContextProvider>
      <Root/>
    </AppContextProvider>
  );
}
//npm install @react-navigation/drawer
//expo install react-native-gesture-handler react-native-reanimated
//npm install @react-navigation/bottom-tabs
