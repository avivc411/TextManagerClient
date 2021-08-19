import React, {useState} from 'react';
import {UploadFile} from "../Services/ApiService";
import {makeStyles} from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        paddingLeft: "15%",
    },
    mainTitle: {
        margin: "auto",
        fontSize: "30px",
        width: "25%",
        padding: "40px",
    },
    row: {
        position: "relative",
        top: "25%",
        left: "30%",
    }
}));

const FileInputComponent = () => {
    const [contentValue, setContentValue] = useState(null);
    const [fileName, setFileName] = useState('');
    const classes = useStyles();

    const handleContentChange = (event: any) => {
        setContentValue(event.target.files[0]);
    }

    const handleFileName = (event: any) => {
        setFileName(event.target.value);
    }

    const handleSubmit = () => {
        try{
            UploadFile(fileName, contentValue)
                .then(response=>{
                    if(response){
                        toast.success("File Uploaded Successfully",{
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                    }
                    else{
                        toast.error("Error Occurred While Uploading File",{
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                    }
                })
        }catch(e){
            toast.error("Error Occurred While Uploading File", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    }

    return (
        <div>
            <div className={classes.mainTitle}>
                Upload File
            </div>
            <label className={classes.row}>
                File Name:
                <br/>
                <input type="text" value={fileName} onChange={handleFileName}/>
            </label>
            <br/>
            <br/>
            <label className={classes.row}>
                Content:
                <br/>
                <input type="file" accept=".txt" onChange={handleContentChange}/>
            </label>
            <br/>
            <br/>
            <button className={classes.row} onClick={handleSubmit}>Upload</button>
            <ToastContainer />
        </div>
    );
};

export default FileInputComponent;