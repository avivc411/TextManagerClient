import React from 'react';
import BasicCard from "../Components/BasicCard";
import {RouteNames} from "../App";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper:{
        display:"flex",
        paddingLeft:"15%",
    },
    mainTitle:{
        margin: "auto",
        fontSize:"30px",
        width: "25%",
        padding: "40px",
    },
}));

const TextManagerView = () => {
    const classes = useStyles();

    return (
    <div>
        <div className={classes.mainTitle}>
            Files System
        </div>
        <div className={classes.wrapper}>
            <BasicCard
                text={"All Files"}
                navigateTo={RouteNames.FilesList}
                icon={<VisibilityIcon/>}
            />
            <BasicCard
                text={"Text Editor"}
                navigateTo={RouteNames.TextInput}
                icon={<MessageIcon/>}
            />
            <BasicCard
                text={"File Upload"}
                navigateTo={RouteNames.FileUpload}
                icon={<AttachFileIcon/>}
            />
        </div>
    </div>
    );
};

export default TextManagerView;