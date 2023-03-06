import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";

export default function LandingPage() {
    const dispatch = useDispatch();
    const [params, setParams] = useState("");
    useEffect(() => {
        dispatch(spotsActions.getAllSpots());
    }, []);
    const allSpots = useSelector((state) => state.spots.Spots);
    console.log("all the spots");
    console.log(allSpots);
    return (
        <div>
            {allSpots &&
                allSpots.map((spot) => {
                    return <div>{spot.name}</div>;
                })}
        </div>
    );
}
