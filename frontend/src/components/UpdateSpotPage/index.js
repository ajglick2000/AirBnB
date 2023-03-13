import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import './UpdateSpot.css';

export default function UpdateSpotPage(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const spot = location.state.spot;

    useEffect(() => {
        dispatch(spotActions.getSpotById(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    // eslint-disable-next-line
    const [lat, setLat] = useState(spot.lat);
    // eslint-disable-next-line
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);

    const [errors, setErrors] = useState([]);

    if (!isLoaded) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let data;
        let response;
        try {
            response = await dispatch(
                spotActions.updateSpot({
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
                })
            );
            const newSpotId = await response.id;

            history.push(`/spots/${newSpotId}`);
            return response;
        } catch (res) {
            data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }

        // console.log(response);
        // .then(async (res) => {
        //     data = await res.json();
        //     console.log('made it here');
        //     history.push(`/spots/${data.id}`);
        //     return res;
        // })
        // .catch(async (res) => {
        //     // console.log(res);
        //     data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });

        // return response.json();
    };

    return (
        <div className="form">
            <h1>Update your Spot</h1>
            <form onSubmit={handleSubmit}>
                <div id="spot-location">
                    <h2>Where's your place located?</h2>
                    <p>
                        Guests will only get your exact address once they booked
                        a reservation.
                    </p>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Country
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Street Address
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <div>
                        <label>
                            City
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </label>
                        ,
                        <label>
                            State
                            <input
                                type="text"
                                placeholder="STATE"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    {/* <div>
                        <label>
                            Latitude
                            <input
                                type="text"
                                placeholder="Latitude"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                required
                            />
                        </label>
                        ,
                        <label>
                            Longitude
                            <input
                                type="text"
                                placeholder="Longitude"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                                required
                            />
                        </label>
                    </div> */}
                </div>
                <div id="spot-description">
                    <h2>Describe your place to guests</h2>
                    <p>
                        Mention the best features of your space, any special
                        amentities like fast wif or parking, and what you love
                        about the neighborhood.
                    </p>
                    <label>
                        <input
                            type="text"
                            placeholder="Please write at least 30 characters"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minLength="30"
                            required
                        />
                    </label>
                </div>
                <div id="spot-name">
                    <h2>Create a title for your spot</h2>
                    <p>
                        Catch guests' attention with a spot title that
                        highlights what makes your place special.
                    </p>
                    <label>
                        <input
                            type="text"
                            placeholder="Name of your spot"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div id="spot-price">
                    <h2>Set a base price for your spot</h2>
                    <p>
                        Competitive pricing can help your listing stand out and
                        rank higher in search results.
                    </p>
                    <label>
                        $
                        <input
                            type="number"
                            placeholder="Price per night (USD)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}
