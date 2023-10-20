import { ONEBOARDING_KEY, storage } from "./storageConfig";

export function hasOneboardingStorage() {
    const oneboarding = storage.getBoolean(ONEBOARDING_KEY)
    return oneboarding === true
}


export function setOneboardingStorage() {
    storage.set(ONEBOARDING_KEY, true)
    return
}