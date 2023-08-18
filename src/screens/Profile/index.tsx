import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../../feature/user/userSlicer';
import { AppDispatch, RootState } from '../../feature/store';
import { pickImage } from '../../utlis/pickImage';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserCredencialsProps, updateUserCredencials } from '../../api/updateUserCredencials';
import { baseURL } from '../../api';
import ModalUpdateUser from '../../components/ModalUpdateUser';
import { ProfileScreenProps } from '../../routes/models/index'
import { changeTheme } from '../../feature/theme/themeSlicer';
import { updateStorageUser } from '../../storage/userStorage';
import { changeStorageTheme } from '../../storage/themeStorage';
import { GenderType } from '../../types/GenderType';
import Options from './components/Options';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UserType } from '../../types/UserType';
import ModalUpdateBloodType from '../../components/ModalUpdateBloodType';






type Nav = NavigationProp<ProfileScreenProps>
const Profile: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const themeIsDark = useSelector((state: RootState) => state.theme.isDark)

  const navigation = useNavigation<Nav>()


  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalProps, setModalProps] = useState<{ callback: (txt: string) => void, title: string }>({ callback: () => { }, title: '' })

  const { mutate } = useMutation(
    (props: UpdateUserCredencialsProps) => updateUserCredencials(props),
    {
      onSuccess: (res) => {
        const isBloodCollector = res.type == 'bloodCollectors'

        const userUpdated: UserType = {
          bloodType: isBloodCollector ? undefined : res.donors.bloodType,
          email: res.email,
          gender: isBloodCollector ? undefined : res.donors.gender as GenderType,
          password: res.password,
          type: res.type,
          token: user!.token,
          uid: isBloodCollector ? res.bloodCollectors.uid : res.donors.uid,
          username: res.username,
          adress: res.bloodCollectors?.adress,
          imageURL: res.bloodCollectors?.imageURL,
          phoneNumber: res.bloodCollectors?.phoneNumber
        }
        dispatch(setUser(userUpdated))
        updateStorageUser(userUpdated)
        setIsModalVisible(false)
      }
    })


  const handleImagePicker = async () => {
    if (user?.type === 'donors') return

    try {
      const file = await pickImage()
      if (file?.assets[0].uri) {
        const { type, uri } = file.assets[0]
        mutate({ ...user, avatar: { name: 'userPhoto-' + user?.uid, type, uri } } as UpdateUserCredencialsProps)
      }
    } catch (error) {

    }
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

      <Header
        onClickBell={() => navigation.navigate('HomeStack', { screen: 'Notification' })}
        onClickBloodDonate={() => navigation.navigate('HomeStack', { screen: 'MyDonates' })}
      />

      <TouchableOpacity onPress={handleImagePicker}>
        <S.Avatar
          testID='avatarImage'
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
        user?.type === 'donors' &&
        <Options
          iconName='tint'
          onPress={() => setIsModalVisible(true)}
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
            onPress={() => openModal((txt) => mutate({ ...user, phoneNumber: txt } as UpdateUserCredencialsProps), 'Número de telefone')}
            title='Número de telefone' />
        </>
      }

      <Options iconName='sign-out' onPress={() => dispatch(logoutUser())} title='Sair' />


      <ModalUpdateUser
        closeModal={() => {
          setIsModalVisible(false)
          setModalProps({callback: ()=>{}, title: ''})
        }}
        visible={isModalVisible && modalProps.title.length > 0}
        submit={(txt) => modalProps.callback(txt)}
        title={modalProps.title}
      />

      <ModalUpdateBloodType
        visible={isModalVisible && !modalProps.title}
        onRequestClose={() => setIsModalVisible(false)}
        onSubmit={(btSelected) => mutate({ ...user, bloodType: btSelected } as UpdateUserCredencialsProps)}
      />
    </S.Container>
  )
}

export default Profile;