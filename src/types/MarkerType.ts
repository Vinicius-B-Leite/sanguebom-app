export type MarkerType = {
    coordinate: {
        latitude: number,
        longitude: number
    },
    title: string,
    description: string | false | undefined,
    pinColor: string,
    bloodTypes: string[] | undefined
}