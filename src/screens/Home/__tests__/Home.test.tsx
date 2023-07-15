import { mocks } from './mocks'
import React from "react";
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import Home from '../index'
import * as apiService from '../../../api/getPosts'
import { act, fireEvent, waitFor } from "@testing-library/react-native";
import * as postStorage from '../../../storage/postsStorage';
import * as netInfo from '@react-native-community/netinfo'



const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockedNavigate
    })
}));

const mockRefetch = jest.fn()
const mockFetchNextPage = jest.fn()

jest.mock('@tanstack/react-query', () => {
    const originalModule = jest.requireActual('@tanstack/react-query');
    const originalUseInfiniteQuery = originalModule.useInfiniteQuery;

    const mockedUseInfiniteQuery = (...args) => {
        const originalQuery = originalUseInfiniteQuery(...args);

        return {
            ...originalQuery,
            refetch: mockRefetch,
            fetchNextPage: mockFetchNextPage
        };
    };

    return {
        ...originalModule,
        useInfiniteQuery: mockedUseInfiniteQuery,
    };
});

describe('Home', () => {

    describe('online', () => {

        beforeEach(() => {
            jest.spyOn(apiService, 'getPosts').mockResolvedValueOnce(mocks.fakeInfinitePost)
            jest.useFakeTimers()
        })
        it('rendered', async () => {
            const { findByText } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })


            const headerTitle = await findByText(/sangue bom/i)
            expect(headerTitle).toBeTruthy()
        })

        it('navigated to Notification screen when notification icon was clicked', async () => {

            const { findByTestId, getByTestId } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })


            await waitFor(() => getByTestId('bellIcon'))

            await act(() => fireEvent(getByTestId('bellIcon'), 'press'))


            expect(mockedNavigate).toHaveBeenLastCalledWith('Notification')
        })
        it('navigated to MyDonates screen when bloodDonateIcon icon was clicked', async () => {

            const { findByTestId, getByTestId } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })


            await waitFor(() => getByTestId('bloodDonateIcon'))

            await act(() => fireEvent(getByTestId('bloodDonateIcon'), 'press'))


            expect(mockedNavigate).toHaveBeenLastCalledWith('MyDonates')

        })

        it('showed PostList when fetch fineshed', async () => {

            const { getAllByText, findByText } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })


            const firstPostDescription = await findByText(mocks.fakeInfinitePost.data[0].description)

            expect(firstPostDescription).toBeTruthy()
        })

        it('refresed list when pull up post list', async () => {

            const { getByTestId } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })

            const postList = await waitFor(() => getByTestId('postList'))
            const { refreshControl } = postList.props;

            await act(() => {
                refreshControl.props.onRefresh();
            });

            expect(mockRefetch).toHaveBeenCalled()
        })

        it('scrolled to bottom and it has a next page to fetch', async () => {
            const { getByTestId } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })

            const postList = await waitFor(() => getByTestId('postList'))

            await act(() => {
                postList.props.onEndReached();
            });

            expect(mockFetchNextPage).toHaveBeenCalled()
        })

    })
    describe('offline', () => {
        beforeAll(() => {
            jest.spyOn(netInfo, 'useNetInfo').mockImplementation(() => ({
                ...jest.requireActual('@react-native-community/netinfo').useNetInfo,
                isConnected: false,
            }))
            jest.spyOn(apiService, 'getPosts').mockResolvedValueOnce(mocks.fakeInfinitePost)

        })
        it('showed offline data when it was NOT connected in internet', async () => {

            jest.spyOn(postStorage, 'getPostsStorage').mockReturnValue([{
                adress: 'offlinePost.adress',
                bannerURL: 'offlinePost.bannerURL',
                bloodCollectors: mocks.fakeInfinitePost.data[0].bloodCollectors,
                bloodCollectorsID: 'offlinePost.bloodCollectorsID',
                createdAt: new Date(),
                description: 'offlinePost.description',
                id: 'offlinePost.id',
                linkRedirect: 'offlinePost.linkRedirect',
            }])


            const { findByText } = renderWithProviders(<Home />, {
                preloadedState: {
                    user: mocks.fakeUser,
                    notification: { length: 1 }
                }
            })


            const offlinePostDescription = await findByText(/offlinePost.description/i)
            expect(offlinePostDescription).toBeTruthy()

        })

    })
})