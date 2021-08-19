import React, {useState} from 'react';
import {UploadText} from "../Services/ApiService";
import {makeStyles} from "@material-ui/core/styles";
import { toast, ToastContainer } from 'react-toastify';

interface ITextInputComponent {
    contentValue?: string;
    fileName?: string;
}

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

const TextInputComponent = (props: ITextInputComponent) => {
    const [contentValue, setContentValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [changed, setChanged] = useState(false);

    const classes = useStyles();

    if (!changed && props.contentValue && contentValue === '') {
        console.log("Content Value: ", props.contentValue)
        setContentValue(props.contentValue);
    }
    if (!changed && props.fileName && fileName === '') {
        console.log("File Name: ", props.fileName)
        setFileName(props.fileName);
    }

    const handleContentChange = (event: any) => {
        console.log("Handling Content")
        setChanged(true);
        setContentValue(event.target.value);
    }

    const handleFileName = (event: any) => {
        console.log("Handling Name")
        setChanged(true);
        setFileName(event.target.value);
    }

    const handleSubmit = () => {
        console.log("Handling Submit")
            UploadText(fileName, contentValue).then((response) => {
                if(response){
                    toast.success("File Content Uploaded Successfully",{
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setContentValue('');
                    setFileName('');
                }
                else{
                    toast.error("Error Occurred While Uploading File Content",{
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            }).catch(error => {
                toast.error("Error Occurred While Uploading File Content",{
                    position: toast.POSITION.BOTTOM_CENTER
                })     
            });
    }

    return (
        <div>
            <div>
                <div className={classes.mainTitle}>
                    Text Editor
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
                    <textarea value={contentValue} onChange={handleContentChange} cols={100} rows={10}/>
                </label>
                <br/>
                <br/>
                <button className={classes.row} onClick={handleSubmit}>Upload</button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default TextInputComponent;