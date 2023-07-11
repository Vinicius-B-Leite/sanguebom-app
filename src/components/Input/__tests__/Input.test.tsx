import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native'
import Input from '../index'
import { ThemeProvider } from 'styled-components/native';
import { lightMode } from '../../../theme/lightMode'


const Providers = ({ children }) => (
    <ThemeProvider theme={lightMode}>
        {children}
    </ThemeProvider>
)


describe('Input', () => {
    it('rendered in the screen', () => {
        const { getByPlaceholderText } = render(<Input placeholder='Input' />, {
            wrapper: Providers
        })

        const inputElement = getByPlaceholderText('Input')

        expect(inputElement).toBeTruthy()
    })

    describe('leftIcon component', () => {
        it('rendered', async () => {
            const { findByTestId } = render(<Input leftIcon='user' />, { wrapper: Providers })

            const leftIcon = await findByTestId('leftIcon')

            expect(leftIcon).toBeTruthy()
        })
        it('changed color if it was in focus', async () => {
            const { findByTestId, getByPlaceholderText } = render(<Input leftIcon='user' placeholder='username' />, { wrapper: Providers })

            const leftIcon = await findByTestId('leftIcon')
            const inpputElement = getByPlaceholderText('username')

            fireEvent(inpputElement, 'focus')

            expect(leftIcon.props.style[0].color).toBe(lightMode.colors.contrast_100)
        })
        it('changed color if it has NOT value ', async () => {
            const { findByTestId } = render(<Input leftIcon='user' />, { wrapper: Providers })

            const leftIcon = await findByTestId('leftIcon')

            expect(leftIcon.props.style[0].color).toBe(lightMode.colors.text_100)
        })
        it('changed color if it has value ', async () => {
            const { findByTestId } = render(
                <Input leftIcon='user' value='username' />,
                { wrapper: Providers }
            )

            const leftIcon = await findByTestId('leftIcon')


            expect(leftIcon.props.style[0].color).toBe(lightMode.colors.text_200)
        })
        describe('passed as "lock"', () => {
            it('secureTextEntry was enabled', async () => {
                const { getByPlaceholderText } = render(
                    <Input leftIcon='lock' placeholder='password' />,
                    { wrapper: Providers }
                )

                const inputElement = await getByPlaceholderText('password')

                fireEvent.press(inputElement)

                expect(inputElement.props.secureTextEntry).toBeTruthy()
            })
            it('secureTextEntry changed on leftIcon clicked', async () => {
                const { findByTestId, getByPlaceholderText } = render(
                    <Input leftIcon='lock' placeholder='password' />,
                    { wrapper: Providers }
                )

                const leftIcon = await findByTestId('leftIcon')
                const inputElement = await getByPlaceholderText('password')

                fireEvent.press(leftIcon)

                expect(inputElement.props.secureTextEntry).toBeFalsy()
            })
        })

    })

    it('has contrast colors on focus', () => {
        jest.spyOn(React, 'useState')
        const { getByPlaceholderText, getByTestId } = render(<Input placeholder='Input' />, {
            wrapper: Providers
        })

        const inputElement = getByPlaceholderText('Input')
        const containerViewElement = getByTestId('containerView')

        fireEvent(inputElement, 'focus')

        expect(containerViewElement.props.style[0].borderColor).toBe(lightMode.colors.contrast_100)

    })

    it('was NOT contrast colors on blur ', () => {
        const setStateMock = jest.spyOn(React, 'useState')

        const { getByPlaceholderText, getByTestId } = render(<Input placeholder='Input' />, {
            wrapper: Providers
        })

        const inputElement = getByPlaceholderText('Input')
        const containerViewElement = getByTestId('containerView')

        fireEvent(inputElement, 'blur')

        expect(containerViewElement.props.style[0].borderColor).toBe('none')
    })

    it('error message rendered when passed in props', () => {
        const { getByText } = render(<Input placeholder='Username' errorMessage='user not found' />, { wrapper: Providers })

        const errorMessageElement = getByText(/user not found/i)

        expect(errorMessageElement).toBeTruthy()
    })
})