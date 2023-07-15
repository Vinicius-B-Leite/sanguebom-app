import React, { FC } from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import HeaderGoBack from '../index'
import { ThemeProvider } from 'styled-components/native'
import { lightMode } from '../../../theme/lightMode'
import { darkMode } from '../../../theme/darkMode'


const Providers = ({ children }) => (
    <ThemeProvider theme={lightMode}>
        {children}
    </ThemeProvider>
)

describe('HeaderGoBack', () => {
    it('the component was rendered', () => {
        const { getByText } = render(<HeaderGoBack
            theme='contrast'
            title='Voltar'
            goBack={jest.fn()}
        />,
            {
                wrapper: Providers
            })

        const element = getByText('Voltar')

        expect(element).toBeTruthy()
    })

    it('icon color was contrast when theme prop was passed as transparent', () => {
        const { getByTestId } = render(
            <HeaderGoBack
                theme='transparent'
                title='Voltar'
                goBack={() => { }}
            />,
            {
                wrapper: Providers
            }
        )

        const arrowIcon = getByTestId('arrow-icon')

        expect(arrowIcon.props.style[0].color).toEqual(lightMode.colors.contrast_100)
    })

    it('changed border when it was in darkMode', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={darkMode}>
                <HeaderGoBack
                    theme='contrast'
                    title='Voltar'
                    goBack={jest.fn()}
                />
            </ThemeProvider>
        )

        const element = getByTestId('header-view')

        expect(element.props.style[0].borderBottomWidth).toEqual(1)
        expect(element.props.style[0].borderBottomColor).toEqual(darkMode.colors.contrast_100)
    })

    it('header has not color border in light mode', () => {
        const { getByTestId } = render(
            <HeaderGoBack
                theme='transparent'
                title='Voltar'
                goBack={() => { }}
            />,
            {
                wrapper: Providers
            }
        )

        const headerView = getByTestId('header-view')

        expect(headerView.props.style[0].borderBottomColor).toEqual('none')
        expect(headerView.props.style[0].borderBottomWidth).toEqual(0)
    })

    it('goBack function called', () => {
        const goBackMock = jest.fn()
        const { getByTestId } = render(<HeaderGoBack goBack={goBackMock} theme='contrast' title='Voltar' />, {
            wrapper: Providers
        })

        const arrowIcon = getByTestId('arrow-icon')

        fireEvent.press(arrowIcon)

        expect(goBackMock).toBeCalled()
    })
})