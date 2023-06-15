import { Dimensions } from "react-native"
import { ThemeType } from "../types/ThemeType"

const { height, width } = Dimensions.get('screen')



export const darkMode: ThemeType = {
    colors: {
        background_200: '#0D0D0D',
        background_100: '#1F1F1F',

        contrast_200: '#A81212',
        contrast_100: '#FF0000',
        contrast_20: 'rgba(255, 0, 0, 0.40)',
        contrast_10: 'rgba(255, 0, 0, 0.10)',

        text_200: '#ffffff',
        text_100: '#6A6A6A',
        text_50: '#A7A7A7',
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
        xsm: width * 0.05,
        xxsm: width * 0.045,
        xxxsm: width * 0.043,
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