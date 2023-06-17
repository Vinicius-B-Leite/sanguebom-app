import React, { useState } from 'react';
import { ActivityIndicator, Image, ToastAndroid, Dimensions } from 'react-native';
import * as S from './styles'
import Entypo from '@expo/vector-icons/Entypo'
import { useTheme } from 'styled-components/native';
import { pickImage } from '../../utlis/pickImage';
import Input from '../../components/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/createPost';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/ErrorResponse';



const CreatePost: React.FC = () => {
  const { colors, icons } = useTheme()
  const [adress, setAdress] = useState('')
  const [hours, setHours] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState({ uri: '', name: '', type: '' })
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.user.user)
  const client = useQueryClient()

  const { mutate, isLoading } = useMutation(() => createPost(
    {
      adress,
      banner: file,
      description,
      linkRedirect: link,
      bloodCollectorsID: user?.uid || '',
    }),
    {
      onError: (err: AxiosError<ErrorResponse>) => {
        if (err.response && err.response.data.code !== '08') {
          ToastAndroid.show('Ops! Ocorreu um erro', ToastAndroid.LONG)
        }else{
          console.log(err.response?.data.message)
        }
      },
      onSuccess: () => {
        setAdress('')
        setHours('')
        setLink('')
        setDescription('')
        setFile({ uri: '', name: '', type: '' })

        client.invalidateQueries(['posts'])
      }
    }
  )

  const handlePickImage = async () => {
    pickImage().then(res => {
      if (res && res.assets[0] && user && res.assets[0].type) {
        setFile({ name: 'post-' + user.uid, type: res.assets[0].type, uri: res.assets[0].uri })
      }
    })
  }

  const handleSubmit = () => {
    if (file.uri.length === 0 || adress.length === 0 || hours.length === 0 || description.length === 0) return

    mutate()
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>{'<   '} Criar post</S.Title>
        <S.DoneBtn onPress={handleSubmit}>
          <S.DoneTxt>{isLoading ? <ActivityIndicator size={theme.icons.vvsm} color={theme.colors.contrast_100} /> : 'concluir'}</S.DoneTxt>
        </S.DoneBtn>
      </S.Header>

      <S.Form>
        <S.PickImageBtn onPress={handlePickImage}>
          {
            file.uri.length > 0 ? <Image
              style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width}}
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