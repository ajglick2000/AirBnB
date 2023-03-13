import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import PostReviewFormModal from '../PostReviewFormModal';

export default function Reviews(props) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    const { spot, reviews } = props;

    useEffect(() => {
        dispatch(reviewsActions.getReviewsById(spot.id)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, spot.id]);

    if (!isLoaded) {
        return null;
    }

    reviews.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const showButton =
        sessionUser &&
        spot.Owner.id !== sessionUser.id &&
        !reviews.reduce(
            (prev, curr) => (prev = prev || curr.userId === sessionUser.id),
            false
        );

    return (
        <div>
            <h2>
                <i className="fa-solid fa-star"></i>{' '}
                {spot.numReviews > 0
                    ? `${spot.avgStarRating.toFixed(1)} | ${
                          spot.numReviews
                      } review${spot.numReviews === 1 ? '' : 's'}`
                    : 'New'}
            </h2>
            {showButton && (
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReviewFormModal spotId={spot.id} />}
                />
            )}
            {reviews.length > 0 ? (
                reviews.map((review) => {
                    return (
                        <div key={review.id}>
                            <h3>{review.User.firstName}</h3>
                            <h4>{new Date(review.createdAt).toDateString()}</h4>
                            <p>{review.review}</p>
                            {sessionUser &&
                            review.User.id === sessionUser.id ? (
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={
                                        <DeleteReviewModal
                                            reviewId={review.id}
                                            spotId={spot.id}
                                        />
                                    }
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    );
                })
            ) : sessionUser && sessionUser.id !== spot.Owner.id ? (
                <p>Be the first to post a review!</p>
            ) : (
                <p>No reviews</p>
            )}
        </div>
    );
}
