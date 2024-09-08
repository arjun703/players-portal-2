'use client'
import Header from '@/app/_components/_header/header';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import useLang from '../_components/uselang';
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import GoogleSignIn from '../_components/google-sign-in';
import { pOSTRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';
import { useRouter } from "next/navigation";
import {Select, MenuItem, InputLabel, FormControl} from  "@mui/material" 
import sportsSettings from '@/app/view-profile/[username]/_key-stats/settings'
import Link from 'next/link';
import toast from 'react-hot-toast';
import validateEmail from '../_components/utils/email-validation';
import validateName from '../_components/utils/name-validation';

export default function LandingPage(){
    
    const router = useRouter();
    const lang = useLang();
    const [prop, setProp] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (attr, value) => {
        setProp(prevProp => ({
            ...prevProp,  // maintain previous properties
            [attr]: value // update the specific attribute
        }));
    }

    const handleRegister = async () => {

        if( !('name' in prop && 'sport_type' in prop && 'email' in prop && 'password' in prop && 'confirm_password' in prop) ) {
            toast("Name / email / password / sport type should be filled in")
            return
        }

        if(prop.password.trim() !== prop.confirm_password){
            toast("Passwords do not match.")
            return
        }

        if(prop.name.trim().length == 0 || prop.sport_type.trim().length == 0 || prop.email.trim().length == 0){
            toast("Name / email / password/ sport type can't be blank")
            return
        }


        if(!validateEmail(prop.email)){
            toast("Invalid email")
            return
        }

        if(!validateName(prop.name)){
            toast("Invalid name")
            return
        }

        const formData = new FormData();
        setIsLoading(true)
        formData.append('info', JSON.stringify(prop));
        const result = await pOSTRequest(formData, 'api/auth/ctu-register/')
        if (result.success === true) {
            localStorage.setItem('token', result.token);
            router.push('/club-dashboard')
        } else {
            toast(result.msg)
            setIsLoading(false)
            return false
        }
    }

    return (
        <div>
            <Header user={false} />
            <Container maxWidth="lg" sx={{marginTop:'30px'}} >
                <Grid container spacing={2} >
                    <Grid item lg={6} xs={12} sx={{ display: 'flex', justifyContent: 'center'}} >
                        <Box sx={{position:{ lg: 'fixed'}, top: {lg: '250px'}}}>
                            <div>
                                <h3>Create a club / team account</h3>
                                <hr></hr>
                                <Link href={'/register'}>Create an athlete account</Link>
                                <br></br>
                                <br></br>
                                <Link href={'/coach-register'}>Create a coach account</Link>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item lg={6} xs={12}  >
                        <Paper  sx={{ padding:'20px', borderRadius: '0px'}} >    
                            <div style={{fontWeight:'bold', textAlign:'center', paddingBottom:'20px'}}>Head Coach / Manager Information</div>
                            <Stack spacing={2}  >
                                <TextField onChange={(e)=>handleChange('name', e.target.value.trim())} label="Name" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('email', e.target.value.trim())} label="Email ( used for logging in next time )" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('identification_number', e.target.value.trim())} label="Identification Number (IC)" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('residing_country', e.target.value.trim())} label="Residing Country" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('zip_code', e.target.value.trim())} label="Provnce / Zip Code" variant="outlined" fullWidth  />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sport Type</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        labelId="demo-simple-select-label"
                                        label="Sport Type"
                                        onChange={(e) => { handleChange('sport_type', e.target.value) }}
                                    >
                                        {sportsSettings.sports.map(({ label, id }, i) => (<MenuItem key={i} value={id}>{label}</MenuItem>))}
                                    </Select>
                                </FormControl>                                        
                                <TextField onChange={(e)=>handleChange('team_role_title', e.target.value.trim())} label="Team Role / Title" variant="outlined" fullWidth  />
                                <TextField  onChange={(e)=>handleChange('password', e.target.value.trim())}  type="password" label="Password" variant="outlined"  fullWidth  />
                                <TextField onChange={(e) => handleChange('confirm_password', e.target.value.trim())}  label="Confirm Password" variant="outlined" type="password"  fullWidth  />                                                                         
                            </Stack>  
                        </Paper>
                        <Paper sx={{padding: '20px', borderRadius: '0px'}} > 
                            <div style={{textAlign:'center', paddingBottom:'20px'}}>Club / Team / University Information</div>
                            <Stack spacing={2}>
                                <TextField onChange={(e)=>handleChange('official_reg_name', e.target.value.trim())} label="Official Reg Name" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('club_team_uni', e.target.value.trim())} label="Club? / Team? / University?" variant="outlined" fullWidth  />
                                <TextField onChange={(e)=>handleChange('official_org_email', e.target.value.trim())}   label="Official Org Email" variant="outlined"  fullWidth  />
                                <TextField onChange={(e)=>handleChange('country', e.target.value.trim())}   label="Country" variant="outlined"  fullWidth  />
                                <TextField onChange={(e)=>handleChange('state', e.target.value.trim())}   label="State" variant="outlined"  fullWidth  />
                                <TextField onChange={(e)=>handleChange('town_city', e.target.value.trim())}   label="Town / City" variant="outlined"  fullWidth  />
                                <TextField onChange={(e)=>handleChange('postcode_zipcode', e.target.value.trim())}   label="Postcode / Zipcode" variant="outlined"  fullWidth  />
                                <Grid container>
                                    <Grid item xs={3}>
                                        <TextField placeholder='+' onChange={(e)=>handleChange('country_code', e.target.value.trim())}   label="Country Code" variant="outlined"  fullWidth  />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField onChange={(e)=>handleChange('contact_number', e.target.value.trim())}   label="Contact Number" variant="outlined"  fullWidth  />
                                    </Grid>
                                </Grid>
                            </Stack>  
                        </Paper>
                        <div style={{fontWeight:'bold', marginTop:'20px', paddingBottom:'20px', textAlign:'center', display:'flex', justifyContent:'center'}}>
                            <Button 
                                variant="solid"
                                loading={isLoading}
                                sx={{minWidth:'250px'}}
                                loadingPosition='start'
                                onClick={handleRegister}
                            >
                                {lang.sign_up_text}
                            </Button> 
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}