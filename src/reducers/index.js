const initialState = {
    searchKey: '',
    movies: [],
}
const CommonReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SAVE_SEARCH_KEY':
            return {...state, searchKey: action.payload}
        case 'SET_MOVIES':
            return {...state, movies: [...action.payload]}
        default:
            return state;
    }
}

export default CommonReducer;