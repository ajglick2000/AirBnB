import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SpotDetailsPage from './components/SpotDetailsPage';
import CreateSpotPage from './components/CreateSpotPage';
import ManageSpotsPage from './components/ManageSpotsPage';
import UpdateSpotPage from './components/UpdateSpotPage';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route path="/spots/new">
                        <CreateSpotPage />
                    </Route>
                    <Route path="/spots/current">
                        <ManageSpotsPage />
                    </Route>
                    <Route path="/spots/:spotId/edit">
                        <UpdateSpotPage />
                    </Route>
                    <Route path="/spots/:spotId">
                        <SpotDetailsPage />
                    </Route>
                    <Route path="/">
                        <LandingPage />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
