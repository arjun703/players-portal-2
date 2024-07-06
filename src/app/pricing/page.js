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
import Link from 'next/link';
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
        <div style={{display:'flex', justifyContent:'center'}}>


        <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 375px), 1fr))',
        gap: 2,
      }}
      >
        <Card size="lg" variant="outlined">
          <Chip size="sm" variant="outlined" color="neutral">
            free
          </Chip>
          <Typography level="h2">FREE</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
            {
              rows.filter(r => r.free == true).map( (r, i) => {
                return(
                    <ListItem key={i}>
                      <ListItemDecorator>
                        <DirectionsRunIcon />
                      </ListItemDecorator>
                      {r.feature}
                  </ListItem>
                )
              })
            }
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              Free
            </Typography>
            <Link href='/register-options'>
            <Button
              variant="soft"
              color="neutral"
              endDecorator={<KeyboardArrowRight />}
            >
              Sign Up
            </Button>
            </Link>

          </CardActions>
        </Card>
        <Card
          size="lg"
          variant="solid"
          color="neutral"
          invertedColors
          sx={{ bgcolor: 'neutral.900' }}
        >
          <Chip size="sm" variant="outlined">
            premium
          </Chip>
          <Typography level="h2">PLATINUM</Typography>
          <Divider inset="none" />
          <List
          size="sm"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            mx: 'calc(-1 * var(--ListItem-paddingX))',
          }}
          >
            <ListItem>
              <ListItemDecorator>
                <DirectionsRunIcon />
              </ListItemDecorator>
              All basic plan features
            </ListItem>
            {
              rows.filter(r => r.platinum == true).map( (r, i) => {
                return(
                    <ListItem key={i}>
                      <ListItemDecorator>
                        <DirectionsRunIcon />
                      </ListItemDecorator>
                      {r.feature}
                  </ListItem>
                )
              })
            }
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              RM 1{' '}
              <Typography fontSize="sm" textColor="text.tertiary">
                / day
              </Typography>
            </Typography>
            <Button onClick={()=>{window.location.href='https://buy.stripe.com/test_7sI5mG7PagCaaHu144'}} endDecorator={<KeyboardArrowRight />}>Checkout</Button>
          </CardActions>
        </Card>
      </Box>
        </div>

      </Container>
    </>

  );
}









