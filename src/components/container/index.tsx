import { NavigationContainer } from "@react-navigation/native";
import { Heading, NativeBaseProvider, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence } from "moti";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_400Regular,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import theme from "../../theme";
import { store } from "../../store";

interface Props {
  children: React.ReactNode;
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppContainer = ({ children }: Props) => {
  let [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <View onLayout={onLayoutRootView} />
          <AnimatePresence>{children}</AnimatePresence>
          <StatusBar />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default AppContainer;
