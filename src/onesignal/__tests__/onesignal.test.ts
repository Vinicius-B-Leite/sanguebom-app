import { registerAppOneSignal } from '../registerAppOneSignal'
import { updateBloodTypeTag } from '../updateBloodTypeTag'
import OneSignal from 'react-native-onesignal'


describe('onesignal', () => {
    it('registered app', () => {
        const mockSetAppid = jest.spyOn(OneSignal, 'setAppId').mockReturnThis()

        registerAppOneSignal()

        expect(mockSetAppid).toHaveBeenCalledWith(process.env.ONESIGNALAPPID)
        mockSetAppid.mockReset()
    })
    it('updated blood type in OneSignal', () => {

        const mockUpdateBloodTypeTag = jest.spyOn(OneSignal, 'sendTag').mockReturnThis()
        updateBloodTypeTag('A+')

        expect(mockUpdateBloodTypeTag).toHaveBeenCalledWith("bloodType", "A+")
    })


})