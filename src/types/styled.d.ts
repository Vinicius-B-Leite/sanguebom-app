import { ThemeType } from "./ThemeType";


declare module 'styled-components/native' {
    export interface DefaultTheme extends ThemeType { }
}