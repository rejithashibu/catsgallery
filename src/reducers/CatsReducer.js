import { ActionType } from '../redux/action-types/index';

const initialState = {
    vote: 0,
    cats: [],
    isUploading: false,
};

const CatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.VOTE_UP:
            return {
                ...state,
                cats: state.cats.map((cat) => {
                    if (cat.id === action.payload.image_id) {
                        return {
                            ...cat,
                            votes: { value: action.payload.value }
                        };
                    } else {
                        return cat;
                    }
                }),
            };
        case ActionType.VOTE_DOWN:
            return {
                ...state,
                cats: state.cats.map((cat) => {
                    if (cat.id === action.payload.image_id) {
                        return {
                            ...cat,
                            votes: { value: action.payload.value }
                        };
                    } else {
                        return cat;
                    }
                }),
            };
        case ActionType.MAKE_FAVOURITE:
            return {
                ...state,
                loadedFavourites: false,
                cats: state.cats.map((cat) => {
                    if (cat.id === action.payload.image_id) {
                        return {
                            ...cat,
                            favouriteId: action.payload.data.id,
                        };
                    } else {
                        return cat;
                    }
                }),
            };
        case ActionType.MAKE_UN_FAVOURITE:
            return {
                ...state,
                loadedFavourites: false,
                cats: state.cats.map((cat) => {
                    if (cat.id === action.payload.image_id) {
                        return {
                            ...cat,
                            favouriteId: null,
                        };
                    } else {
                        return cat;
                    }
                }),
            };
        case ActionType.GET_CATS_SUCCESS:
            return {
                ...state,
                loadedCats: true,
                loadedVotes: false,
                loadedFavourites: false,
                cats: action.payload
            };
        case ActionType.GET_VOTES_SUCCESS:
            return {
                ...state,
                loadedVotes: true,
                cats: state.cats.map((cat) => {
                    const allVotes = action.payload.filter((x) => x.image_id === cat.id);
                    return {
                        ...cat, allVotes: allVotes, favouriteId: cat.favourite && cat.favourite.id ? cat.favourite.id : null
                    };
                }),
            };
        case ActionType.GET_FAVOURITE_SUCCESS:
            return {
                ...state,
                loadedFavourites: true,
                cats: state.cats.map((cat) => {
                    const favourites = action.payload.find((x) => x.image_id === cat.id)
                    return {
                        ...cat, favourites: favourites
                    };
                }),
            };
        case ActionType.UPLOAD_CAT_SUCCESS:
            return {
                ...state,
                loadedVotes: false,
                isUploading: false,
                cats: [...state.cats, action.payload],
            };
        case ActionType.UPLOAD_CAT_FAILURE:
            return {
                ...state,
                loadedVotes: false,
                isUploading: false,
                cats: [...state.cats],
            };
        default:
            return state;
    }
}

export default CatsReducer;