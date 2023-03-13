import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import Reviews from '../Reviews';
import './SpotDetails.css';

export default function SpotDetailsPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    let spotImages;

    const spot = useSelector((state) => state.spots[spotId]);
    const reviews = useSelector((state) => state.reviews[spotId]);

    if (spot) {
        spotImages = spot.Spot_Images;
    }

    useEffect(() => {
        dispatch(spotsActions.getSpotById(spotId)).then(() =>
            setIsLoaded(true)
        );
    }, [dispatch, spotId, reviews]);

    if (!isLoaded) {
        return null;
    }

    const handleClick = (e) => {
        e.preventDefault();
        alert('Feature coming soon!');
    };

    return (
        <div className="spot-details">
            <h1>{spot.name}</h1>
            <h3>
                {spot.city}, {spot.state}, {spot.country}
            </h3>
            <div>
                {spotImages.map((image) => {
                    return (
                        <img
                            src={image.url}
                            key={image.id}
                            alt={image.id}
                            is-preview={image.preview.toString()}
                        ></img>
                    );
                })}
            </div>
            <div>
                <h2>
                    Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                </h2>
                <p>{spot.description}</p>
            </div>
            <div>
                <h2>${spot.price} night</h2>
                <h3>
                    <i className="fa-solid fa-star"></i>{' '}
                    {spot.numReviews > 0
                        ? `${spot.avgStarRating.toFixed(1)} | ${
                              spot.numReviews
                          } review${spot.numReviews === 1 ? '' : 's'}`
                        : 'New'}
                </h3>
                <button type="button" onClick={handleClick}>
                    Reserve
                </button>
            </div>
            <Reviews spot={spot} reviews={reviews} />
        </div>
    );
}
