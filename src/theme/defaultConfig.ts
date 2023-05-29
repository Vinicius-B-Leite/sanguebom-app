import { Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')


export const defaultTheme = {
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