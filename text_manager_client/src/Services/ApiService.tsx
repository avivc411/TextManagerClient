import axios from 'axios';

//take from vault
const serverUrl : string = "https://localhost:5001";
const chunkSize = 1048576;

const UploadText = (name : string, content : string) => {
    console.log(`Uploading Text For ${name}`);
    return axios.post(`${serverUrl}/TextInput`, {name, content})
        .then((response)=>{
            if(response.status === 200)
                return true; //alert success
            return false;
        })
        .catch((error)=>{
            console.log(error);
            return false; //alert fail
        });
}

const UploadFile = (name : string, file : any) => {
    if(file.size < chunkSize)
        return uploadSmallFile(name, file);
    return UploadBigFile(name, file);
}

const UploadBigFile = async (name: string, file: any) => {
    const chunks = Math.ceil(file.size / chunkSize);
    console.log(`UploadBigFile Num Of Chunks: ${chunks}`)
    let items = [];
    for (let i = 0, j = 0; i < chunks; i++, j += chunkSize) {
        items.push(file.slice(j, j + chunkSize));
    }

    return Promise.all(items.map(async (slice) => {
        let data = new FormData();
        data.append('file', slice);
        data.append('name', name);
        await axios.post(`${serverUrl}/FileChunk`, data);
    })).then(value => {
        axios.post(`${serverUrl}/CompleteUpload/${name}/${chunks}`)
            .then((response) => {
                if (response.status === 200)
                    return true; //alert success
                return false;
            })
            .catch((error) => {
                console.log(error);
                return false; //alert fail
            });
    });
}

const uploadSmallFile = (name : string, content : any)=>{
    let data = new FormData();
    data.append('file', content);
    data.append('name', name);
    return axios.post(`${serverUrl}/SmallFile`, data)
    .then((response)=>{
        if(response.status === 200)
            return true; //alert success
        return false;
    })
    .catch((error)=>{
        console.log(error);
        return false; //alert fail
    });
}

const GetFiles = () =>{
    return axios.get(`${serverUrl}/AllFiles`);
}

const GetFile = (name : string) =>{
    return axios.get(`${serverUrl}/File/${name}`);
}

const DeleteFile = (name : string) =>{
    return axios.delete(`${serverUrl}/DeleteFile/${name}`)
}

export {UploadText, UploadFile, GetFiles, GetFile, DeleteFile}