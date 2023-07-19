import { HospitalType } from "../../../types/HospitalType";
import { PostType } from "../../../types/PostType";


const fakeBloodCollector: HospitalType = {
    username: 'fakeBloodCollector.name',
    email: 'fakeBloodCollector.email@gmail.com',
    adress: 'fakeBloodCollector.adress',
    alert: null,
    imageURL: 'fakeBloodCollector.imageURL',
    lat: 123123,
    lng: 123123,
    phoneNumber: 'fakeBloodCollector.phoneNumber',
    uid: 'fakeBloodCollector.uid'
}

const fakePost: PostType = {
    adress: 'post.adress',
    bannerURL: 'post.bannerURL',
    bloodCollectors: fakeBloodCollector,
    bloodCollectorsID: 'post.bloodCollectorsID',
    createdAt: new Date(),
    description: 'post.description',
    id: 'post.id',
    linkRedirect: 'post.linkRedirect',
}


export const mocks = {
    fakePost
}