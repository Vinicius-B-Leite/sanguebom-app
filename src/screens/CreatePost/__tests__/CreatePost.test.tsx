import React from "react"
import CreatePost from '../index'
import { renderWithProviders, act, cleanup, fireEvent } from '../../../utlis/test-utils/customRender'
import { mock } from './mocks'
import { ToastAndroid } from 'react-native'
import * as pickImageToMock from '../../../utlis/pickImage'
import * as createPostMock from '../../../api/createPost'


const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: mockedGoBack
    })
}));

describe('CreatePost', () => {

    it('was rendered', () => {
        const { getByText } = renderWithProviders(<CreatePost />, {
            preloadedState: {
                user: { user: mock.user }
            }
        })


        expect(getByText('Endereço')).toBeTruthy()
    })

    describe('DID NOT submit if banner/adress/hour/description was empty', () => {

        beforeEach(() => {
            jest.useFakeTimers()
        })

        it('was NOT passed banner', async () => {
            const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)

            const { getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
                preloadedState: {
                    user: { user: mock.user }
                }
            })

            const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
            const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
            const inputLink = getByPlaceholderText(/https:/i)
            const inputDescription = getByPlaceholderText(/Descrição/i)
            const submitButton = getByText(/concluir/i)


            fireEvent.changeText(inputAdress, 'adres')
            fireEvent.changeText(inputHour, '9hr ~ 16hr')
            fireEvent.changeText(inputLink, 'youtube.com')
            fireEvent.changeText(inputDescription, 'blablablabla')

            fireEvent.press(submitButton)

            expect(createPostSpy).not.toBeCalled()
        })

        it('was NOT passed adress', async () => {
            jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
                canceled: false,
                assets: [{
                    type: 'image',
                    uri: 'abc.jpeg',
                    width: 200,
                    height: 200
                }]
            })
            const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)



            const { findByTestId, getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
                preloadedState: {
                    user: { user: mock.user }
                }
            })


            const pickImageBtn = await findByTestId('PickImageBtn')
            const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
            const inputLink = getByPlaceholderText(/https:/i)
            const inputDescription = getByPlaceholderText(/Descrição/i)
            const submitButton = getByText(/concluir/i)

            await act(async () => {
                await fireEvent(pickImageBtn, 'press')
            })

            fireEvent.changeText(inputHour, '9hr ~ 16hr')
            fireEvent.changeText(inputLink, 'youtube.com')
            fireEvent.changeText(inputDescription, 'blablablabla')

            await act(() => {
                fireEvent.press(submitButton)
            })

            expect(createPostSpy).not.toBeCalled()
        })

        it('was NOT passed hour', async () => {
            jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
                canceled: false,
                assets: [{
                    type: 'image',
                    uri: 'abc.jpeg',
                    width: 200,
                    height: 200
                }]
            })
            const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)



            const { findByTestId, getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
                preloadedState: {
                    user: { user: mock.user }
                }
            })


            const pickImageBtn = await findByTestId('PickImageBtn')
            const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
            const inputLink = getByPlaceholderText(/https:/i)
            const inputDescription = getByPlaceholderText(/Descrição/i)
            const submitButton = getByText(/concluir/i)

            await act(async () => {
                await fireEvent(pickImageBtn, 'press')
            })

            fireEvent.changeText(inputAdress, 'adres')
            fireEvent.changeText(inputLink, 'youtube.com')
            fireEvent.changeText(inputDescription, 'blablablabla')

            await act(() => {
                fireEvent.press(submitButton)
            })

            expect(createPostSpy).not.toBeCalled()
        })

        it('was NOT passed description', async () => {
            jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
                canceled: false,
                assets: [{
                    type: 'image',
                    uri: 'abc.jpeg',
                    width: 200,
                    height: 200
                }]
            })
            const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)



            const { findByTestId, getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
                preloadedState: {
                    user: { user: mock.user }
                }
            })


            const pickImageBtn = await findByTestId('PickImageBtn')
            const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
            const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
            const inputLink = getByPlaceholderText(/https:/i)
            const submitButton = getByText(/concluir/i)

            await act(async () => {
                await fireEvent(pickImageBtn, 'press')
            })

            fireEvent.changeText(inputAdress, 'adres')
            fireEvent.changeText(inputHour, '9hr ~ 16hr')
            fireEvent.changeText(inputLink, 'youtube.com')

            await act(() => {
                fireEvent.press(submitButton)
            })

            expect(createPostSpy).not.toBeCalled()
        })
    })
    it('created post correctly when passed all props', async () => {
        jest.useFakeTimers()
        jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
            canceled: false,
            assets: [{
                type: 'image',
                uri: 'abc.jpeg',
                width: 200,
                height: 200
            }]
        })
        const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)



        const { findByTestId, getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
            preloadedState: {
                user: { user: mock.user }
            }
        })


        const pickImageBtn = await findByTestId('PickImageBtn')
        const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
        const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
        const inputLink = getByPlaceholderText(/https:/i)
        const inputDescription = getByPlaceholderText(/Descrição/i)
        const submitButton = getByText(/concluir/i)

        await act(async () => {
            await fireEvent(pickImageBtn, 'press')
        })

        fireEvent.changeText(inputAdress, 'adres')
        fireEvent.changeText(inputHour, '9hr ~ 16hr')
        fireEvent.changeText(inputLink, 'youtube.com')
        fireEvent.changeText(inputDescription, 'blablablabla')

        await act(() => {
            fireEvent.press(submitButton)
        })

        expect(createPostSpy).toBeCalled()
    })

    it('created post without redirect link', async () => {
        jest.useFakeTimers()
        jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
            canceled: false,
            assets: [{
                type: 'image',
                uri: 'abc.jpeg',
                width: 200,
                height: 200
            }]
        })
        const createPostSpy = jest.spyOn(createPostMock, 'createPost').mockResolvedValue(200)



        const { findByTestId, getByPlaceholderText, getByText } = renderWithProviders(<CreatePost />, {
            preloadedState: {
                user: { user: mock.user }
            }
        })


        const pickImageBtn = await findByTestId('PickImageBtn')
        const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
        const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
        const inputDescription = getByPlaceholderText(/Descrição/i)
        const submitButton = getByText(/concluir/i)

        await act(async () => {
            await fireEvent(pickImageBtn, 'press')
        })

        fireEvent.changeText(inputAdress, 'adres')
        fireEvent.changeText(inputHour, '9hr ~ 16hr')
        fireEvent.changeText(inputDescription, 'blablablabla')

        await act(() => {
            fireEvent.press(submitButton)
        })

        expect(createPostSpy).toBeCalled()
        cleanup()
    })

    it('goBack when title was clicked', async () => {

        const { getByText } = renderWithProviders(<CreatePost />, {
            preloadedState: {
                user: { user: mock.user }
            }
        })

        fireEvent(getByText('criar post', { exact: false }), 'press')

        expect(mockedGoBack).toHaveBeenCalled()
    })

    it('showed toast if request return error', async () => {
        jest.useFakeTimers()
        const alertSpy = jest.spyOn(ToastAndroid, 'show').mockReturnValue()

        jest.spyOn(createPostMock, 'createPost').mockRejectedValueOnce({
            response: {
                data: {
                    code: '01'
                }
            }
        })
        jest.spyOn(pickImageToMock, 'pickImage').mockResolvedValueOnce({
            canceled: false,
            assets: [{
                type: 'image',
                uri: 'abc.jpeg',
                width: 200,
                height: 200
            }]
        })

        const { getByText, findByTestId, getByPlaceholderText } = renderWithProviders(<CreatePost />, {
            preloadedState: {
                user: { user: mock.user }
            }
        })

        const pickImageBtn = await findByTestId('PickImageBtn')
        const inputAdress = getByPlaceholderText(/Endereço do local da campanha/i)
        const inputHour = getByPlaceholderText(/10hrs ~ 17hrs/i)
        const inputDescription = getByPlaceholderText(/Descrição/i)
        const submitButton = getByText(/concluir/i)

        await act(async () => {
            await fireEvent(pickImageBtn, 'press')
        })

        fireEvent.changeText(inputAdress, 'adres')
        fireEvent.changeText(inputHour, '9hr ~ 16hr')
        fireEvent.changeText(inputDescription, 'blablablabla')

        await act(() => {
            fireEvent.press(submitButton)
        })

        expect(alertSpy).toHaveBeenCalled()

    })
})