import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'

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
    Questions: undefined,
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


export type QuestionsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamsList, 'Questions'>,
    StackScreenProps<StackHomeParamsList>
>
export type ProfileScreenProps = {
    HomeStack: NavigatorScreenParams<StackHomeParamsList>,
}
