import React, { useEffect, useState, useMemo } from 'react';
import { FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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



const Search: React.FC = () => {

  const { colors, icons } = useTheme()
  const user = useSelector((state: RootState) => state.user.user)

  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [searchInput, setSeatchInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentBloodCollector, setCurrentBloodCollector] = useState<MarkerType>()

  const { data } = useQuery(
    ['bloodCollectors'],
    () => getBloodCollectors({ token: user?.token ?? '', bloodCollectorName: searchInput }),
    {
      onError: (err: AxiosError<ErrorResponse>) => console.log(err.response?.data),
    }
  )

  const markers = useMemo(() => {
    const m: MarkerType[] | undefined = data?.map((bloodCollector) => (
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
    ))

    return m
  }, [data])
  console.log("🚀 ~ file: index.tsx:54 ~ data:", data)



  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let locationResponse = await Location.getCurrentPositionAsync({});
    setLocation(locationResponse);
  }


  useEffect(() => {
    getLocation()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.GoBack>
          <AntDesign name="arrowleft" size={icons.sm} color={colors.backgroundColor} />
        </S.GoBack>
        <S.Input
          placeholder='Pesquise um bairro'
          placeholderTextColor={colors.backgroundColorSecond}
          value={searchInput}
          onChangeText={setSeatchInput}
        />
      </S.Header>
      <MapView
        onPress={() => setCurrentBloodCollector(undefined)}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.coords.latitude || -23.1184444,
          longitude: location?.coords.longitude || -46.5811119,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}>

        {
          markers?.map(mark => (
            <Marker
              key={mark.title}
              coordinate={{
                latitude: mark.coordinate.latitude,
                longitude: mark.coordinate.longitude,
              }}
              title={mark.title}
              pinColor={mark.pinColor}
              {...mark.description && { description: mark.description }}
              onPress={() => mark?.description && setCurrentBloodCollector(mark)}
            />
          ))
        }

        <Marker
          coordinate={{
            latitude: location?.coords.latitude || -23.1184444,
            longitude: location?.coords.longitude || -46.5811119,
          }}
          title='Você'
          description='Você está localizado aqui'
          pinColor='green'
        />

      </MapView>

      {
        user?.type === 'blood collectors' && !currentBloodCollector &&
        <AlertButton onClick={() => setModalVisible(true)} />
      }

      {
        user?.type === 'blood collectors' && modalVisible &&
        <ModalCreateAlert modalProps={{
          visible: modalVisible,
          onRequestClose: () => setModalVisible(false),
          animationType: 'fade',
          transparent: true
        }}
          bTypesSelecteds={data && user && data[data?.findIndex(v => v.uid === user.uid)].alert?.bloodTypes}
          isAlertOn={!!(data && data[data?.findIndex(v => v.username === user?.username)].alert?.status)}
        />
      }
      {
        currentBloodCollector &&
        <S.AlertInfoContainer>
          <S.Left>
            <S.BloodCollectorName numberOfLines={2}>{currentBloodCollector.title}</S.BloodCollectorName>
          </S.Left>

          <S.Right>
            <FlatList
              horizontal
              contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
              showsHorizontalScrollIndicator={false}
              data={currentBloodCollector.bloodTypes?.map((b, i, a) => i === a.length - 1 ? b : b + ', ')}
              renderItem={({ item }) => (
                <S.BloodTypeItem>{item}</S.BloodTypeItem>
              )}
            />
          </S.Right>
        </S.AlertInfoContainer>
      }
    </S.Container >
  )
}

export default Search;