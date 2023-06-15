import OneSignal from "react-native-onesignal"

export const updateBloodTypeTag = (bloodType: string) => {
    OneSignal.sendTag('bloodType', bloodType)
}