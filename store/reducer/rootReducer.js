const initState = {
    products: [
        
    ],
    countCart: 0
}


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_API_PRODUCTS':
            
            return {
                ...state, products: action.products
            }
        case 'COUNT_CART':
            return {
                ...state, countCart: action.count
            }
        default:
            break;
    }
}

export {
    initState,
    rootReducer
}