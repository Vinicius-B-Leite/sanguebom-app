import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { SearchScreenParamsList } from '../models';
import Search from '../../screens/Search';
import CreateAlert from '../../screens/CreateAlert';


const Stack = createStackNavigator<SearchScreenParamsList>()

const SearchRoutes: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='CreateAlert' component={CreateAlert} />
        </Stack.Navigator>
    )
}

export default SearchRoutes;