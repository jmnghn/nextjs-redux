import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishAction, loadImageCompleteAction } from '../reducers/products';

const ProductCard = ({ info }) => {
    const { page } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    let lazyLoadTimer;

    // useEffect(() => {
    //     return () => {
    //         clearTimeout(lazyLoadTimer);
    //     };
    // }, [info.isThumbnailLoaded]);

    const handleToggleWish = (id) => {
        if (page === 'WISH') {
            if (confirm('위시 리스트에서 제거 하시겠습니까?')) {
                dispatch(toggleWishAction(id));
            }
        } else {
            dispatch(toggleWishAction(id));
        }
    };

    const handleImgOnLoad = (id) => {
        // console.log('image loaded');
        // loaded action
        lazyLoadTimer = setTimeout(() => {
            dispatch(loadImageCompleteAction(id));
        }, 2000);
    };

    return (
        <>
            <div className="card-item--container">
                <div className="card-item--cover">
                    <div className="card-item--cover--inner">
                        {!info.isThumbnailLoaded && <img className="loading"></img>}
                        <img src={info.thumbnail} onLoad={handleImgOnLoad(info.id)}></img>
                    </div>
                </div>
                <div className="card-item--content">
                    <div className="ellipsis">
                        <h3>{info.productName}</h3>
                    </div>
                    <div className="card-item--content--bottom">
                        <div className="price">{info.price}원</div>
                        <div className="toggle-wish" onClick={() => handleToggleWish(info.id)}>
                            {info.isWishProduct ? '💙' : '🤍'}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (min-width: 1024px) {
                    .card-item--container {
                        display: inline-block;
                        width: calc(25% - 14px);
                        min-width: 250px;
                        margin-right: 16px;
                        margin-bottom: 16px;
                        border: 1px solid #efefef;
                        background-color: #fff;
                    }
                    .card-item--container:nth-child(4n) {
                        margin-right: 0;
                    }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                    .card-item--container {
                        display: inline-block;
                        width: calc(33% - 12px);
                        min-width: 250px;
                        margin-right: 12px;
                        margin-bottom: 12px;
                        border: 1px solid #efefef;
                        background-color: #fff;
                    }
                    .card-item--container:nth-child(3n) {
                        margin-right: 0;
                    }
                }
                @media (max-width: 768px) {
                    .card-item--container {
                        display: inline-block;
                        width: calc(50% - 12px);
                        min-width: 250px;
                        margin-right: 12px;
                        margin-bottom: 12px;
                        border: 1px solid #efefef;
                        background-color: #fff;
                    }
                    .card-item--container:nth-child(2n) {
                        margin-right: 0;
                    }
                }

                .card-item--cover {
                    height: 160px;
                    overflow: hidden;
                }
                .card-item--cover--inner {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    text-align: center;
                    position: relative;
                }
                .card-item--cover--inner img {
                    max-width: 135%;
                    position: absolute;
                    left: -36px;
                    top: -15px;
                }
                .card-item--cover--inner img.loading {
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 9;
                    animation: change-background 1.6s infinite;
                }
                .card-item--content {
                    height: 129px;
                    padding: 8px 12px;
                }
                .card-item--content h3 {
                    font-size: 18px;
                    margin: 0;
                }
                .card-item--content--bottom {
                    display: flex;
                    justify-content: space-between;
                }
                .card-item--content--bottom .price {
                    font-size: 16px;
                }
                .card-item--content--bottom .toggle-wish {
                    font-size: 21px;
                    position: relative;
                    bottom: 5px;
                }

                @keyframes change-background {
                    0% {
                        background-color: #ccc;
                    }
                    50% {
                        background-color: #ddd;
                    }
                    100% {
                        background-color: #ccc;
                    }
                }

                .ellipsis {
                    overflow: hidden;
                    position: relative;
                    background: white;
                    height: 36px;
                    margin-bottom: 34px;
                    margin-top: 17px;
                }

                .ellipsis:after {
                    content: '...';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    padding: 0 0.3em;
                    background: inherit;
                }

                .ellipsis h3:after {
                    content: '';
                    position: absolute;
                    width: 227px;
                    height: 50px;
                    z-index: 1;
                    background: white;
                }
            `}</style>
        </>
    );
};

export default ProductCard;
