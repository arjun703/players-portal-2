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
import { useState, useEffect } from 'react';
import SimpleBackdrop from '../_components/backdrop';

export default function PricingCards() {

  const [pricingPageSettings, setPricingPageSettings] = useState('')

  const [isFetchingSettings, setIsFetchingSettings] = useState(true)

  useEffect(() => {
      async function fetchAdminSettings(){
          try{
              setIsFetchingSettings(true)
              const adminSettings = await fetch('/api/admin/settings/pricing-page/')
              const adminSettingsJson =  await adminSettings.json()
              if(!adminSettingsJson.success){
                  throw new Error(adminSettingsJson.msg)
              }
              setPricingPageSettings(adminSettingsJson.settings)
          }catch(error){
              toast(error.message)
          }finally{
              setIsFetchingSettings(false)
          }
      }
      fetchAdminSettings()
  }, [])

  if(isFetchingSettings){
    return <SimpleBackdrop />
  }

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
          <Typography level="h2">{pricingPageSettings.free_text}</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
            {
              pricingPageSettings.free_feature_list.split('\n').filter(r => r.trim().length > 0).map( (r, i) => {
                return(
                    <ListItem key={i}>
                      <ListItemDecorator>
                        <DirectionsRunIcon />
                      </ListItemDecorator>
                      {r}
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
          <Typography level="h2">{pricingPageSettings.premium_text}</Typography>
          <Divider inset="none" />
          <List
          size="sm"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            mx: 'calc(-1 * var(--ListItem-paddingX))',
          }}
          >
            {
              pricingPageSettings.premium_feature_list.split('\n').filter(r => r.trim().length > 0).map( (r, i) => {
                return(
                    <ListItem key={i}>
                      <ListItemDecorator>
                        <DirectionsRunIcon />
                      </ListItemDecorator>
                      {r}
                  </ListItem>
                )
              })
            }
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              {pricingPageSettings.pricing_text}
            </Typography>
            <Button onClick={()=>{window.location.href=pricingPageSettings.checkout_page_link}} endDecorator={<KeyboardArrowRight />}>Checkout</Button>
          </CardActions>
        </Card>
      </Box>
        </div>

      </Container>
    </>

  );
}









