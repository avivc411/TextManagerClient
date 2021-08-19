import React, {useEffect, useState} from 'react';
import TextInputComponent from "../Components/TextInputComponent";
import {GetFile} from "../Services/ApiService";
import {useLocation} from "react-router";
import {toast, ToastContainer} from 'react-toastify';

const FileContentView = () => {
    const location = useLocation();
    const name = location.pathname.split("/")[2];
    const [contentValue, setContentValue] = useState('');

    useEffect(() => {
        GetFile(name)
            .then((response) => {
                if (response.status === 200) {
                    setContentValue(response.data);
                    toast.success("File Content Fetched Successfully", {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                } else
                    toast.error(`Error Occurred While Fetching File Content`, {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            })
            .catch((error) => {
                toast.error(`Error Occurred While Fetching File Content`, {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            });
    })

    return (
        <div>
            <TextInputComponent fileName={name} contentValue={contentValue}/>
            <ToastContainer/>
        </div>
    );
};

export default FileContentView;