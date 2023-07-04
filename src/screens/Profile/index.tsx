import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import * as S from './styles'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from '../../feature/user/userSlicer';
import { AppDispatch, RootState } from '../../feature/store';
import { pickImage } from '../../utlis/pickImage';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserCredencialsProps, updateUserCredencials } from '../../api/updateUserCredencials';
import { ImagePickerAsset } from 'expo-image-picker';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { api, baseURL } from '../../api';
import ModalUpdateUser from '../../components/ModalUpdateUser';
import { Fontisto } from '@expo/vector-icons';
import { ProfileScreenProps } from '../../routes/models/index'
import { changeTheme } from '../../feature/theme/themeSlicer';
import { updateStorageUser } from '../../storage/userStorage';
import { changeStorageTheme } from '../../storage/themeStorage';
import { GenderType } from '../../types/GenderType';

type Nav = ProfileScreenProps
const Profile: React.FC<Nav> = ({ navigation }) => {
  const { colors, icons } = useTheme()

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const themeIsDark = useSelector((state: RootState) => state.theme.isDark)

  const [avatar, setAvatar] = useState<string | ImagePickerAsset>(user?.imageURL ? baseURL + user?.imageURL : 'https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png')
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState(user?.password || '')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalProps, setModalProps] = useState<{ callback: (txt: string) => void, title: string }>({ callback: () => { }, title: '' })

  const { mutate } = useMutation(
    () => submitConfig(),
    {
      onSuccess: async (res) => {
        const user = {
          bloodType: res.donors?.bloodType || undefined,
          email: res.email,
          gender: res.donors?.gender as GenderType || undefined,
          password: res.password,
          type: res.type,
          token: res.token,
          uid: res.donors?.uid || res.bloodCollectors?.uid || '',
          username: res.username,
          adress: res.bloodCollectors?.adress,
          imageURL: res.bloodCollectors?.imageURL
        }
        dispatch(setUser(user))
        updateStorageUser(user)
      },

      onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
    }
  )


  const handleImagePicker = () => {
    if (user?.type === 'donors') return
    pickImage().then(file => {
      if (file?.assets[0].uri) {
        setAvatar(file.assets[0])
        mutate()
      }
    })
  }

  const submitConfig = () => {
    let props: UpdateUserCredencialsProps = {
      username,
      email,
      password,
      uid: user?.uid || '',
    }

    if (typeof avatar !== 'string') {
      props.avatar = { name: 'userPhoto-' + user?.uid, type: avatar?.type || '', uri: avatar.uri }
    }


    return updateUserCredencials(props)
  }

  function openModal(callback: (txt: string) => void, title: string) {
    setModalProps({ callback, title })
    setIsModalVisible(true)
  }

  const handleChangeTheme = () => {
    dispatch(changeTheme(!themeIsDark))
    changeStorageTheme(themeIsDark ? 'light' : 'dark')
  }
  return (
    <S.Container>

      <Header onClickBell={() => navigation.navigate('Notification')} onClickBloodDonate={() => navigation.navigate('MyDonates')} />
      <TouchableOpacity onPress={handleImagePicker}>
        <S.Avatar
          source={{ uri: typeof avatar === 'string' ? avatar : avatar.uri }}
        />
      </TouchableOpacity>

      <S.Username>{user?.username}</S.Username>

      <S.ItemContainer onPress={() => openModal((txt) => setUsername(txt), 'nome')}>
        <S.ItemBackgroundIcon>
          <AntDesign name="user" size={icons.vsm} color={colors.contrast_100} />
        </S.ItemBackgroundIcon>

        <S.ItemLabel>Nome de usuário</S.ItemLabel>
      </S.ItemContainer>

      <S.ItemContainer onPress={() => openModal((txt) => setPassword(txt), 'senha')}>
        <S.ItemBackgroundIcon>
          <MaterialIcons name="lock" size={icons.vsm} color={colors.contrast_100} />
        </S.ItemBackgroundIcon>

        <S.ItemLabel>Senha</S.ItemLabel>
      </S.ItemContainer>


      {
        user?.type === 'normal user' &&
        <S.ItemContainer >
          <S.ItemBackgroundIcon>
            <Fontisto name="blood-drop" size={icons.vsm} color={colors.contrast_100} />
          </S.ItemBackgroundIcon>

          <S.ItemLabel>Tipo sanguíneo</S.ItemLabel>
        </S.ItemContainer>
      }


      <S.ItemContainer onPress={handleChangeTheme}>
        <S.ItemBackgroundIcon>
          <Ionicons name={themeIsDark ? 'moon' : "sunny-outline"} size={icons.vsm} color={colors.contrast_100} />
        </S.ItemBackgroundIcon>

        <S.ItemLabel>Trocar de tema</S.ItemLabel>
      </S.ItemContainer>


      {
        user?.type === 'bloodCollectors' &&
        <>
          <S.ItemContainer onPress={() => { }}>
            <S.ItemBackgroundIcon>
              <Feather name="home" size={icons.vsm} color={colors.contrast_100} />
            </S.ItemBackgroundIcon>

            <S.ItemLabel>Endereço</S.ItemLabel>
          </S.ItemContainer>
          <S.ItemContainer onPress={() => { }}>
            <S.ItemBackgroundIcon>
              <Feather name="phone-call" size={icons.vsm} color={colors.contrast_100} />
            </S.ItemBackgroundIcon>

            <S.ItemLabel>Número de telefone</S.ItemLabel>
          </S.ItemContainer>
        </>
      }

      <S.ItemContainer onPress={() => dispatch(logoutUser())}>
        <S.ItemBackgroundIcon>
          <MaterialIcons name="logout" size={icons.vsm} color={colors.contrast_100} />
        </S.ItemBackgroundIcon>

        <S.ItemLabel>Sair da conta</S.ItemLabel>
      </S.ItemContainer>

      <ModalUpdateUser
        closeModal={() => setIsModalVisible(false)}
        visible={isModalVisible}
        submit={(txt) => {
          if (txt.length > 0) {
            modalProps.callback(txt)
            mutate()
            setIsModalVisible(false)
          }
        }}
        title={modalProps.title}
      />
    </S.Container>
  )
}

export default Profile;