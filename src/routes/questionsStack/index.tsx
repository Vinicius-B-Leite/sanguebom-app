import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { QuestionsParamsList } from '../models';
import Questions from '../../screens/Questions';
import Questionary from '../../screens/Questionary';
import QuestionaryFeedback from '../../screens/QuestionaryFeedback';



const Stack = createStackNavigator<QuestionsParamsList>()
const QuestionsStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Questions' component={Questions} />
            <Stack.Screen name='Questionary' component={Questionary} />
            <Stack.Screen name='QuestionaryFeedback' component={QuestionaryFeedback} />
        </Stack.Navigator>
    )
}

export default QuestionsStack;