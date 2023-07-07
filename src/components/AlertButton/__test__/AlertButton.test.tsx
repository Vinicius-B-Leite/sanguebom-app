import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AlertButton from '../index'
import { store } from '../../../feature/store'
import { renderWithProviders } from '../../../utlis/test-utils/customRender'
import { lightMode } from '../../../theme/lightMode'


describe('AlertButton', () => {
    describe('user type was "donors"', () => {

        it('was NOT rendered', async () => {

            const userInitialState = {
                user: {
                    uid: '123',
                    email: 'userinfo.Email',
                    password: 'userinfo.Password',
                    username: 'userinfo.Username',
                    type: 'donors',
                    token: 'userinfo.Email'
                }
            }
            const { root } = renderWithProviders(
                <AlertButton onClick={() => { }} />, {
                preloadedState: { user: userInitialState }
            })


            expect(root).toBeFalsy()
        })
    })
    describe('user type was "bloodCollectors"', () => {
        const userInitialState = {
            user: {
                uid: '123',
                email: 'userinfo.Email',
                password: 'userinfo.Password',
                username: 'userinfo.Username',
                type: 'bloodCollectors',
                token: 'userinfo.Email'
            }
        }

        it('was rendered', async () => {
            const { findByTestId } = renderWithProviders(
                <AlertButton onClick={() => { }} />, {
                preloadedState: { user: userInitialState }
            })

            const alertTriangleIcon = await findByTestId('alertTriangleIcon')

            expect(alertTriangleIcon).toBeTruthy()
        })

        it('called the onClick function from props on icon pressed', async () => {
            const mockFN = jest.fn()
            const { findByTestId } = renderWithProviders(
                <AlertButton onClick={mockFN} />,
                { preloadedState: { user: userInitialState } }
            )

            const alertTriangleIcon = await findByTestId('alertTriangleIcon')


            fireEvent.press(alertTriangleIcon)

            expect(mockFN).toHaveBeenCalled()
        })

        it('if theme was lightMode the icon color is background_100', async () => {
            const { findByTestId } = renderWithProviders(
                <AlertButton onClick={() => { }} />, {
                preloadedState: { user: userInitialState }
            })

            const alertTriangleIcon = await findByTestId('alertTriangleIcon')

            expect(alertTriangleIcon.props.style[0].color).toBe(lightMode.colors.background_100)
        })
        it('if theme was darkMode the icon color is oppositeContrast', async () => {
            const { findByTestId } = renderWithProviders(
                <AlertButton onClick={() => { }} />, {
                preloadedState: { user: userInitialState },
            }, 'dark')

            const alertTriangleIcon = await findByTestId('alertTriangleIcon')

            expect(alertTriangleIcon.props.style[0].color).toBe(lightMode.colors.oppositeContrast)
        })
    })
})