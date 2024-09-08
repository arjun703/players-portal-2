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
import { Divider, Typography,  Card, CardHeader } from '@mui/material';
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
  const [coach, setCoach] = useState({})
  const [trackedPlayers, setTrackedPlayers] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [grids, setGrids] = useState([])
  const [modalOpen, setModalOpen]  = useState(false)

  useEffect(() => {
    async function fetchDashboard() {
        try {
            const response = await fetch('/api/coach-dashboard'); // Adjust the API endpoint URL as needed
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setDashboardInfo(data);
            setCoach(JSON.parse(data.coach.info))
            setTrackedPlayers(data.trackedPlayers)
        } catch (error) {
            alert( error.message)
        }finally{
          setIsLoading(false)
        }
    }
    fetchDashboard();
  }, []); 



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
                      dashboardInfo.coach.profile_pic!= null? dashboardInfo.coach.profile_pic:false
                    } />
                  )
                }
                <div className="avatar-name justify-content-between d-flex align-items-center" >


                <div onClick={handleProfilePicUploadModalClose} style={{ display:'flex', justifyContent:'center'}}>
                    
                    <div style={{cursor: 'pointer', position:'relative'}}>
                      <Avatar
                        alt={dashboardInfo.coach.name}
                        src={dashboardInfo.coach.profile_pic}
                        
                        sx={{ width: {md:  80, xs: 80} , height:{md: 80, xs: 80}  }}
                      >
                      </Avatar>
                      <PhotoCameraIcon sx={{position: 'absolute', fontSize: '15px', color:'white', background:'black', padding: '5px', borderRadius: '50%', bottom: '10px', right: '-5px' }} />
                    </div>

                  </div>

                  <div style={{textAlign:'center', marginTop: '-15px'}}>
                    <h1>Welcome, {coach?.name.split(' ')[0]}</h1>
                  </div>
                  <div style={{display:'flex', justifyContent:'center', margin:'30px'}}>
                    <Link href={'/edit-coach-profile/'}>
                      <Button>
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>
                <Divider></Divider>
                <div style={{padding:'30px'}}>
                    {
                      trackedPlayers.length ? <TrackedPlayers trackedPlayers={trackedPlayers}/> : <NoTrackedPlayers />
                    }
                </div>
              </>
            )
          }
        </Paper>
      </Container>
    </>
  );
}

function NoTrackedPlayers(){
  return(
    <div style={{textAlign:'center'}}>
      <div>
        The players you browse and track will appear here.
      </div>
    </div>
  )
}
import { useRouter } from 'next/navigation';

function TrackedPlayers({trackedPlayers}){
  const router = useRouter()
  const handleClick = (un) => {router.push('/view-profile/'+encodeURIComponent(un))}

  return(
    <>
      <div>
        <h3 style={{textAlign:'center'}}>Tracked Players</h3>
      </div>
      <Grid container spacing={2}>
        {trackedPlayers.map((tp, index) => (
          <Grid item xs={12} sm={6} md={4}  key={index} sx={{justifyContent: 'center'}} >
            <Card style={{cursor:'pointer'}} onClick={()=>{ handleClick(tp.athlete_username)}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe"
                    src={ tp.profile_pic!= null ? tp.profile_pic : ''}
                  >
                  </Avatar>
                }
                title={tp.name }
                subheader={''}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>

    
  )
}