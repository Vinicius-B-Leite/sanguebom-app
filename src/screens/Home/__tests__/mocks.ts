import { InfinetePosts } from "../../../api/getPosts";
import { GenderType } from "../../../types/GenderType";

const fakeUser = {
    user: {
        uid: "123123123",
        email: 'email',
        password: "23123",
        token: '11111',
        type: 'donors',
        username: 'username',
        bloodType: 'A+',
        gender: 'male' as GenderType
    }
}


const fakeInfinitePost: InfinetePosts = {
    data: [
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description1',
            id: 'post.id',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id2',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id3',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id4',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id5',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id11',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id12',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id13',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id14',
            linkRedirect: 'post.linkRedirect'
        },
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description2',
            id: 'post.id154',
            linkRedirect: 'post.linkRedirect'
        },
    ],
    maxPage: 2
}
const fakeShorInfinePost: InfinetePosts = {
    data: [
        {
            adress: 'post.adress',
            bannerURL: 'post.bannerURL',
            bloodCollectors: {
                adress: 'bloodCollector.adress',
                alert: null,
                email: 'bloodCollector.email',
                imageURL: 'bloodCollector.imageURL',
                lat: 123123123,
                lng: 123123123,
                phoneNumber: 'bloodCollector.phoneNumber',
                uid: 'bloodCollector.uid',
                username: 'bloodCollector.username'
            },
            bloodCollectorsID: 'post.bloodCollectorsID',
            createdAt: new Date(),
            description: 'post.description1',
            id: 'post.id',
            linkRedirect: 'post.linkRedirect'
        },
    ],
    maxPage: 1
}
export const mocks = {
    fakeUser,
    fakeInfinitePost,
    fakeShorInfinePost,
}