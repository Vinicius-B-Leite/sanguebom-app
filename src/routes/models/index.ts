import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams, } from '@react-navigation/native'
import type { StackScreenProps, StackNavigationProp } from '@react-navigation/stack'

export type StackRootParamsList = {
    LoginOptions: undefined,
    SelectBloodType: undefined,
    SingUp: {
        bloodtype: string
    },
    Login: undefined
}

export type BottomTabParamsList = {
    HomeStack: StackScreenProps<StackHomeParamsList>,
    Search: undefined,
    CreatePost?: undefined,
    QuestionsStack: StackScreenProps<QuestionsParamsList>,
    Profile: undefined
}

export type StackHomeParamsList = {
    Home: undefined,
    Notification: undefined,
    Post: {
        postID: string
    },
    MyDonates: undefined
}

export type QuestionsParamsList = {
    Questions: undefined,
    Questionary: undefined,
    QuestionaryFeedback: { succes: boolean }
}

export type QuestionsScreenProps = {
    HomeStack: NavigatorScreenParams<StackHomeParamsList>
}

export type ProfileScreenProps = {
    HomeStack: NavigatorScreenParams<StackHomeParamsList>,
}
