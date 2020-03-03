import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequestAction, setProductListScrollYAction } from '../reducers/products';
import ProductCard from './ProductCard';

const ProductLIst = () => {
    const { products, wishProducts, alignByPrice, productListScrollY } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('product useEffect');
        fetchProducts();
        window.scrollTo(0, productListScrollY);
        window.addEventListener('scroll', onScrollProduct);
        return () => {
            window.removeEventListener('scroll', onScrollProduct);
        };
    }, [alignByPrice, wishProducts.length, products.length]);

    const fetchProducts = () => {
        dispatch(fetchProductsRequestAction(alignByPrice));
    };

    const onScrollProduct = () => {
        // console.log('onScrollProduct');
        dispatch(setProductListScrollYAction(window.scrollY));
    };

    return (
        <>
            <main>
                <section id="product-list--container">
                    {products &&
                        products.map((info, idx) => {
                            return <ProductCard key={idx} info={info} />;
                        })}
                </section>
            </main>
            <style jsx>{`
                @media (min-width: 1024px) {
                    main {
                        width: 1060px;
                        min-width: 1060px;
                        margin: 0 auto;
                        padding: 72px 8px 72px 8px;
                    }
                }
                @media (min-width: 769px) and (max-width: 1023px) {
                    main {
                        width: 780px;
                        min-width: 780px;
                        margin: 0 auto;
                        padding: 72px 8px 72px 8px;
                    }
                }
                @media (max-width: 768px) {
                    main {
                        width: 540px;
                        min-width: 540px;
                        margin: 0 auto;
                        padding: 72px 8px 72px 8px;
                    }
                }
            `}</style>
        </>
    );
};

export default ProductLIst;
