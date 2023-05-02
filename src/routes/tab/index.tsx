import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext, useTheme } from 'styled-components/native';
import CreatePost from '../../screens/CreatePost';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Questions from '../../screens/Questions';
import Search from '../../screens/Search';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import SearchRoutes from '../searchRoutes';

const { Navigator, Screen } = createBottomTabNavigator()

const Tab = () => {

    const theme = useContext(ThemeContext)
    const user = useSelector((state: RootState) => state.user)

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: theme.colors.contrast,
                tabBarInactiveTintColor: theme.colors.darkText,

            }}
        >
            <Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Feather
                            name='home'
                            color={color}
                            size={theme.icons.sm}
                        />
                    ),
                }}
            />
            <Screen
                name='SearchStack'
                component={SearchRoutes}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Feather
                            name='search'
                            color={color}
                            size={theme.icons.sm}
                        />
                    ),


                }}
            />

            {
                user.user?.type === 'blood collectors' && <Screen
                    name='CreatePost'
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <AntDesign
                                name='pluscircle'
                                color='#f65353'
                                size={60}
                                style={{
                                    position: 'absolute',
                                    top: -(theme.vh * 0.04),
                                }}
                            />
                        ),
                    }}
                    component={CreatePost}

                />
            }

            <Screen
                name='Questions'
                component={Questions}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign
                            name='questioncircleo'
                            color={color}
                            size={theme.icons.sm}
                        />
                    ),

                }}
            />
            <Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Feather
                            name='user'
                            color={color}
                            size={theme.icons.sm}
                        />
                    ),

                }}
            />
        </Navigator>
    )
}

export default Tab;