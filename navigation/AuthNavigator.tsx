import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AuthScreen from "../screens/Auth";
import AuthCreateAccountScreen from "../screens/AuthCreateAccount";
import AuthLoginScreen from "../screens/AuthLogin";
import AuthRecoverPasswordScreen from "../screens/AuthRecoverPassword";
import AuthResetPasswordScreen from "../screens/AuthResetPassword";
import AuthSetupPasswordScreen from "../screens/AuthSetupPassword";
import AuthSetupUsernameScreen from "../screens/AuthSetupUsername";
import AuthVerifyActivationCodeScreen from "../screens/AuthVerifyActivationCode";
import type { MainNavigatorParamList } from "./MainNavigator";

type ParamList = {
  index: undefined;
  createAccount: undefined;
  verifyActivationCode: undefined;
  recoverPassword: undefined;
  login: undefined;
  setupUsername: {
    activationCode: string;
  };
  setupPassword: {
    username: string;
    activationCode: string;
  };
  resetPassword: {
    activationCode: string;
  };
};

export type AuthNavigatorParamList = ParamList & MainNavigatorParamList;

const Stack = createStackNavigator<ParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"index"} component={AuthScreen} />
      <Stack.Screen
        name={"createAccount"}
        component={AuthCreateAccountScreen}
      />
      <Stack.Screen
        name={"verifyActivationCode"}
        component={AuthVerifyActivationCodeScreen}
      />
      <Stack.Screen name={"login"} component={AuthLoginScreen} />
      <Stack.Screen
        name={"recoverPassword"}
        component={AuthRecoverPasswordScreen}
      />
      <Stack.Screen
        name={"setupUsername"}
        component={AuthSetupUsernameScreen}
      />
      <Stack.Screen
        name={"setupPassword"}
        component={AuthSetupPasswordScreen}
      />
      <Stack.Screen
        name={"resetPassword"}
        component={AuthResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
