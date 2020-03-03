import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import reducer from '../reducers';
import Header from '../components/Header';

const Home = ({ Component, pageProps, store }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

const configureStore = (initialState, options) => {
    const middlewares = [];
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : compose(
                  applyMiddleware(...middlewares),
                  !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
                      ? window.__REDUX_DEVTOOLS_EXTENSION__()
                      : (f) => f,
              );

    const store = createStore(reducer, initialState, enhancer);

    return store;
};

export default withRedux(configureStore)(Home);
