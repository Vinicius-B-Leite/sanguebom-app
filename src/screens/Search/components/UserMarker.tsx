import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Coords } from '..';

type Props = {
    userLocation: Coords | undefined
}
const UserMarker: React.FC<Props> = ({ userLocation }) => {
    if (!userLocation) return <></>
    return (
        <Marker
            testID='userMarker'
            coordinate={{
                latitude: userLocation?.lat,
                longitude: userLocation?.lng,
            }}
            title='Você'
            description='Você está localizado aqui'
            pinColor='green'
        />
    )
}

export default UserMarker;