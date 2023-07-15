import { api } from ".."
import { createAlert } from "../createAlert"
import { createAccount } from "../createAcount"
import { createDonate } from "../createDonate"
import { getNotificationLength } from "../getNotificationLength"




describe('api', () => {

    describe('createAcount', () => {
        it('returned AuthResponse when it succed', async () => {
            jest.spyOn(api, 'post').mockResolvedValueOnce({
                data: {
                    email: 'user.email',
                    password: 'user.password',
                    token: 'user.token',
                    type: 'donors',
                    username: 'user.username',
                }
            })

            const { data } = await createAccount({
                bloodType: 'user.bloodType',
                email: 'user.email',
                gender: 'user.gender',
                password: 'user.password',
                username: 'user.username'
            })
            console.log("🚀 ~ file: api.test.ts:28 ~ it ~ res:", data)

            expect(data).toBeTruthy()
        })
    })
    describe('createAlert', () => {
        it('was sucessed if all parameters was passed', async () => {
            jest.spyOn(api, 'post').mockResolvedValueOnce({ status: 200 })


            const statusResponse = await createAlert({
                bloodCollectorsID: 'uid',
                bloodTypes: ['A+'],
                description: 'desc',
                status: true
            })

            expect(statusResponse).toEqual(200)
        })
    })

    
    describe('getNotificationLength', () => {
        it('was returned length of notification to have to read', async () => {

            jest.spyOn(api, 'get').mockResolvedValue({ data: 1 })
            const length = await getNotificationLength({ uid: '3f9bd494-e0c5-408b-9f87-f030a248c1e9' })

            expect(length).toBe(1)
        })
    })
})