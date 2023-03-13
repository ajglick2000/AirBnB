import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import './Landing.css';

export default function LandingPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.getAllSpots());
    }, [dispatch]);
    const allSpots = useSelector((state) => state.spots.Spots);

    if (!allSpots) {
        return null;
    }

    return (
        <div id="spots">
            {allSpots.map((spot) => {
                return (
                    <div
                        className="spot"
                        key={`spot-${spot.id}`}
                        title={spot.name}
                    >
                        <NavLink to={`/spots/${spot.id}`}>
                            <div id={`spot-${spot.id}`}>
                                <img
                                    src={spot.previewImage}
                                    alt={spot.name}
                                ></img>
                                <div>
                                    <span>{`${spot.city}, ${spot.state}`}</span>
                                    <span>{`$${spot.price} night`}</span>
                                </div>
                                <div>
                                    <span>
                                        <i className="fa-solid fa-star"></i>{' '}
                                        {spot.avgRating
                                            ? spot.avgRating.toFixed(1)
                                            : 'New'}
                                    </span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
}
