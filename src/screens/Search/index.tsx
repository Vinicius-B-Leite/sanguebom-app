import React, { useState, useMemo, useRef, createRef, useEffect } from 'react';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as S from './styles'
import { useQuery } from '@tanstack/react-query';
import { getBloodCollectors } from '../../api/getBloodCollectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import AlertButton from '../../components/AlertButton';
import ModalCreateAlert from '../../components/ModalCreateAlert';
import { MarkerType } from '../../types/MarkerType';
import { HospitalType } from '../../types/HospitalType';
import Alert from './components/Alert';
import { getLocation } from '../../utlis/getLocation';
import Header from './components/Header';
import SearchList from './components/SearchList';
import UserMarker from './components/UserMarker';

export type Coords = { lat: number, lng: number }

const Search: React.FC = () => {

  const user = useSelector((state: RootState) => state.user.user)

  const [location, setLocation] = useState<Coords | null>(null)
  const [userLocation, setUserLocation] = useState<Coords | undefined>()
  const [searchInput, setSeatchInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentBloodCollector, setCurrentBloodCollector] = useState<MarkerType>()

  const { data } = useQuery(
    ['bloodCollectors'],
    () => getBloodCollectors(searchInput),
  )

  const refs = useRef(Array.from({ length: data?.length || 999 }).map(() => createRef<MapMarker>()))

  let searchedBloodCollectors = useMemo(() => {
    if (searchInput.length > 0 && data) {
      return data.filter((v) => v.username.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
    }
  }, [searchInput, data])



  useEffect(() => {
    getLocation().then(setUserLocation)
  }, [])


  const handleClickSearchedBloodCollector = (suggestItem: HospitalType) => {
    setLocation({ lat: suggestItem.lat, lng: suggestItem.lng })
    setSeatchInput('')


    if (!data) return

    refs?.current[data.findIndex(v => v.username === suggestItem.username)].current?.showCallout()
  }

  const markers = useMemo(() => {
    if (!data) return
    return data.map((bloodCollector) => (
      {
        coordinate: {
          latitude: bloodCollector.lat,
          longitude: bloodCollector.lng
        },
        title: bloodCollector.username,
        description: (bloodCollector?.alert?.status) && 'Este ponto está coletando sangue',
        pinColor: 'red',
        bloodTypes: bloodCollector.alert?.bloodTypes,
        isInAlert: bloodCollector.alert?.status
      }
    )) as MarkerType[] | undefined

  }, [data])

  if (!markers) return null

  const handleSelectMarker = (mark: MarkerType) => {
    if (mark.isInAlert) {
      setCurrentBloodCollector(mark)
    }
  }
  return (
    <S.Container>

      <Header
        searchInput={searchInput}
        setSeatchInput={setSeatchInput} />

      <SearchList
        searchedBloodCollectors={searchedBloodCollectors}
        handleClickSearchedBloodCollector={handleClickSearchedBloodCollector} />

      <MapView
        testID='mapview'
        onPress={() => setCurrentBloodCollector(undefined)}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: location?.lat ?? -23.1184444,
          longitude: location?.lng ?? -46.5811119,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {

          markers.map((mark, i) => (
            <Marker
              testID={`marker_${i}`}
              ref={refs?.current[i]}
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


        <UserMarker userLocation={userLocation} />

      </MapView>

      {
        !currentBloodCollector &&
        <AlertButton onClick={() => setModalVisible(true)} />
      }


      <ModalCreateAlert
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        bTypesSelecteds={data && data[data?.findIndex(v => v.uid === user!.uid)]?.alert?.bloodTypes}
        isAlertOn={(data && data[data?.findIndex(v => v.uid === user!.uid)]?.alert?.status)}
      />

      <Alert
        visible={!!currentBloodCollector}
        bloodTypes={currentBloodCollector?.bloodTypes || []}
        username={currentBloodCollector?.title || ''} />

    </S.Container >
  )
}

export default Search;