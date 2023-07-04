import React, { useMemo } from 'react';
import { View } from 'react-native';
import { MapMarker, Marker } from 'react-native-maps';
import { MarkerType } from '../../../types/MarkerType';
import { HospitalType } from 'src/types/HospitalType';

// import { Container } from './styles';

type Props = {
    bloodCollectors: HospitalType[] | undefined,
    refs: React.MutableRefObject<React.RefObject<MapMarker>[]>,
    onClick: (marker: MarkerType) => void
}
const MarkersList = ({ bloodCollectors, refs, onClick }: Props) => {
    const markers = useMemo(() => {
        if (!bloodCollectors) return
        return bloodCollectors.map((bloodCollector) => (
            {
                coordinate: {
                    latitude: bloodCollector.lat,
                    longitude: bloodCollector.lng
                },
                title: bloodCollector.username,
                description: (bloodCollector?.alert?.status) && 'Este ponto está coletando sangue',
                pinColor: 'red',
                bloodTypes: bloodCollector.alert?.bloodTypes
            }
        )) as MarkerType[] | undefined

    }, [bloodCollectors])

    if (!markers) return null

    const handleSelectMarker = (mark: MarkerType) => {
        const isInAlert = !!mark.bloodTypes

        if (isInAlert) {
            onClick(mark)
        }
    }
    return (
        <>
            {
                markers.map((mark, i) => (
                    <Marker
                        ref={refs.current[i]}
                        key={i}
                        coordinate={{
                            latitude: mark.coordinate.latitude,
                            longitude: mark.coordinate.longitude,
                        }}
                        title={mark.title}
                        pinColor={mark.pinColor}
                        {...mark.description && { description: mark.description }}
                        onPress={() => handleSelectMarker(mark)}
                    />
                ))
            }
        </>
    )
}

export default MarkersList;