import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';


interface IBasicCardProps {
    text: string;
    navigateTo: string;
    icon?: any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "250px",
        height: "170px",
        margin: "20px",
        cursor: "pointer ",
        border: "1px solid #D6D6D6",
        borderRadius: "2px",
    },
    title: {
        width: "50%",
        height: "auto",
        margin: "0 auto",
        padding: "15px",
        position: "relative",
    },
    wrapper: {
        backgroundColor: "#eceff1",
    },
    icon: {
        position: "relative",
        top: "25%",
        left: "45%",
    },
}));

const BasicCard = (props: IBasicCardProps) => {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = () => {
        history.push(props.navigateTo);
    };

    return (
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    {props.text}
                </div>
                <Divider/>
            </div>
            {props.icon &&
            (<div className={classes.icon}>
                {props.icon}
            </div>)}
        </div>
    );
};

export default BasicCard;