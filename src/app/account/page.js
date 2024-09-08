'use client'
import Header from '../_components/_header/header';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import LimitedAccessDiv from '../_components/limited_access';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';

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
                                <div style={{textAlign:'center', paddingBottom: '20px'}}>
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
                                            <Paper sx={{display:'flex', marginTop:'20px', justifyContent:'center', padding: '20px'}}>
                                                <Chip label="Premium Plan" color="success" />
                                            </Paper>
                                        )
                                }
                                <Paper sx={{marginTop: '20px'}}>
                                    <Settings />
                                </Paper>
                            </>
                        )
                    }
              
            </Container>
        </>
    );
}


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Settings(){

    const router = useRouter()

    return(
        <List>
          <ListItem onClick={()=>{router.push('/account/change-password')}} disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <PersonRemoveIcon />
              </ListItemIcon>
              <ListItemText primary="Close Account" />
            </ListItemButton>
          </ListItem>
        </List>
    )
}