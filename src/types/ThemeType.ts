
export type ThemeType = {
    colors: {
        contrast_200: string,
        contrast_100: string,
        contrast_20: string,
        contrast_10: string,

        text_200: string,
        text_100: string,
        text_50: string,

        background_200: string,
        background_100: string,

        communHeaderColor: string,
        oppositeContrast: string
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