import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishProductsRequestAction, setWishListScrollYAction } from '../reducers/products';
import ProductCard from './ProductCard';

const WishList = () => {
    const { wishProducts, alignByPrice, wishListScrollY } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('wish useEffect');
        fetchWishProducts();
        window.scrollTo(0, wishListScrollY);
        window.addEventListener('scroll', onScrollWish);
        return () => {
            window.removeEventListener('scroll', onScrollWish);
        };
    }, [alignByPrice]);

    const fetchWishProducts = () => {
        // console.log('fetchWishProducts');
        dispatch(fetchWishProductsRequestAction(alignByPrice));
    };

    const onScrollWish = () => {
        // console.log('onScrollWish');
        dispatch(setWishListScrollYAction(window.scrollY));
    };

    return (
        <>
            <main>
                <section id="product-list--container">
                    {wishProducts.length ? (
                        wishProducts.map((info, idx) => {
                            return <ProductCard key={idx} info={info} />;
                        })
                    ) : (
                        <div className="no-wish--message"> 위시 리스트에 담긴 상품이 없습니다.</div>
                    )}
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
                .no-wish--message {
                    text-align: center;
                    color: #999;
                }
            `}</style>
        </>
    );
};

export default WishList;
