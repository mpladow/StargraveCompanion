import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {createContext, ReactElement, ReactNode, useMemo, useState} from 'react';
import {Colors} from '../themes/Colors';

interface ThemeContext {
    currentTheme: any
}

export const ThemeContext = createContext<ThemeContext>(
  {} as ThemeContext,
);
const CustomThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const current = useMemo(() => {
        const isDarkMode = useColorScheme() === 'dark';
        if (isDarkMode)
            return Colors.dark;
        else {
            return Colors.light;
        }
    }, []);
    return <ThemeContext.Provider value={{ currentTheme: current }}>{children}</ThemeContext.Provider>;
}

export default CustomThemeProvider;

const styles = StyleSheet.create({});
