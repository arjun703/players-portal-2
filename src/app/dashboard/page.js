'use client'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link'
import Header from '../_components/_header/header';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Post from '../_components/post';
import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import { setLazyProp } from 'next/dist/server/api-utils';
import { setgid } from 'process';
import ProfilePictureModal from '@/app/_components/_profile_photo_upload'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {

  const [dashboardInfo, setDashboardInfo] =  useState({})
  const [loading, setIsLoading] = useState(true)
  const [grids, setGrids] = useState([])
  useEffect(() => {
    async function fetchDashboard() {
        try {
            const response = await fetch('/api/dashboard'); // Adjust the API endpoint URL as needed
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            const users = data.user
            const user = users[0]
            setDashboardInfo(user);
            setGrids([
              {label: 'Videos', count: user.total_videos},
              {label: 'Teams', count: user.total_teams},
              {label: 'Coaches', count: user.total_coaches},
              {label: 'Trainings', count: user.total_trainings},
              {label: 'Additional Sports', count: user.total_additional_sports},
              {label: 'Education Info', count: user.total_education_info},
              {label: 'Press or Interviews', count: user.total_press_or_interviews},
            ])
        } catch (error) {
            alert( error.message)
        }finally{
          setIsLoading(false)
        }
    }
    fetchDashboard();
  }, [modalOpen]); 

  const [modalOpen, setModalOpen]  = useState(false)
  const handleProfilePicUploadModalClose = () => {
    setModalOpen(!modalOpen)

  }

  return (
    <>
      <Header  user={true} />
      <Container sx={{marginTop: '30px'}} maxWidth="md">
        <Paper sx={{paddingTop: {md: '50px', xs: '30px'}, paddingBottom: '20px' }}>
          {
            loading ? (
                <div style={{textAlign:'center'}}>
                  Loading
                </div>
            ): (
              <>
                {
                  modalOpen && (
                    <ProfilePictureModal onClose={handleProfilePicUploadModalClose} existingProfileImageLink={
                      dashboardInfo.profile_pic != null? '/files/'+dashboardInfo.profile_pic:false
                    } />
                  )
                }
                <div className="avatar-name justify-content-between d-flex align-items-center" >
                  <div onClick={handleProfilePicUploadModalClose} style={{ display:'flex', justifyContent:'center'}}>
                    <div style={{cursor: 'pointer', position:'relative'}}>
                      <Avatar
                        alt={dashboardInfo.name}
                        src={dashboardInfo.profile_pic != null ? '/files/'+dashboardInfo.profile_pic : ''}
                        sx={{ width: {md:  80, xs: 80} , height:{md: 80, xs: 80}  }}
                      >
                      </Avatar>
                      <PhotoCameraIcon sx={{position: 'absolute', fontSize: '15px', color:'white', background:'black', padding: '5px', borderRadius: '50%', bottom: '10px', right: '-5px' }} />
                    </div>
                  </div>

                  <div style={{textAlign:'center', marginTop: '-15px'}}>
                    <h1>Welcome, {dashboardInfo?.name.split(' ')[0]}</h1>
                  </div>
                  <div style={{display:'flex', justifyContent:'center', margin:'30px'}}>
                    <Link href={'/view-profile/'+dashboardInfo?.username}>
                      <Button>
                          Build Profile
                      </Button>
                    </Link>
                  </div>
                </div>
                <Divider></Divider>
                <div style={{padding:'30px'}}>
                  <Grid container spacing={2}>
                    {grids.map((grid, index) => (
                      <Grid item xs={12} sm={6} md={4}  key={index} sx={{justifyContent: 'center'}} >
                          <Paper sx={{padding:'10px!important', textAlign:'center'}}>
                              <Typography variant="h4">{grid.count}</Typography>
                              <Typography variant="h6" sx={{fontWeight:'bold'}}>{grid.label}</Typography>
                          </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </>
            )
          }
        </Paper>
      </Container>
    </>
  );
}