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
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';
import { api, baseURL } from '../../api';
import ModalUpdateUser from '../../components/ModalUpdateUser';
import { ProfileScreenProps } from '../../routes/models/index'
import { changeTheme } from '../../feature/theme/themeSlicer';
import { updateStorageUser } from '../../storage/userStorage';
import { changeStorageTheme } from '../../storage/themeStorage';
import { GenderType } from '../../types/GenderType';
import Options from './components/Options';




type Nav = ProfileScreenProps
const Profile: React.FC<Nav> = ({ navigation }) => {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const themeIsDark = useSelector((state: RootState) => state.theme.isDark)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalProps, setModalProps] = useState<{ callback: (txt: string) => void, title: string }>({ callback: () => { }, title: '' })

  const { mutate } = useMutation(
    (props: UpdateUserCredencialsProps) => updateUserCredencials(props),
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
        setIsModalVisible(false)
      },

      onError: (err: AxiosError<ErrorResponse>) => console.log(err?.response?.data)
    }
  )


  const handleImagePicker = () => {
    if (user?.type === 'donors') return

    pickImage().then(file => {
      if (file?.assets[0].uri) {
        const { type, uri } = file.assets[0]
        mutate({ ...user, avatar: { name: 'userPhoto-' + user?.uid, type, uri } } as UpdateUserCredencialsProps)
      }
    })
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
          source={user?.imageURL ? { uri: baseURL + user.imageURL } : require('../../assets/no_image_user.png')}
        />
      </TouchableOpacity>

      <S.Username>{user?.username}</S.Username>

      <Options
        iconName='user'
        onPress={() => openModal((txt) => mutate({ ...user, username: txt } as UpdateUserCredencialsProps), 'nome')}
        title='Nome de usuário' />

      <Options
        iconName='lock'
        onPress={() => openModal((txt) => mutate({ ...user, password: txt } as UpdateUserCredencialsProps), 'Senha')}
        title='Senha' />

      {
        user?.type === 'normal user' &&
        <Options
          iconName='tint'
          onPress={() => { }}
          title='Tipo sanguíneo' />
      }

      <Options iconName={themeIsDark ? 'moon-o' : 'sun-o'} onPress={handleChangeTheme} title='Trocar de tema' />

      {
        user?.type === 'bloodCollectors' &&
        <>
          <Options
            iconName='home'
            onPress={() => openModal((txt) => mutate({ ...user, adress: txt } as UpdateUserCredencialsProps), 'Endereço')}
            title='Endereço' />
          <Options
            iconName='phone'
            onPress={() => openModal((txt) => mutate({ ...user, phoneNumber: txt } as UpdateUserCredencialsProps), 'Número de telefonde')}
            title='Número de telefone' />
        </>
      }

      <Options iconName='sign-out' onPress={() => dispatch(logoutUser())} title='Sair' />


      <ModalUpdateUser
        closeModal={() => setIsModalVisible(false)}
        visible={isModalVisible}
        submit={(txt) => modalProps.callback(txt)
        }
        title={modalProps.title}
      />
    </S.Container>
  )
}

export default Profile;