import { darkMode } from "../theme/darkMode";

type Theme = typeof darkMode

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}