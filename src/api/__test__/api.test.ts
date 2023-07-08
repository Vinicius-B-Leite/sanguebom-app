import { api } from ".."
import { getNotificationLength } from "../getNotificationLength"




describe('api', () => {
    describe('getNotificationLength', () => {
        it('was returned length of notification to have to read', async () => {
            
            jest.spyOn(api, 'get').mockResolvedValue({ data: 1 })
            const length = await getNotificationLength({ uid: '3f9bd494-e0c5-408b-9f87-f030a248c1e9' })

            expect(length).toBe(1)
        })
    })
})