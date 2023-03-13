import { csrfFetch } from './csrf';

const SET_SPOT_REVIEWS = 'reviews/setSpotReviews';
const ADD_SPOT_REVIEW = 'reviews/addSpotReview';

const setSpotReviews = (reviews, spotId) => {
    return {
        type: SET_SPOT_REVIEWS,
        spotId: spotId,
        payload: reviews,
    };
};

// const addSpotReview = (review, spotId) => {
//     return {
//         type: ADD_SPOT_REVIEW,
//         spotId: spotId,
//         payload: review,
//     };
// };

export const getReviewsById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(setSpotReviews(data, spotId));
    return response;
};

export const addReview = (spotId, reviewObj) => async (dispatch) => {
    const { review, stars } = reviewObj;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
        }),
    });
    // const data = await response.json();
    dispatch(getReviewsById(spotId));
    return response;
};

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(getReviewsById(spotId));
    return data;
};

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_SPOT_REVIEWS: {
            newState = Object.assign({}, state);
            newState[action.spotId] = action.payload.Reviews;
            return newState;
        }
        case ADD_SPOT_REVIEW: {
            const spotId = action.spotId;
            newState = Object.assign({}, state);
            newState[spotId] = [...newState[spotId], action.payload.review];
            return newState;
        }
        default:
            return state;
    }
}
