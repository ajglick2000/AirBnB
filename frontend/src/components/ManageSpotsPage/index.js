import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

export default function ManageSpotsPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.getSessionSpots());
    }, [dispatch]);
    const userSpots = useSelector((state) => state.spots.Spots);

    if (!userSpots) {
        return null;
    }

    return (
        <div>
            <h1>Manage Spots</h1>
            <NavLink exact to="/spots/new">
                <button type="button">Create a New Spot</button>
            </NavLink>
            <div id="spots">
                {userSpots.map((spot) => {
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
                            <NavLink
                                to={{
                                    pathname: `/spots/${spot.id}/edit`,
                                    state: { spot },
                                }}
                            >
                                <button type="button">Update</button>
                            </NavLink>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={
                                    <DeleteSpotModal spotId={spot.id} />
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
