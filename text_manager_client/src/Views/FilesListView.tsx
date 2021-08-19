import React, {useEffect, useState} from 'react';
import {DeleteFile, GetFiles} from "../Services/ApiService";
import ListRowComponent from "../Components/ListRowComponent";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../App";
import { toast, ToastContainer } from 'react-toastify';

const FilesListView = () => {
    const history = useHistory();
    const [filesList, setFiles] = useState([]);

    useEffect(() => {
        console.log("FilesListView using effect")
        GetFiles()
            .then(response => {
                console.log("FilesListView response")
                if(response.status === 200) {
                    console.log("FilesListView Setting Files")
                    toast.success("Files Fetched successfully",{
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setFiles(response.data);
                }
                else
                    toast.error(`Error Occurred While Fetching Files`,{
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            })
            .catch(error => {
                toast.error("Error Occurred While Fetching Files",{
                    position: toast.POSITION.BOTTOM_CENTER
                })
            })
    }, []);

    const handleEdit = (name : string) => {
        console.log("Editing ", name);
        const route = `${RouteNames.FileContentView}/${name}`;
        console.log(route)
        history.push(route);
    }

    const handleDelete = (name : string) => {
        console.log("Deleting ", name);
        debugger
        DeleteFile(name)
            .then(response =>{
                GetFiles()
                    .then(response => {
                        if(response.status === 200) {
                            console.log("FilesListView setting Files")
                            setFiles(response.data);
                        }
                    })
            })
    }

    return (
        <div>
            {filesList?.map((file: any) => {
                return (<ListRowComponent name={file} handleEdit={handleEdit} handleDelete={handleDelete}/>);
            })}
            <ToastContainer />
        </div>
    );
};

export default FilesListView;