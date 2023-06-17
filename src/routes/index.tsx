import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Tab from './tab';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../feature/store';
import LoginRoutes from './loginRoutes';
import { logoutUser, setUser } from '../feature/user/userSlicer';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import Loading from '../screens/Loading';
import { api } from '../api';
import { getStorageUser } from '../storage/userStorage';
import NetFeedback from '../components/NetFeedback';

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
    const netInfo = useNetInfo()

    useEffect(() => {
        getUser()
        api.registerInterceptorTokenMenager(() => dispatch(logoutUser()))
    }, [])

    const getUser = () => {
        const userStorage = getStorageUser()
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
            <StatusBar backgroundColor={netInfo.isConnected ? type === 'dark' ? colors.background_100 : colors.contrast_100 : colors.text_50} barStyle='light-content' />
            <NetFeedback isConnected={netInfo.isConnected} />
            {user && !isLoading ? <Tab /> : <LoginRoutes />}
        </NavigationContainer>
    )
}

export default Routes;