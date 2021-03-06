import React from "react";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Incidents from "./pages/Incidents";
import Detail from "./pages/Detail";

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen
                    name="Incidents"
                    component={Incidents}
                    options={TransitionPresets.SlideFromRightIOS}
                />
                <AppStack.Screen
                    name="Detail"
                    component={Detail}
                    options={TransitionPresets.SlideFromRightIOS}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
