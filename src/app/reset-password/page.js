'use client'
import Header from "../_components/_header/header";
import { Container } from "@mui/material";
import EmailForm from "./email_form";
import {Paper} from "@mui/material";

export default function ResetPassword(){
    return(
        <>
            <Header />
            <Container maxWidth={'sm'}>
                <Paper sx={{marginTop: {xs: '20px', md: '50px'}, padding: '20px' }}>
                    <EmailForm />
                </Paper>
            </Container>
        </>
    )
}