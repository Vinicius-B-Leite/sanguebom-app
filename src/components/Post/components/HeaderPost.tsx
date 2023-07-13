import React from 'react';
import { View } from 'react-native';
import * as S from './styles'
import { baseURL } from '../../../api';


type Props = {
    avatarUrl: string,
    username: string
}
const HeaderPost: React.FC<Props> = ({ avatarUrl, username }) => {
    return (
        <S.Header>
            <S.Avatar source={{ uri: baseURL + avatarUrl }} />
            <S.Username numberOfLines={1}>{username}</S.Username>
        </S.Header>

    )
}

export default HeaderPost;