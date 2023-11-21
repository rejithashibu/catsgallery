import { ActionType } from "../action-types"
import axios from 'axios';

const endpoint = process.env.REACT_APP_CATS_END_POINT;
const config = {
    headers: {
        "x-api-key": process.env.REACT_APP_CATS_X_API_KEY,
    },
};

export const fetchCats = () => {
    return (dispatch) => {
        axios.get(`${endpoint}/images?order=asc&limit=100`, config)
            .then(response => {
                dispatch({
                    type: ActionType.GET_CATS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
}

export const fetchVotes = () => {
    return (dispatch) => {
        axios.get(`${endpoint}/votes?`, config)
            .then(response => {
                dispatch({
                    type: ActionType.GET_VOTES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const fetchFavourites = (user) => {
    return (dispatch) => {
        axios.get(`${endpoint}/favourites?sub_id=${user}`, config)
            .then(response => {
                dispatch({
                    type: ActionType.GET_FAVOURITE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const voteUp = (imageId, value, user) => {
    return (dispatch) => {
        axios.post(`${endpoint}/votes`, { image_id: imageId, value, sub_id: user }, config)
            .then(response => {
                dispatch({
                    type: ActionType.VOTE_UP,
                    payload: { image_id: imageId, value: value }
                });
                fetchVotes();
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const voteDown = (imageId, value, user) => {
    return (dispatch) => {
        axios.post(`${endpoint}/votes`, { image_id: imageId, value, sub_id: user }, config)
            .then(response => {
                dispatch({
                    type: ActionType.VOTE_DOWN,
                    payload: { image_id: imageId, value: value }
                });
                fetchVotes();
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const makeFavourite = (imageId, user) => {
    return (dispatch) => {
        axios.post(`${endpoint}/favourites`, { image_id: imageId, sub_id: user }, config)
            .then((response) => {
                dispatch({
                    type: ActionType.MAKE_FAVOURITE,
                    payload: { image_id: imageId, data: response.data }
                });
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const makeUnFavourite = (favId) => {
    return (dispatch) => {
        axios.delete(`${endpoint}/favourites/${favId}`, config)
            .then((response) => {
                dispatch({
                    type: ActionType.MAKE_UN_FAVOURITE,
                    payload: { data: response.data }
                });
            })
            .catch(error => {
                // TODO: handle the error
            })
    }
};

export const uploadCat = (file, history, user) => {
    const formdata = new FormData();
    formdata.append("file", file, file.name);
    formdata.append("sub_id", user);
    return (dispatch) => {
        try {
            axios.post(`${endpoint}/images/upload`, formdata, {
                ...config,
                headers: { ...config.headers, "Content-Type": "multipart/form-data" },
            }).catch(error => {
                alert(error || 'Upload failed');
                dispatch({
                    type: ActionType.UPLOAD_CAT_FAILURE,
                    payload: error
                });
            }).then((response) => {
                if (response && response?.status === 201) {
                    history.push('/');
                    dispatch({
                        type: ActionType.UPLOAD_CAT_SUCCESS,
                        payload: response.data
                    });
                } else {
                    dispatch({
                        type: ActionType.UPLOAD_CAT_FAILURE,
                        payload: null
                    });
                }
            })

        } catch (error) {
            dispatch({
                type: ActionType.UPLOAD_CAT_FAILURE,
                payload: error
            });
            console.log(error)
        }
    }
};
