import produce from 'immer';

const initialState = {
    products: [], // 상품리스트
    wishProducts: [], // 위시리스트
    page: 'PRODUCT', // 상품리스트 <-> 위시리스트, 페이지전환 플래그
    alignByPrice: null, // 상품정렬 (가격, 오름차순-asc/내림차순-desc)
    productListScrollY: 0,
    wishListScrollY: 0,
};

const dummyProducts = [
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-1.jpg',
        productName: '커럼빈 야생 동물원',
        price: 100000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-2.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 200000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-3.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 300000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-4.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 400000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-5.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 110000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-6.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 120000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-7.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 130000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-8.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 140000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-9.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 150000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-10.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 160000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-11.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 170000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-12.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 180000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
];

const moreProducts = [
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-13.jpg',
        productName: '커럼빈 야생 동물원',
        price: 100000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-14.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 200000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-15.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 300000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-16.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 400000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-17.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 110000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-18.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 120000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-19.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 130000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-20.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 140000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-21.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 150000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-22.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 160000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
];

const moreProducts1 = [
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-23.jpg',
        productName: '커럼빈 야생 동물원',
        price: 100000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-24.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 200000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-25.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 300000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-26.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 400000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-27.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 110000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-28.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 120000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-29.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 130000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-30.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 140000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-31.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 150000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-32.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 160000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
];

const moreProducts2 = [
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-33.jpg',
        productName: '커럼빈 야생 동물원',
        price: 100000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-34.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 200000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-35.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 300000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-36.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 400000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-37.jpg',
        productName: '[투어] 마스터 셰프 코리아 김미화와 함께 하는 쿠킹클래스 & 고메여행 (프랑스/파리)',
        price: 110000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-38.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 120000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-39.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 130000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-40.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 140000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-41.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 150000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
    {
        id: Math.ceil(Math.random() * 1000000),
        thumbnail: 'https://d2ur7st6jjikze.cloudfront.net/share/thumbnail/thumbnail-42.jpg',
        productName: '파리 생투앙 벼룩시장과 몽마르트 언덕 투어',
        price: 160000,
        isWishProduct: false,
        isThumbnailLoaded: false,
    },
];

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_WISH_PRODUCTS_REQUEST = 'FETCH_WISH_PRODUCTS_REQUEST';
export const CHANGE_PAGE = 'CHAGE_PAGE';
export const ALIGN_PRODUCT_BY_PRICE = 'ALIGN_PRODUCT_BY_PRICE';
export const SET_PRODUCT_LIST_SCROLL_Y = 'SET_PRODUCT_LIST_SCROLL_Y';
export const SET_WISH_LIST_SCROLL_Y = 'SET_WISH_LIST_SCROLL_Y';
export const TOGGLE_WISH = 'TOGGLE_WISH';
export const LOAD_IMAGE_COMPLETE = 'LOAD_IMAGE_COMPLETE';
export const INIT_IMAGE_LOADED = 'INIT_IMAGE_LOADED';
export const LOAD_MORE_PRODUCTS = 'LOAD_MORE_PRODUCTS';

export const fetchProductsRequestAction = (alignByPrice) => ({
    type: FETCH_PRODUCTS_REQUEST,
    data: alignByPrice,
});

export const fetchWishProductsRequestAction = (alignByPrice) => ({
    type: FETCH_WISH_PRODUCTS_REQUEST,
    data: alignByPrice,
});

export const changePageAction = (page) => ({
    type: CHANGE_PAGE,
    data: page,
});

export const alignProductByPriceAction = (type) => ({
    type: ALIGN_PRODUCT_BY_PRICE,
    data: type,
});

export const setProductListScrollYAction = (y) => ({
    type: SET_PRODUCT_LIST_SCROLL_Y,
    data: y,
});

export const setWishListScrollYAction = (y) => ({
    type: SET_WISH_LIST_SCROLL_Y,
    data: y,
});

export const toggleWishAction = (id) => ({
    type: TOGGLE_WISH,
    data: id,
});

// LOAD_IMAGE_COMPLETE
export const loadImageCompleteAction = (id) => ({
    type: LOAD_IMAGE_COMPLETE,
    data: id,
});

export const initImageLoadedAction = {
    type: INIT_IMAGE_LOADED,
};

