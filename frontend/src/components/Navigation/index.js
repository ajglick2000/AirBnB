import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </li>
        );
    }

    return (
        <ul className="navbar">
            <li className="logo-container">
                <NavLink exact to="/">
                    <img
                        className="logo"
                        src="https://seeklogo.com/images/A/airbnb-logo-7F4086530F-seeklogo.com.png"
                        alt="logo"
                    ></img>
                </NavLink>
            </li>
            <li>
                {sessionUser && (
                    <li>
                        <NavLink exact to="/spots/new">
                            Create a New Spot
                        </NavLink>
                    </li>
                )}
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
