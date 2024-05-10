import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userpool from '../userpool'
import { logout } from '../services/authenticate';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home';
import "./App.css";
import axios from "axios";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // API Gateway url to invoke function to generate presigned url
    const API_ENDPOINT = "https://9sxs7yu1ca.execute-api.us-east-1.amazonaws.com/default/ConnectQPresignedURL";

    // Function to generate the presigned url
    const getPresignedUrl = async () => {
        console.log(selectedFile)
        // GET request: presigned URL
        const response = await axios({
            method: "GET",
            url: API_ENDPOINT + '?filename=' + selectedFile.name,
        });
        const presignedUrl = response.data.presignedUrl;
        console.log(presignedUrl);
        return presignedUrl;
    };

    // Function to upload the selected file using the generated presigned url
    const uploadToPresignedUrl = async (presignedUrl) => {
        // Upload file to pre-signed URL
        const uploadResponse = await axios.put(presignedUrl, selectedFile, {
            headers: {
                "Content-Type": "application/pdf",
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
                console.log(`Upload Progress: ${percentCompleted}%`);
            },
        });
        Navigate('/uploadsuccess');
        console.log(uploadResponse);
    };

    // Function to orchestrate the upload process
    const handleUpload = async () => {
        try {
            // Ensure a file is selected
            if (!selectedFile) {
                console.error("No file selected.");
                return;
            }

            const presignedUrl = await getPresignedUrl();
            uploadToPresignedUrl(presignedUrl);
        } catch (error) {
            // Handle error
            console.error("Error uploading file:", error);
        }
    };


    const Navigate = useNavigate();

    useEffect(() => {
        let user = userpool.getCurrentUser();
        console.log(user);
        if (!user) {
            Navigate('/login');
        }
    }, []);

    const handleLogoout = () => {
        logout();

    };


    return (
        <div className='Dashboard'>
            <Button
                style={{ margin: "10px" }}
                variant='contained'
                onClick={handleLogoout}
            >
                Logout
            </Button>
            <div className="App">
                <h1>File Selection Component</h1>
                <input type="file" accept=".pdf,.docx,.html" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>

    )

}

export default App;