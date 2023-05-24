
import * as Location from 'expo-location'

export const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    return { lat: coords.latitude, lng: coords.longitude }
}