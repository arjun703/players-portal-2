import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { Paper } from "@mui/material";
import Alert from '@mui/material/Alert';

export default function ContactFormSubmissions(){
    return(
        <>
            <Paper sx={{p: 2}}>
                <Alert severity="info">Contact form submissions will appear here, yet to work on.</Alert>
            </Paper>
        </>
    )
}