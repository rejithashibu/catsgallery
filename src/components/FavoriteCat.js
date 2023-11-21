
import { useState, useEffect } from "react";
import { useUser } from "../utils/user";
import { IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { actionCreators } from "../redux";

const FavoriteCat = ({ catId, favourite }) => {
    const [checked, setChecked] = useState(!!favourite);
    const user = useUser();
    const dispatch = useDispatch();
    const { makeFavourite, makeUnFavourite } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        setChecked(!!favourite);
    }, [favourite]);

    const handleClick = async () => {
        setChecked(!checked);
        if (checked) {
            makeUnFavourite(favourite.id)
        } else if (!checked) {
            makeFavourite(catId, user)
        }
    };

    return (
        <IconButton onClick={() => handleClick()} >
            {
                checked ? (
                    <Favorite style={{ color: 'red' }} />
                ) : (
                        <FavoriteBorderIcon style={{ color: 'white' }} />
                    )
            }
        </IconButton>
    );
};

export default FavoriteCat;
