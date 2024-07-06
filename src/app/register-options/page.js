'use client'
import React from 'react';
import { Grid, Button, Typography, Container } from '@mui/material';
import Header from '@/app/_components/_header/header';
import Link from 'next/link';

const Profiles = () => {
  return (
    <>
        <Header user={false} />
        <Grid container spacing={2} style={{ height: '100vh' }}>
            {/* Left part */}
            <Grid item xs={12} md={4} style={{ backgroundColor: '#123456', textAlign:'center', display:'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <Typography variant="h3" style={{ color: 'white' }}>Profiles</Typography>
                    <Typography variant="h6" style={{ color: 'white', marginTop: '30px' }}>Choose a profile to continue</Typography>
                </div>
            </Grid>
            
            {/* Right part */}
            <Grid item xs={12} md={8}  container  justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                    <Link href={'/register'}>
                        <Button sx={{p: 3, width:'100%'}} variant="contained" color="primary">Athlete</Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Link href={'/coach-register'}>
                        <Button  sx={{p: 3, width: '100%'}} variant="contained" color="primary">Coach</Button>
                    </Link>
                </Grid>
                <Grid item  xs={12} md={4}>
                    <Link href={'/ctu-register'}>
                        <Button  sx={{p: 3, width:'100%'}} variant="contained" color="primary">Club/Team</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    </>
  );
};

export default Profiles;