export const loadMoreProducts = {
    type: LOAD_MORE_PRODUCTS,
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case FETCH_PRODUCTS_REQUEST: {
                if (action.data === 'DESC') {
                    draft.products = state.products.slice().sort((p, c) => {
                        return c.price - p.price;
                    });
                } else if (action.data === 'ASC') {
                    draft.products = state.products.slice().sort((p, c) => {
                        return p.price - c.price;
                    });
                } else {
                    if (!draft.products.length) {
                        draft.products = [...dummyProducts];
                    } else {
                        draft.products = [...state.products];
                        console.log(draft.products);
                    }
                }

                break;
            }
            case FETCH_WISH_PRODUCTS_REQUEST: {
                if (action.data === 'DESC') {
                    draft.wishProducts = state.wishProducts.slice().sort((p, c) => {
                        return c.price - p.price;
                    });
                } else if (action.data === 'ASC') {
                    draft.wishProducts = state.wishProducts.slice().sort((p, c) => {
                        return p.price - c.price;
                    });
                } else {
                    draft.wishProducts = [...state.wishProducts];
                }

                break;
            }
            case CHANGE_PAGE: {
                draft.page = action.data;
                break;
            }
            case ALIGN_PRODUCT_BY_PRICE: {
                draft.alignByPrice = action.data;
                break;
            }
            case SET_PRODUCT_LIST_SCROLL_Y: {
                draft.productListScrollY = action.data;
                break;
            }
            case SET_WISH_LIST_SCROLL_Y: {
                draft.wishListScrollY = action.data;
                break;
            }
            case TOGGLE_WISH: {
                let wishProduct = state.wishProducts.slice().find((w) => w.id === action.data);
                const pid = state.products.slice().findIndex((p) => p.id === action.data);

                if (typeof wishProduct === 'undefined') {
                    const findProduct = state.products.slice().find((p) => p.id === action.data);

                    wishProduct = Object.assign({}, findProduct);
                    wishProduct.isWishProduct = true;

                    draft.products[pid].isWishProduct = true;
                    draft.wishProducts.push(wishProduct);
                } else {
                    draft.products[pid].isWishProduct = false;
                    draft.wishProducts = state.wishProducts.slice().filter((w) => w.id !== wishProduct.id);
                }
                break;
            }
            case LOAD_IMAGE_COMPLETE: {
                if (state.page === 'PRODUCT') {
                    const pid = state.products.slice().findIndex((p) => p.id === action.data);
                    console.log(pid);
                    if (pid > -1) {
                        draft.products[pid].isThumbnailLoaded = true;
                    }
                } else {
                    // console.log('LOAD_IMAGE_COMPLETE', action.data);
                    const wishPid = state.wishProducts.slice().findIndex((p) => p.id === action.data);
                    if (wishPid > -1) {
                        draft.wishProducts[wishPid].isThumbnailLoaded = true;
                    }
                }
                break;
            }
            case INIT_IMAGE_LOADED: {
                console.log('init laod');
                if (state.page === 'PRODUCT') {
                    const copiedProducts = [...state.products];
                    draft.products = copiedProducts.map((v) => {
                        return {
                            id: v.id,
                            thumbnail: v.thumbnail,
                            productName: v.productName,
                            price: v.price,
                            isWishProduct: v.isWishProduct,
                            isThumbnailLoaded: false,
                        };
                    });
                } else {
                    const copiedWishProducts = [...state.wishProducts];
                    draft.wishProducts = copiedWishProducts.map((v) => {
                        return {
                            id: v.id,
                            thumbnail: v.thumbnail,
                            productName: v.productName,
                            price: v.price,
                            isWishProduct: v.isWishProduct,
                            isThumbnailLoaded: false,
                        };
                    });
                }
                break;
            }
            case LOAD_MORE_PRODUCTS: {
                if (draft.products.length < 18) {
                    draft.products.push(...moreProducts);
                } else if (draft.products.length >= 18 && draft.products.length < 23) {
                    draft.products.push(...moreProducts1);
                } else if (draft.products.length >= 23 && draft.products.length < 40) {
                    draft.products.push(...moreProducts2);
                }
                break;
            }
            default:
                break;
        }
    });
};

export default reducer;
