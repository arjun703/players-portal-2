'use client'
import { useEffect, useState } from "react";
import {LoadingAnimation} from '@/app/_components/utils'
import AdminPanel from "./_admin-panel";
import { pOSTRequest } from "../_components/file_upload";
import { Container, Stack } from "@mui/material";
import { Button } from "@mui/joy";
import toast from "react-hot-toast";
import LoginFormForAdmin from "./login_form_for_admin";

async function checkIfLoggedInAsAdmin(){
    try{
        return false
        let resp = await fetch('/api/admin/check-login-status')
        resp =  await resp.json()
        if(resp.isLoggedInAsAdmin === true){
            return true
        }else{
            return false 
        }
    }catch(error){
        alert(error)
        return false
    }
}


import SimpleBackdrop from "../_components/backdrop";

export default function Admin(){

    const [isLoggedInAsAdmin, setIsLoggedInAsAdmin] = useState(false)
    
    const [isLoading, setIsLoading] = useState(true)

    const onLoggedIn = () => {
        setIsLoggedInAsAdmin(true)
    }

    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                setIsLoading(true);
                const loggedInAsAdmin = await checkIfLoggedInAsAdmin();
                setIsLoggedInAsAdmin(loggedInAsAdmin);
            } catch (error) {
                toast(error);
            } finally {
                console.log("setting false to isLoading")
                setIsLoading(false)
            }
        };

        fetchAdminStatus();
        
    }, []); // Empty dependency array means this runs once on mount.

    if(isLoading){
        
        return(
            <>
                <SimpleBackdrop />
            </>
        )
        
    }

    return(
        <AdminPanel />
    )

    return(
        <>
            {
                isLoggedInAsAdmin ? <AdminPanel /> : <LoginFormForAdmin onLoggedIn={onLoggedIn} />
            }
        </>
    );    
}

