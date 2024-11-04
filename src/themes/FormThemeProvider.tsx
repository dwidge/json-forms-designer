import { useColorScheme } from "@dwidge/components-rnw";
import { ThemeProvider as RNEThemeProvider, useTheme } from "@rneui/themed";
import React from "react";
import {
  DefaultTheme as PaperDefaultTheme,
  PaperProvider,
} from "react-native-paper";
import {
  darkComponentTheme,
  lightComponentTheme,
  mergeThemes,
} from "./componentThemes";
import { darkMaterialTheme, lightMaterialTheme } from "./materialThemes";

export const FormThemeProvider = ({
  colorScheme = useColorScheme(),
  children = <></>,
}) => (
  <RNEThemeProvider
    theme={mergeThemes([
      colorScheme === "dark" ? darkComponentTheme : lightComponentTheme,
      useTheme().theme,
    ])}
  >
    <PaperProvider
      theme={{
        ...PaperDefaultTheme,
        ...(colorScheme === "dark" ? darkMaterialTheme : lightMaterialTheme),
      }}
    >
      {children}
    </PaperProvider>
  </RNEThemeProvider>
);
