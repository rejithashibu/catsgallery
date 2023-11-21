
import { useState, useEffect } from "react";
import { useUser } from "../utils/user";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "../redux";
import FavoriteCat from "./FavoriteCat";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Score = ({ catId, votes, favourite }) => {
    const user = useUser();
    const dispatch = useDispatch();
    const { voteUp, voteDown } = bindActionCreators(actionCreators, dispatch);

    const [score, setScore] = useState(0);
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        const thumbsUpVotes = votes?.filter((x) => x.value === 1).length;
        const thumbsDownVotes = votes?.filter((x) => x.value === 0).length;

        setScore(thumbsUpVotes - thumbsDownVotes);

        if (votes.some((x) => x.sub_id === user)) {
            setDisabled(true);
        }
    }, [votes, user]);

    const handleClick = (isVoteUp) => {
        setDisabled(true);
        if (isVoteUp === false) {
            voteDown(catId, 0, user);
            setScore(score - 1);
        } else {
            voteUp(catId, 1, user);
            setScore(score + 1);
        }
    };

    return (
        <>
            <IconButton
                onClick={() => handleClick(false)}
                disabled={disabled}
            >
                <ThumbDownIcon style={{ color: 'beige' }} />
            </IconButton>
            <span className="votetext">
                Votes: {score}
            </span>
            <IconButton
                onClick={() => handleClick(true)}
                disabled={disabled}>
                <ThumbUpIcon style={{ color: 'beige' }} />
            </IconButton>
            <FavoriteCat catId={catId} favourite={favourite} />
        </>
    );
};

export default Score;
