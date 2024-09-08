
import { Paper } from "@mui/material"

import toast from "react-hot-toast";

export function LoadingAnimation(){
    return(
        <Paper sx={{padding: '30px'}}>
            <h3
                style={{textAlign:'center'}}
            >
                Loading
            </h3>
        </Paper>
    )
}

export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        toast("Copied to clipboard");
    } catch (err) {
        toast("Failed to copy text: " + err.message);
    }
}
