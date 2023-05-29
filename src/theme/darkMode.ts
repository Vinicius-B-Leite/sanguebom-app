import { Dimensions } from "react-native"
import { ThemeType } from "../types/ThemeType"

const { height, width } = Dimensions.get('screen')



export const darkMode: ThemeType = {
    colors: {
        backgroundColor: '#060606',
        backgroundOpacity: 'rgba(0, 0, 0, 0.8)',
        backgroundColorSecond: '#D4BFBF',
        contrast: '#F65353',
        disabledContrast: '#7a3b3b',
        darkContrast: 'rgba(248, 1, 1, 0.4)',
        lightContrast: '#FBEAEA',
        darkText: '#959595',
        text: '#fff',
        inputBackgroundColor: '#3E0606',
        questionBackgroundColor: '#3E0606',
        optionsBg: '#FBB1B1',
        formInputBg: '#111111',
        alert: '#f00'
    },
    icons: {
        big: width * 0.3,
        md: width * 0.15,
        vmd: width * 0.1,
        sm: width * 0.07,
        vsm: width * 0.06,
        vvsm: width * 0.05
    },
    fontSize: {
        lg: width * 0.08,
        md: width * 0.06,
        xxxsm: width * 0.043,
        xxsm: width * 0.045,
        xsm: width * 0.05,
        sm: width * 0.035
    },
    borderRadius: {
        full: width,
        sm: width * 0.08,
        xsm: width * 0.03,
        xxsm: width * 0.02
    },
    vw: width,
    vh: height,
    type: 'dark'
}