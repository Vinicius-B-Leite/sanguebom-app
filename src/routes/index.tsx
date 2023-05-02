import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tab from './tab';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../feature/store';
import LoginRoutes from './loginRoutes';
import { setUser } from '../feature/user/userSlicer';
import { UserType } from '../types/UserType';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Routes: React.FC = () => {
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)

    useEffect(() => {
        AsyncStorage.getItem('@user')
            .then((userStorage) => {
                if (userStorage) {
                    console.log("🚀 ~ file: index.tsx:23 ~ .then ~ userStorage:", userStorage)
                    dispatch(setUser(JSON.parse(userStorage)))
                }
            })
    }, [])



    return (
        <NavigationContainer>
            <StatusBar backgroundColor={colors.contrast} barStyle='light-content' />
            {user ? <Tab /> : <LoginRoutes />}
        </NavigationContainer>
    )
}

export default Routes;