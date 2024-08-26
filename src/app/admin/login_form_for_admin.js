import { useEffect, useState} from "react";
import {LoadingAnimation} from '@/app/_components/utils'
import { pOSTRequest } from "../_components/file_upload";
import { Container, Stack, Paper, TextField } from "@mui/material";
import { Button } from "@mui/joy";
import toast from "react-hot-toast";

function LoginFormForAdmin({onLoggedIn}){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        try{
            const formData = new FormData();
            setIsLoading(true)
            formData.append('username', username);
            formData.append('password', password);
            const result = await pOSTRequest(formData, 'api/admin/login/')
            toast(result.msg)
            if (result.success === true) {
                onLoggedIn()
            } 
        }catch(error){
            toast(error)
        }finally{
            setIsLoading(false)
        }
    }

    return(
        
        <Container sx={{marginTop: {md: '50px', xs: '20px'}}} maxWidth={'sm'}>
            <h3 style={{textAlign:'center'}}>Admin Login Portal</h3>
            <Paper sx={{padding: {xs: '10px', md: '30px'}}}>
                <Stack spacing={2}>
                    <TextField  label="username" variant="outlined" onChange={(e) => setUsername(e.target.value.trim())} fullWidth  />
                    <TextField  label="password" variant="outlined" onChange={(e) => setPassword(e.target.value.trim())} fullWidth  />
                    <Button onClick={handleLogin} loading={isLoading} variant="solid">Login</Button>
                </Stack>
            </Paper>
        </Container>
    );
}

export default LoginFormForAdmin;