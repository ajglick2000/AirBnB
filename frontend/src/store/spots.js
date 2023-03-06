import { csrfFetch } from "./csrf";

const SET_SPOTS = "spots/setSpots";

const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots,
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/");
    const data = await response.json();
    dispatch(setSpots(data.Spots));
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
        default:
            return state;
    }
}
