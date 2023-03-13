import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_CURRENT_SPOT = 'spots/setCurrentSpot';
// const ADD_IMAGE = 'spots/addImage';

const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots,
    };
};

const setCurrentSpot = (spot) => {
    return {
        type: SET_CURRENT_SPOT,
        payload: spot,
    };
};

// const addImage = (spotId, image) => {
//     return {
//         type: ADD_IMAGE,
//         payload: {
//             spotId,
//             image,
//         },
//     };
// };

export const getAllSpots =
    (params = {}) =>
    async (dispatch) => {
        const query = new URLSearchParams(params);
        const response = await csrfFetch(
            `/api/spots${query ? '?' + query.toString() : ''}`
        );
        const data = await response.json();
        dispatch(setSpots(data.Spots));
        return response;
    };

export const getSessionSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    const data = await response.json();
    dispatch(setSpots(data.Spots));
    return response;
};

export const getSpotById = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    const data = await response.json();
    dispatch(setCurrentSpot(data));
    return response;
};

export const addImageToSpot =
    (spotId, imageUrl, preview) => async (dispatch) => {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: imageUrl,
                preview,
            }),
        });
        // const data = await response.json();
        dispatch(getSpotById(spotId));
        return response;
    };

export const createSpot = (spot) => async (dispatch) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    } = spot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }),
    });
    const data = await response.json();
    dispatch(setCurrentSpot(data));
    return data;
};
export const updateSpot = (spot) => async (dispatch) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        spotId,
    } = spot;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }),
    });
    const data = await response.json();
    dispatch(setCurrentSpot(data));
    return data;
};

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(getSessionSpots());
    return data;
};

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_SPOTS: {
            newState = Object.assign({}, state);
            newState.Spots = action.payload;
            return newState;
        }
        case SET_CURRENT_SPOT: {
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // case ADD_IMAGE: {
        //     const image = action.payload.image;
        //     newState = Object.assign({}, state);
        //     const spot = newState[action.payload.spotId];
        //     if (spot) {
        //         const newSpots = [...spot.Spot_Images, image];
        //         spot.Spot_Images = newSpots;
        //     }
        //     return newState;
        // }
        default:
            return state;
    }
}
