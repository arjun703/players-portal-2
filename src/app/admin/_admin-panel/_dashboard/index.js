import DashboardGraphs from "./_graphs"

import Alert from '@mui/material/Alert';
import { Paper } from "@mui/material";

export default function Dashboard(){
    return(
        <>
            <Paper sx={{p: 2}}>
                <Alert severity="error">****   All data are <b>Fake</b>    ****</Alert>
            </Paper>
            <DashboardGraphs />
        </>
    )    
}