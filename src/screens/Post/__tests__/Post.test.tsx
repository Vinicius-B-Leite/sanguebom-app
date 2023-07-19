import React from "react"
import Post from '../index'
import { fireEvent, renderWithProviders } from '../../../utlis/test-utils/customRender'
import * as apiService from '../../../api/getOnePost'
import { mocks } from './mocks'



const renderComponent = (mockNavigate?: jest.Mock) => renderWithProviders(
    <Post
        navigation={{ ...jest.requireActual('@react-navigation/native'), navigate: mockNavigate || jest.fn(), }}
        route={{ ...jest.requireActual('@react-navigation/native'), params: { postID: mocks.fakePost.id } }}
    />
)
describe('Post', () => {
    beforeEach(() => {
        jest.spyOn(apiService, 'getOnePost').mockResolvedValue(mocks.fakePost)
    })

    it('rendered post details', async () => {
        const { findByText } = renderComponent()
        const postDescription = mocks.fakePost.description
        expect(await findByText(postDescription, { exact: false })).toBeTruthy()
    })

    it('went back to home when click on header', async () => {
        const mockGoBack = jest.fn()
        const { findByTestId } = renderComponent(mockGoBack)

        const arrowIcon = await findByTestId('arrow-icon')
        fireEvent(arrowIcon, 'press')

        expect(mockGoBack).toHaveBeenCalled()
    })
})