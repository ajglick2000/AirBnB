import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewActions from '../../store/reviews';

export default function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(reviewActions.deleteReview(reviewId, spotId));
        closeModal();
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button type="button" onClick={deleteReview}>
                {'Yes (Delete Review)'}
            </button>
            <button type="button" onClick={closeModal}>
                {'No (Keep Review)'}
            </button>
        </div>
    );
}
