import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spots';

export default function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(spotActions.deleteSpot(spotId));
        closeModal();
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button type="button" onClick={deleteSpot}>
                {'Yes (Delete Spot)'}
            </button>
            <button type="button" onClick={closeModal}>
                {'No (Keep Spot)'}
            </button>
        </div>
    );
}
