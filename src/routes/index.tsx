import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Tab from './tab';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../feature/store';
import LoginRoutes from './loginRoutes';
import { logoutUser, setUser } from '../feature/user/userSlicer';

import Loading from '../screens/Loading';
import { api } from '../api';
import { getStorageUser } from '../storage/userStorage';
//    sanguebom://post/684dfa16-9414-4291-bb1d-09231716c42d

type LinkingType = LinkingOptions<{ HomeStack: { screens: any } }> | undefined

const linking = {
    prefixes: ['sanguebom://', 'com.viniciusbl21.sanguebom://', 'exp+sanguebom-app://'],
    config: {
        screens: {
            HomeStack: {
                path: '',
                screens: {
                    Post: {
                        path: 'post/:postID',
                        parse: (postID: string) => postID
                    }
                }
            }
        }
    },
} as LinkingType


const Routes: React.FC = () => {
    const { colors, type } = useTheme()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUser()
        api.registerInterceptorTokenMenager(() => dispatch(logoutUser()))
    }, [])

    const getUser = async () => {
        const userStorage = await getStorageUser()
        if (userStorage) {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + userStorage.token
            dispatch(setUser(userStorage))
        }
        setIsLoading(false)
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <NavigationContainer linking={linking}>
            <StatusBar backgroundColor={type === 'dark' ? colors.backgroundColor : colors.contrast} barStyle='light-content' />
            {user && !isLoading ? <Tab /> : <LoginRoutes />}
        </NavigationContainer>
    )
}

export default Routes;