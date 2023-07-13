import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import FooterPost from './FooterPost'
import HeaderPost from './HeaderPost'
import { PostType } from '../../../types/PostType'
import { act, fireEvent } from "@testing-library/react-native";

const fakePost: PostType = {
    adress: 'post.adress',
    bannerURL: 'post.bannerURL',
    bloodCollectors: {
        adress: 'bloodCollectors.adress',
        alert: null,
        email: 'bloodCollectors.email',
        imageURL: 'bloodCollectors.imageURL',
        lat: 1233331,
        lng: 1233331,
        phoneNumber: 'bloodCollectors.phoneNumber',
        uid: 'bloodCollectors.uid',
        username: 'bloodCollectors.username'
    },
    bloodCollectorsID: '123123',
    createdAt: new Date(),
    description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    linkRedirect: 'post.lindkRedirect',
    id: '321321'
}
describe('PostComponents', () => {
    describe('FooterPost', () => {
        it('rendered', () => {
            const { getByText } = renderWithProviders(
                <FooterPost
                    createdAt={fakePost.createdAt}
                    adress={fakePost.adress}
                    description={fakePost.description}
                    enableMaxLength
                />
            )

            expect(getByText(fakePost.adress)).toBeTruthy()
        })

        it('loaded more description when "Ver mais" was clicked and enableMaxLength was true', () => {
            const { getByText, getByTestId } = renderWithProviders(
                <FooterPost
                    createdAt={fakePost.createdAt}
                    adress={fakePost.adress}
                    description={fakePost.description}
                    enableMaxLength
                />
            )

            const seeMoreButton = getByText(/ver mais/i)
            const descriptionText = getByTestId('description')
            const startText = descriptionText.children[0]

            act(() => {
                fireEvent(seeMoreButton, 'press')
            })

            const newText = descriptionText.children[0]
            expect(newText.length).toBeGreaterThan(startText.length)
        })
        it('loaded complete text when enableMaxLength was false', () => {
            const { getByText, getByTestId } = renderWithProviders(
                <FooterPost
                    createdAt={fakePost.createdAt}
                    adress={fakePost.adress}
                    description={fakePost.description}
                    enableMaxLength={false}
                />
            )

            const descriptionText = getByTestId('description')
            const startText = descriptionText.children[0]

            expect(startText.length).toEqual(fakePost.description.length)

        })
    })

    describe('HeaderPost', () => {
        it('rendered', () => {
            const { getByText } = renderWithProviders(
                <HeaderPost
                    avatarUrl={fakePost.bloodCollectors.imageURL}
                    username={fakePost.bloodCollectors.username}
                />
            )

            expect(getByText(fakePost.bloodCollectors.username)).toBeTruthy()
        })
    })
})