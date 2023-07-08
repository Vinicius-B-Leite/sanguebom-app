import { api } from ".."
import { createAlert } from "../createAlert"
import { getNotificationLength } from "../getNotificationLength"




describe('api', () => {
    describe('getNotificationLength', () => {
        it('was returned length of notification to have to read', async () => {

            jest.spyOn(api, 'get').mockResolvedValue({ data: 1 })
            const length = await getNotificationLength({ uid: '3f9bd494-e0c5-408b-9f87-f030a248c1e9' })

            expect(length).toBe(1)
        })
    })

    describe('createAlert', () => {
        it('was sucessed if all parameters was passed', async () => {
            jest.spyOn(api, 'post').mockResolvedValueOnce({status: 200})


            const statusResponse = await createAlert({
                bloodCollectorsID: 'uid',
                bloodTypes: ['A+'],
                description: 'desc',
                status: true
            })
            console.log("🚀 ~ file: api.test.ts:30 ~ it ~ statusResponse:", statusResponse)

            expect(statusResponse).toEqual(200)
        })
    })
})