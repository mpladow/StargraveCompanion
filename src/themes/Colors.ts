import { Theme } from "@react-navigation/native"
import { DefaultTheme } from "react-native-paper"

export const Colors = {
    light: {
        primary: '#cc33ca',
        primaryLighter: '#f0c2ef',
        primaryDarker: '#b920b7',
        secondary: '#797979',
        secondaryLighter: '#d7d7d7',
        secondaryDarker: '#5c5c5c',
        tertiary: '#ff0000',
        tertiaryLighter: '#ffb3b3',
        text: '#000000',
        background: '#fafafa'
    },
    dark: {
        primary: '#cc33ca',
        primaryLighter: '#f0c2ef',
        primaryDarker: '#b920b7',
        secondary: '##797979',
        secondaryLighter: '#d7d7d7',
        secondaryDarker: '#5c5c5c',
        tertiary: '#ff0000',
        tertiaryLighter: '#ffb3b3',
        text: '#ffffff',
        background: '#2c2c2c'
    }
}

export const darkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#cc33ca',
        background: '#2c2c2c',
        card: '#2c2c2c',
        text: '#ffffff',
        border: '#ffffff',
        notification: '#ffffff'
    },
}

export const lightTheme: Theme = {
    dark: false,
    colors: {
        primary: '#cc33ca',
        background: '#fafafa',
        card: '#2c2c2c',
        text: '#000000',
        border: '#ffffff',
        notification: '#ffffff'
    },
}
// export const darkPaperTheme = {
//     ...DefaultTheme,
//     dark: true,
//     colors: {
//         primary: '#cc33ca',
//         background: '#2c2c2c',

//     }
// }