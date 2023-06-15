import OneSignal from "react-native-onesignal"
import { ONESIGNALAPPID } from '@env'

export const registerAppOneSignal = () => {
    OneSignal.setAppId(ONESIGNALAPPID)
}