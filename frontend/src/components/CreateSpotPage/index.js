import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';

export default function CreateSpotPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    // eslint-disable-next-line
    const [lat, setLat] = useState(1);
    // eslint-disable-next-line
    const [lng, setLng] = useState(1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let data;
        let response;
        try {
            response = await dispatch(
                spotActions.createSpot({
                    address,
                    city,
                    state,
                    country,
                    lat,
                    lng,
                    name,
                    description,
                    price,
                })
            );
            const newSpotId = await response.id;
            const addImage = async (imageUrl, preview = false) => {
                return await dispatch(
                    spotActions.addImageToSpot(newSpotId, imageUrl, preview)
                );
            };
            addImage(previewImage, true);
            const images = [image1, image2, image3, image4];
            for (const imageUrl of images) {
                if (imageUrl) {
                    addImage(imageUrl);
                }
            }

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
        <>
            <h1>Create a new Spot</h1>
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
                <div id="spot-images">
                    <h2>Liven up your spot with photos</h2>
                    <p>
                        Submit a link to at least one photo to publish your
                        spot.
                    </p>
                    <label>
                        <input
                            type="url"
                            placeholder="Preview Image URL"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                        ></input>
                    </label>
                    <label>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={image1}
                            onChange={(e) => setImage1(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={image4}
                            onChange={(e) => setImage4(e.target.value)}
                        ></input>
                    </label>
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </>
    );
}
