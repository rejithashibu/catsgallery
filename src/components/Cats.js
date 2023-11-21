import * as React from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import './Cats.scss';

import { useDispatch, useSelector } from "react-redux";

import Loader from "./Loader";
import Cat from "./Cat";
import { useUser } from "../utils/user";
import { ImageList } from "@material-ui/core";
import { fetchCats, fetchFavourites, fetchVotes } from "../redux/action-creators";

const Cats = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useUser();
    const { cats, loadedCats, loadedVotes, loadedFavourites } = useSelector(state => state.cats);

    useEffect(() => {
        dispatch(fetchCats());
    }, [dispatch]);

    useEffect(() => {
        if (loadedCats && !loadedVotes) dispatch(fetchVotes());
    }, [loadedCats, loadedVotes, dispatch]);

    useEffect(() => {
        if (loadedVotes && !loadedFavourites) dispatch(fetchFavourites(user));
    }, [loadedVotes, loadedFavourites, dispatch, user]);

    if (!cats || !loadedVotes) return <Loader />;

    return (
        <div className="paper">
            <button className="uploadbutton button" onClick={() => history.push('/upload')}>Upload New Cat Image</button>
            <ImageList>
                {cats.map((item) => {
                    return <div className="container2">
                        <Cat cat={item} gap={8} /></div>
                })}
            </ImageList>

        </div>
    )
}

export default Cats;