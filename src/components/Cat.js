import React from 'react';
import './Cat.scss';

import { ImageListItem } from "@material-ui/core";
import Score from './Score';

import './Cats.scss';

const Cat = ({ cat }) => {
    const { allVotes, favourites } = cat;

    return (
        <ImageListItem>
            <div className="container">
                <img
                    srcSet={`${cat.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${cat.url}?w=164&h=164&fit=crop&auto=format`}
                    alt={cat.url}
                    loading="lazy"
                />
            </div>
            <div className="buttonbar">
                <Score catId={cat.id} votes={allVotes} favourite={favourites} />
            </div>
        </ImageListItem>)
}

export default Cat;

