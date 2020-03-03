import Header from '../components/Header';
import { useEffect } from 'react';
import ProductList from '../components/ProductList';
import WishList from '../components/WishList';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreProducts } from '../reducers/products';

const App = () => {
    const { page, products } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const onScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) {
            dispatch(loadMoreProducts);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [products.length]);

    return (
        <>
            <Header />
            {page === 'PRODUCT' ? <ProductList /> : <WishList />}
        </>
    );
};

export default App;
