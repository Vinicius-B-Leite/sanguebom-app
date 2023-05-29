
export type ThemeType = {
    colors: {
        backgroundColor: string,
        backgroundOpacity: string,
        backgroundColorSecond: string,
        contrast: string,
        disabledContrast: string,
        darkContrast: string,
        lightContrast: string,
        darkText: string,
        text: string,
        inputBackgroundColor: string,
        questionBackgroundColor: string,
        optionsBg: string,
        formInputBg: string,
        alert: string,
    },
    icons: {
        big: number,
        md: number,
        vmd: number,
        sm: number,
        vsm: number,
        vvsm: number,
    },
    fontSize: {
        lg: number,
        md: number,
        xxxsm: number,
        xxsm: number,
        xsm: number,
        sm: number,
    },
    borderRadius: {
        full: number,
        sm: number,
        xsm: number,
        xxsm: number,
    },
    vw: number,
    vh: number,
    type: 'dark' | 'light'
}