'use client'
import Header from '../../_components/_header/header';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import { TextField, Stack } from '@mui/material';
import Button from '@mui/joy/Button';
import { pOSTRequest } from '@/app/_components/file_upload';
import { toast } from 'react-hot-toast';

import {Alert} from '@mui/material';
export default function Dashboard() {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleChangePasswordBtnClick = async () => {
        
        const formData = new FormData();
        if(currentPassword.trim().length > 0 && newPassword.trim().length > 0 && (newPassword.trim() === confirmNewPassword.trim())){
            const formData = new FormData()
            formData.append('current_password', currentPassword)
            formData.append('new_password', newPassword)
            try{
                setLoading(true)
                const response = await pOSTRequest(formData, '/api/account/change-password')
                toast(response.msg)
            }catch(error){
                toast(error)
            }finally{
                setLoading(false)
            }
        }else{
            toast("Password confirmation error")
        }        
    }

    return (
        <>
            <Header  user={true} />
            <Container sx={{marginTop: '30px'}} maxWidth="sm">
                <Paper sx={{padding: '20px'}}>
                    <Stack spacing={2}>
                        <Alert severity='info'>Please fillup following form to change password.</Alert>
                        <TextField onChange={(e)=>setCurrentPassword(e.target.value.trim())}  type="password" label="Current Password" variant="outlined"  fullWidth  />
                        <TextField onChange={(e) => setNewPassword(e.target.value.trim())}  label="New Password" variant="outlined" type="password"  fullWidth  />                                        
                        <TextField onChange={(e) => setConfirmNewPassword(e.target.value.trim())}  label="Confirm New Password" variant="outlined" type="password"  fullWidth  />                                        
                        <Divider/>
                        <Button onClick={handleChangePasswordBtnClick} loading={loading} variant='outlined' fullWidth>Change Password</Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}