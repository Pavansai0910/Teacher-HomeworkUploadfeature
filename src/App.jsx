import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./Context/AuthContext";
import AppNavigator from "./Navigation/AppNavigator";
import NetworkInfo from "./Network/NetworkInfo";
import * as Clarity from '@microsoft/react-native-clarity';
import { SafeAreaProvider } from "react-native-safe-area-context";
function App() {

    const ClarityProjectId = process.env.PROJECT_ID

  useEffect(() => {
    Clarity.initialize(ClarityProjectId, {
      logLevel: Clarity.LogLevel.None, // Note: Use "LogLevel.Verbose" value while testing to debug initialization issues.
    });
  }, []); // The empty array ensures this effect runs only once

  return (
      <SafeAreaProvider>
    <AuthProvider>
      <NetworkInfo />
      <AppNavigator />
      <Toast />
    </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
