import React, { useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
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
import { StackScreenProps } from '@react-navigation/stack';
import { SearchScreenParamsList } from '../../routes/models';

type NavProps = StackScreenProps<SearchScreenParamsList, 'Search'>
const Search: React.FC<NavProps> = ({ navigation }) => {

  const { colors, icons } = useTheme()
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [searchInput, setSeatchInput] = useState('')
  const user = useSelector((state: RootState) => state.user.user)
  const { data } = useQuery(
    ['bloodCollectors'],
    () => getBloodCollectors({ token: user?.token ?? '', bloodCollectorName: searchInput }),
    {
      onError: (err: AxiosError<ErrorResponse>) => console.log(err.response?.data),
    }
  )

  const markers = useMemo(() => (
    data?.map(bloodCollector => (
      {
        coordinate: {
          latitude: bloodCollector.lat,
          longitude: bloodCollector.lng
        },
        title: bloodCollector.username,
        description: 'Este ponto está coletando sangue',
        pinColor: (bloodCollector.alert && bloodCollector.alert.status == true) ? colors.backgroundColor : colors.text
      }
    )
    )
  ), [data])


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
              description={mark.description}
              pinColor={mark.pinColor}
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
          pinColor='#45e45e'
        />

      </MapView>

      <AlertButton onClick={() => navigation.navigate('CreateAlert')} />
    </S.Container >
  )
}

export default Search;