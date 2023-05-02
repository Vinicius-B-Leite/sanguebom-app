import { Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')

export const darkMode = {
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
    vh: height
}