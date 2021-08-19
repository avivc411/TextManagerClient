import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";

interface IListRowComponent{
    name : string;
    handleEdit : any;
    handleDelete : any;
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
    wrapper:{
        backgroundColor:"#eceff1",
    },
}));

const ListRowComponent = (props : IListRowComponent) => {
    const classes = useStyles();

    return (
        <div>

            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.title}>
                        {props.name}
                    </div>
                </div>
                <div className={classes.title} onClick={()=>props.handleEdit(props.name)}>
                    Edit
                </div>
                <Divider/>
                <div className={classes.title} onClick={()=>props.handleDelete(props.name)}>
                    Delete
                </div>
            </div>
        </div>
    );
};

export default ListRowComponent;