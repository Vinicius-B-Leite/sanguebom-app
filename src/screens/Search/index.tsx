import React, { useLayoutEffect, useState, useMemo, useRef, createRef } from 'react';
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



const Search: React.FC = () => {

  const { colors, icons, type } = useTheme()
  const user = useSelector((state: RootState) => state.user.user)
  const navigation = useNavigation()

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
        bloodTypes: bloodCollector.alert?.bloodTypes
      }
    )) as MarkerType[] | undefined

  }, [data])

  const suggestBloodCollectors = useMemo(() => {
    if (searchInput.length > 0 && data) {
      return data.filter((v) => v.username.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
    }
  }, [searchInput, data])



  useLayoutEffect(() => {
    getLocation().then(res => res && setUserLocation(res))
  }, [])

  console.log("🚀 ~ file: index.tsx:173 ~ currentBloodCollector:", currentBloodCollector)

  const handleClickSuggest = (suggestItem: HospitalType) => {
    setLocation({ lat: suggestItem.lat, lng: suggestItem.lng })
    setSeatchInput(suggestItem.username)

    if (!data) return

    refs?.current[data.findIndex(v => v.username === suggestItem.username)]?.current?.showCallout()
  }

  return (
    <S.Container>
      <S.Header>
        <S.GoBack onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={icons.sm} color={type === 'dark' ? colors.text_100 : colors.background_100} />
        </S.GoBack>
        <S.Input
          placeholder={'Pesquise por um ponto de coleta'}
          placeholderTextColor={colors.text_200}
          value={searchInput}
          onChangeText={setSeatchInput}
        />
      </S.Header>
      {
        suggestBloodCollectors && suggestBloodCollectors?.length > 0 &&
        <View>
          <FlatList
            data={suggestBloodCollectors}
            renderItem={({ item, index }) => index < 3 ?
              <S.SuggestContainer onPress={() => handleClickSuggest(item)}>
                <S.SuggestItemAvatar source={{ uri: `${baseURL}${item.imageURL}` }} />
                <S.SuggestItemName>{item.username}</S.SuggestItemName>
              </S.SuggestContainer> : <></>
            }
          />
        </View>
      }
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

        {
          markers && markers.map((mark, i) => (
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
              onPress={() => setCurrentBloodCollector(mark)}
            />
          ))
        }

        {
          userLocation?.lat &&
          <Marker
            coordinate={{
              latitude: userLocation?.lat,
              longitude: userLocation?.lng,
            }}
            title='Você'
            description='Você está localizado aqui'
            pinColor='green'
          />
        }

      </MapView>

      {
        user?.type === 'bloodCollectors' && !currentBloodCollector &&
        <AlertButton onClick={() => setModalVisible(true)} />
      }

      {
        user?.type === 'bloodCollectors' && modalVisible &&
        <ModalCreateAlert
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          bTypesSelecteds={data && user && data[data?.findIndex(v => v.uid === user.uid)].alert?.bloodTypes}
          isAlertOn={!!(data && data[data?.findIndex(v => v.username === user?.username)].alert?.status)}
        />
      }


      <Alert
        visible={!!currentBloodCollector}
        bloodTypes={currentBloodCollector?.bloodTypes || []}
        username={currentBloodCollector?.title || ''} />

    </S.Container >
  )
}

export default Search;