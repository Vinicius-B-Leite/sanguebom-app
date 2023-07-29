import { getLocation } from '../getLocation'
import { pickImage } from '../pickImage'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker';




describe('Utils', () => {
    describe('getLocation', () => {
        jest.spyOn(Location, 'getCurrentPositionAsync')
            .mockResolvedValue({
                ...jest.requireActual('expo-location'),
                coords: {
                    altitude: 123123,
                    latitude: 123123,
                    longitude: 123123,
                    speed: 123,
                    accuracy: 123123,
                    altitudeAccuracy: 123123,
                    heading: 12312
                }
            })
        it('permisson was NOT enable', async () => {
            jest.spyOn(Location, 'requestForegroundPermissionsAsync')
                .mockResolvedValue({ ...jest.requireActual('expo-location'), status: Location.PermissionStatus.DENIED })


            const res = await getLocation()

            expect(res?.lat).not.toEqual(123123)
            expect(res?.lng).not.toEqual(123123)
        })
        it('permisson was enable', async () => {
            jest.spyOn(Location, 'requestForegroundPermissionsAsync')
                .mockResolvedValue({ ...jest.requireActual('expo-location'), status: Location.PermissionStatus.GRANTED })

            const res = await getLocation()

            expect(res?.lat).toEqual(123123)
            expect(res?.lng).toEqual(123123)
        })
    })
    describe('pickImage', () => {
        it('selected a image from gallery', async () => {
            jest.spyOn(ImagePicker, 'launchImageLibraryAsync')
                .mockResolvedValue({
                    canceled: false,
                    assets: [{
                        height: 30,
                        width: 30,
                        uri: 'file://',
                        type: 'image',
                        fileName: 'image.png'
                    }]
                })


            const imageResponse = await pickImage()

            expect(imageResponse?.canceled).toBeFalsy()
            expect(imageResponse?.assets[0].fileName).toEqual('image.png')
        })
        it('selected a image from gallery was CANCELED', async () => {
            jest.useFakeTimers()
            jest.spyOn(ImagePicker, 'launchImageLibraryAsync')
                .mockResolvedValue({
                    canceled: true,
                    assets: null
                })


            const imageResponse = await pickImage()
            expect(imageResponse).toBeUndefined()
        })

    })
})