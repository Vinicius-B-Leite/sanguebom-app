import { ThemeType } from "../types/ThemeType"
import { defaultTheme } from "./defaultConfig"





export const lightMode: ThemeType = {
    colors: {
        background_200: 'rgba(0, 0, 0, 0.50)',
        background_100: '#ffffff',

        contrast_200: '#A81212',
        contrast_100: '#BB1B1B',
        contrast_20: '#FA9F9F',
        contrast_10: 'rgba(187, 27, 27, 0.10)',

        text_200: '#000000',
        text_100: '#6A6A6A',
        text_50: '#A7A7A7',

        communHeaderColor: '#BB1B1B',
        oppositeContrast: '#fff'
    },
    icons: defaultTheme.icons,
    fontSize: defaultTheme.fontSize,
    borderRadius: defaultTheme.borderRadius,
    vw: defaultTheme.vw,
    vh: defaultTheme.vh,
    type: 'light'
}