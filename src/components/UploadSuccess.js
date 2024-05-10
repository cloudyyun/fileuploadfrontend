import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userpool from '../userpool'
import { logout } from '../services/authenticate';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home';
import "./App.css";
import axios from "axios";

function UploadSuccess() {



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
            <div className="UploadSuccess">
                <h2>Successfully Uploaded
                </h2>
                <a href="https://yun-us-east-1.my.connect.aws">Access to Amazon Connect Demo Page</a>
            </div>
        </div>

    )

}

export default UploadSuccess;