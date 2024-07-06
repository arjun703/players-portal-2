'use client'
import Header from '@/app/_components/_header/header';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export default function PricingCards() {

  const rows = [
    { feature: 'Build Profile', free: true, platinum: true },
    { feature: 'Profile picture', free: true, platinum: true },
    { feature: 'Track Fitness Performance', free: true, platinum: true },
    { feature: 'Track Achievements', free: true, platinum: true },
    { feature: 'Upload Videos', free: false, platinum: true },
    { feature: 'Direct Promotions to Coaches/Scouts/Clubs', free: false, platinum: true },
    { feature: 'Sport Partner Network Merchant Promotions', free: false, platinum: true },
    { feature: 'Sports Partner Network Training Campaigns Promotions', free: false, platinum: true },
    { feature: 'Complete Profile Report', free: false, platinum: true },
    { feature: '7 days a week support', free: false, platinum: true },
    { feature: 'Appointed Advisor/Consultant', free: false, platinum: true },
  ];

  return (
    <>
      <Header user={false} />
      
      <Container maxWidth={'lg'} sx={{marginTop: '30px'}}>
            <h1>Contact Us</h1>
      </Container>
    </>

  );
}









