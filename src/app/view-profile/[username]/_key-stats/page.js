import { Paper, Stack, Container } from "@mui/material"
import { useState, useEffect } from "react";
import ViewKeyStats from "./view-key-stats";
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';

import LimitedAccessDiv from "@/app/_components/limited_access";

export default function KeyStats({username}){

    const [keyStat, setKeyStat] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editable, setEditable] = useState(false)
    const [limitedAccess, setLimitedAccess] = useState(false)

    useEffect(() => {
        async function fetchKeyStats() {
            try {
                const data = await getRequest('/api/key-stats?username='+username); // Adjust the API endpoint URL as needed
                setIsLoading(false)
                setKeyStat(data.keystat)
                setEditable(data.editable)
                setLimitedAccess(data.limitedAccess)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchKeyStats();
    }, []);

    return(
        <> {
            isLoading ? (
                <>
                    <Paper sx={{textAlign:'center', padding: '30px'}}>
                        Loading
                    </Paper>
                </>
            ): (
                <Stack spacing={2}>
                    {
                        limitedAccess 
                            ? <LimitedAccessDiv accessibleAfterPremium={'Get access to key athletic stats with premium'} /> 
                            : <ViewKeyStats editable={editable} keyStat={keyStat} />
                    }
                </Stack> 
            )
        }
        </>
    )
}