import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews';
import './PostReviewForm.css';

export default function PostReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        setCanSubmit(review.length >= 10 && stars);
    }, [review, stars]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(reviewsActions.addReview(spotId, { review, stars }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..."
                    required
                />
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <i
                                id="submit-review-button"
                                type="button"
                                key={index}
                                className={`${
                                    index <= stars ? 'fa-solid' : 'fa-regular'
                                } star fa-star`}
                                onClick={() => setStars(index)}
                            ></i>
                        );
                    })}{' '}
                    Stars
                </div>
                <button type="submit" disabled={!canSubmit}>
                    Submit Your Review
                </button>
            </form>
        </>
    );
}
