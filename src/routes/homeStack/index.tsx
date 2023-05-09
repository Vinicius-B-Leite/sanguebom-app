import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import Home from '../../screens/Home';
import Notification from '../../screens/Notification';



const Stack = createStackNavigator()


const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Notification' component={Notification} />
        </Stack.Navigator>
    )
}

export default HomeStack;