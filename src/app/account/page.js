'use client'
import Header from '../_components/_header/header';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import LimitedAccessDiv from '../_components/limited_access';

export default function Dashboard() {

    const [limitedAccess, setLimitedAccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchAccountInfo() {
            try {
                setIsLoading(true)
                const response = await fetch('/api/account'); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setLimitedAccess(data.limitedAccess)
            } catch (error) {
                alert( error.message)
            }finally{
                setIsLoading(false)
            }
        }
        fetchAccountInfo();
    }, []); 

    return (
        <>
            <Header  user={true} />
            <Container sx={{marginTop: '30px'}} maxWidth="md">
                
                    {
                        isLoading ? (
                            <Paper sx={{paddingTop: {md: '50px', xs: '30px'}, paddingBottom: '20px' }}>
                                <div style={{textAlign:'center'}}>
                                    Loading
                                </div>
                            </Paper>
                        ): (
                            <>
                                {
                                    limitedAccess 
                                        ? (
                                            <>
                                                <Paper sx={{display:'flex', justifyContent:'center', padding: '20px'}}>
                                                    <Chip label="Free Plan" color="success" variant='outlined' />
                                                </Paper>
                                                <LimitedAccessDiv accessibleAfterPremium={'Unlock everything with premium.'} />
                                            </>
                                        )
                                        : (
                                            <Paper sx={{display:'flex', justifyContent:'center', padding: '20px'}}>
                                                <Chip label="Premium Plan" color="success" />
                                            </Paper>
                                        )
                                }
                            </>
                        )
                    }
              
            </Container>
        </>
    );
}

