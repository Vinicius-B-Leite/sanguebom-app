import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginOptions from '../../screens/LoginOptions';
import { StackRootParamsList } from '../models';
import SelectBloodType from '../../screens/SelectBloodType';
import SingUp from '../../screens/SingUp';
import Login from '../../screens/Login';

const Stack = createStackNavigator<StackRootParamsList>()

const LoginRoutes: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginOptions' component={LoginOptions} />
            <Stack.Screen name='SelectBloodType' component={SelectBloodType} />
            <Stack.Screen name='SingUp' component={SingUp} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default LoginRoutes;