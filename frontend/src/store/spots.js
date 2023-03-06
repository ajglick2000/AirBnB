import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_CURRENT_SPOT = 'spots/setCurrentSpot';

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
    return response;
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
            newState.current = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
