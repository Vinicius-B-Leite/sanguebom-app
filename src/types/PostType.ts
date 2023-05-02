import { HospitalType } from "./HospitalType"

export type PostType = {
    id: string
    bannerURL: string,
    linkRedirect: string,
    adress: string,
    description: string,
    createdAt: Date,
    bloodCollectorsID: string,
    bloodCollectors: HospitalType
}

