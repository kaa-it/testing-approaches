import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from "../store/store"
import Header from '../components/Header';

const renderWithRouter = (ui, {route = '/signin'} = {}) => {
    window.history.pushState({}, 'Test page', route);

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    }
};

describe('Header component', () => {
    afterEach(cleanup)

    test('should has img with logo class', () => {
        const textProp = 'Логотип проекта Mesto';
        render(
            <BrowserRouter>
                <Provider store={store}><Header/></Provider>
            </BrowserRouter>
        );
        const img = screen.getByAltText(textProp);
        expect(img).toHaveClass('logo');
    })

    test('should has header-wrapper-element with class header__wrapper', () => {
        const textProp = 'header-wrapper-element';

        renderWithRouter(
            <Provider store={store}>
                <Header/>
            </Provider>,
            { route: '/gallery'}
        );

        const element = screen.getByTestId(textProp);
        expect(element).toHaveClass('header__wrapper');
    })

    test('should has login element', async () => {
        const textProp = 'link-signin-element';

        const { user } = renderWithRouter(
            <Provider store={store}>
                <Header/>
            </Provider>
        );

        await user.click(screen.getByTestId(textProp));

        expect(screen.getByTestId('link-signup-element')).toHaveTextContent('Войти');
    })

    test('should be equal to snapshot', () => {
        const { asFragment } = renderWithRouter(
            <Provider store={store}>
                <Header/>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    })
})