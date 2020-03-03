import { useDispatch, useSelector } from 'react-redux';
import {
    changePageAction,
    alignProductByPriceAction,
    fetchProductsRequestAction,
    initImageLoadedAction,
} from '../reducers/products';

const ProductHeader = () => {
    const { page, alignByPrice } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handleChangePage = (page) => {
        // console.log('changePage', page);
        dispatch(changePageAction(page));
        dispatch(initImageLoadedAction); // 이미지 로딩 재연용
    };

    const handleAlignProduct = (alignByPrice) => {
        dispatch(alignProductByPriceAction(alignByPrice));
    };

    return (
        <>
            <header>
                <nav>
                    <div className="page-nav-group--wrapper">
                        <div
                            className={page === 'PRODUCT' ? 'selected-page' : ''}
                            onClick={() => handleChangePage('PRODUCT')}
                        >
                            상품 리스트
                        </div>
                        <div
                            className={page === 'WISH' ? 'selected-page' : ''}
                            onClick={() => handleChangePage('WISH')}
                        >
                            위시 리스트
                        </div>
                    </div>
                    <div className="align-nav-group--wrapper">
                        <div
                            className={alignByPrice === 'DESC' ? 'selected-align' : ''}
                            onClick={() => handleAlignProduct('DESC')}
                        >
                            높은 가격순
                        </div>
                        <div style={{ margin: '0 8px' }}>|</div>
                        <div
                            className={alignByPrice === 'ASC' ? 'selected-align' : ''}
                            onClick={() => handleAlignProduct('ASC')}
                        >
                            낮은 가격순
                        </div>
                    </div>
                </nav>
            </header>
            <style jsx>{`
                @media (min-width: 1024px) {
                    header {
                        position: sticky;
                        top: 0;
                        background-color: #fff;
                        height: 73px;
                        border-bottom: 1px solid #00000033;
                        z-index: 99;
                        min-width: 1076px;
                    }
                    nav {
                        display: flex;
                        max-width: 1060px;
                        margin: 0 auto;
                        position: relative;
                        top: 27px;
                        justify-content: space-between;
                    }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                    header {
                        position: sticky;
                        top: 0;
                        background-color: #fff;
                        height: 73px;
                        border-bottom: 1px solid #00000033;
                        z-index: 99;
                        min-width: 768px;
                    }
                    nav {
                        display: flex;
                        max-width: 1060px;
                        position: relative;
                        top: 27px;
                        justify-content: space-between;
                        width: 96%;
                    }
                }
                @media (max-width: 768px) {
                    header {
                        position: sticky;
                        top: 0;
                        background-color: #fff;
                        height: 73px;
                        border-bottom: 1px solid #00000033;
                        z-index: 99;
                        min-width: 556px;
                    }
                    nav {
                        display: flex;
                        max-width: 1060px;
                        position: relative;
                        top: 27px;
                        justify-content: space-between;
                        width: 96%;
                    }
                }

                nav div {
                    display: inline-block;
                }

                .page-nav-group--wrapper {
                    margin-left: -6px;
                }
                .page-nav-group--wrapper div {
                    padding: 0 16px;
                    height: 46px;
                }
                .page-nav-group--wrapper div.selected-page {
                    font-weight: 700;
                    border-bottom: 3px solid #000;
                }

                .align-nav-group--wrapper {
                    font-size: 15px;
                }
                .align-nav-group--wrapper div.selected-align {
                    font-weight: 700;
                }
            `}</style>
        </>
    );
};

export default ProductHeader;
