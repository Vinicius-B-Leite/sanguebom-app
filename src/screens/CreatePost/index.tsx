import React, { useState } from 'react';
import {  Image,  Dimensions } from 'react-native';
import * as S from './styles'
import Entypo from '@expo/vector-icons/Entypo'
import { useTheme } from 'styled-components/native';
import { pickImage } from '../../utlis/pickImage';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import Header from './components/Header';



const CreatePost: React.FC = () => {
  const { colors, icons } = useTheme()
  const user = useSelector((state: RootState) => state.user.user)
  const theme = useTheme()

  const [adress, setAdress] = useState(user?.adress || '')
  const [hours, setHours] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState({ uri: '', name: '', type: '' })

  const handlePickImage = async () => {
    pickImage().then(res => {
      if (res && res.assets[0] && user && res.assets[0].type) {
        setFile({ name: 'post-' + user.uid, type: res.assets[0].type, uri: res.assets[0].uri })
      }
    })
  }

  const cleanInputs = () => {
    setAdress('')
    setHours('')
    setLink('')
    setDescription('')
    setFile({ uri: '', name: '', type: '' })
  }

  return (
    <S.Container>

      <Header
        adress={adress}
        banner={file}
        description={description}
        hours={hours}
        linkRedirect={link}
        onSucessed={cleanInputs} />

      <S.Form>
        <S.PickImageBtn onPress={handlePickImage}>
          {
            file.uri.length > 0 ? <Image
              style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width }}
              source={{ uri: file.uri }}
            /> :
              <Entypo name="image" size={icons.big} color={colors.contrast_20} style={{ paddingVertical: '10%' }} />
          }
        </S.PickImageBtn>

        <S.InputTitle>Endereço</S.InputTitle>
        <S.InputArea>
          <Input
            placeholder={'Rua Pernambuco Bairro Flores de Jardim'}
            placeholderTextColor={theme.colors.text_100}
            value={adress}
            onChangeText={setAdress}

          />
        </S.InputArea>

        <S.InputTitle>Horário de atendimento</S.InputTitle>
        <S.InputArea>
          <Input

            placeholder={'10hrs ~ 17hrs'}
            placeholderTextColor={theme.colors.text_100}
            value={hours}
            onChangeText={setHours}

          />
        </S.InputArea>

        <S.InputTitle>Link para agendar a doação (opcinal) </S.InputTitle>
        <S.InputArea>
          <Input
            placeholder={'Https={...'}
            placeholderTextColor={theme.colors.text_100}
            value={link}
            onChangeText={setLink}

          />
        </S.InputArea>

        <S.InputTitle>Descrição</S.InputTitle>
        <S.DescriptionArea>
          <Input
            placeholder={'Descrição'}
            placeholderTextColor={theme.colors.text_100}
            textAlignVertical={'top'}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            h={theme.vw * 0.5}
          />
        </S.DescriptionArea>
      </S.Form>
    </S.Container>
  )
}

export default CreatePost;