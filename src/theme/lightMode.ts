import { ThemeType } from "../types/ThemeType"
import { defaultTheme } from "./defaultConfig"





export const lightMode: ThemeType = {
    colors: {
        backgroundColor: '#fff',
        backgroundOpacity: 'rgba(0, 0, 0, 0.4)',
        backgroundColorSecond: '#D4BFBF',
        contrast: '#F65353',
        disabledContrast: '#7a3b3b',
        darkContrast: '#BB1B1B',
        lightContrast: '#FBEAEA',
        darkText: '#959595',
        text: '#000',
        inputBackgroundColor: '#DC7878',
        questionBackgroundColor: '#FFF6F6',
        optionsBg: '#FBB1B1',
        formInputBg: '#F1F1F1',
        alert: '#f00'
    },
    icons: defaultTheme.icons,
    fontSize: defaultTheme.fontSize,
    borderRadius: defaultTheme.borderRadius,
    vw: defaultTheme.vw,
    vh: defaultTheme.vh,
    type: 'light'
}