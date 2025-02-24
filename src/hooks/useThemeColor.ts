// src/hooks/useThemeColor.ts
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "react-native";

type ColorSchemeName = 'light' | 'dark';
type ColorPalette = typeof Colors['light'] & typeof Colors['dark'];

export function useThemeColors(): ColorPalette {
  const theme = useColorScheme() ?? "light";

  return Colors[theme] as ColorPalette;
}