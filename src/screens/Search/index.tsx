import React, { useLayoutEffect, useState, useMemo, useRef, createRef, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as S from './styles'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import { useQuery } from '@tanstack/react-query';
import { getBloodCollectors } from '../../api/getBloodCollectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import * as Location from 'expo-location';
import AlertButton from '../../components/AlertButton';
import ModalCreateAlert from '../../components/ModalCreateAlert';
import { MarkerType } from '../../types/MarkerType';
import { baseURL } from '../../api';
import { HospitalType } from '../../types/HospitalType';
import Alert from './components/Alert';
import { getLocation } from '../../utlis/getLocation';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import SearchList from './components/SearchList';
import MarkersList from './components/MarkersLists';
import UserMarker from './components/UserMarker';



const Search: React.FC = () => {

  const user = useSelector((state: RootState) => state.user.user)

  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null)
  const [searchInput, setSeatchInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentBloodCollector, setCurrentBloodCollector] = useState<MarkerType>()

  const { data } = useQuery(
    ['bloodCollectors'],
    () => getBloodCollectors({ bloodCollectorName: searchInput }),
    {
      onError: (err: AxiosError<ErrorResponse>) => console.log(err.response?.data),
    }
  )

  const refs = useRef(Array.from({ length: data?.length || 999 }).map(() => createRef<MapMarker>()))


  const searchedBloodCollectors = useMemo(() => {
    if (searchInput.length > 0 && data) {
      return data.filter((v) => v.username.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
    }
  }, [searchInput, data])



  useEffect(() => {
    getLocation().then(res => res && setUserLocation(res))
  }, [])


  const handleClickSearchedBloodCollector = (suggestItem: HospitalType) => {
    setLocation({ lat: suggestItem.lat, lng: suggestItem.lng })
    setSeatchInput(suggestItem.username)

    if (!data) return

    refs?.current[data.findIndex(v => v.username === suggestItem.username)]?.current?.showCallout()
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

        <MarkersList
          bloodCollectors={data}
          onClick={(m) => setCurrentBloodCollector(m)}
          refs={refs}
        />

        <UserMarker userLocation={userLocation} />

      </MapView>

      <AlertButton onClick={() => setModalVisible(true)} />


      <ModalCreateAlert
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        bTypesSelecteds={data && user && data[data?.findIndex(v => v.uid === user.uid)].alert?.bloodTypes}
        isAlertOn={!!(data && data[data?.findIndex(v => v.username === user?.username)].alert?.status)}
      />

      <Alert
        visible={!!currentBloodCollector}
        bloodTypes={currentBloodCollector?.bloodTypes || []}
        username={currentBloodCollector?.title || ''} />

    </S.Container >
  )
}

export default Search;