import React, { useEffect, useState } from 'react';
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
import Loading from '../screens/Loading';


const Routes: React.FC = () => {
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const userStorage = await AsyncStorage.getItem('@user')
        if (userStorage) {
            dispatch(setUser(JSON.parse(userStorage)))
        }
        setIsLoading(false)
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <NavigationContainer>
            <StatusBar backgroundColor={colors.contrast} barStyle='light-content' />
            {user && !isLoading ? <Tab /> : <LoginRoutes />}
        </NavigationContainer>
    )
}

export default Routes;