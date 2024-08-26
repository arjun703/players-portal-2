import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { Paper } from "@mui/material";
import Alert from '@mui/material/Alert';
import {Grid, Box} from "@mui/material";
import { TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import MediaUploadGeneral from "@/app/_components/_media-upload-general";
import { pOSTRequest } from "@/app/_components/file_upload";
import SimpleBackdrop from "@/app/_components/backdrop";

export default function LandingPageSettings(){

    const [landingPageSettings, setLandingPageSettings] = useState(
        {
            banner: {
                welcome_text: "",
                body_text: "",
                banner_image_url: ""
            }
        }
    )

    const [isFetchingSettings, setIsFetchingSettings] = useState(false)

    useEffect(() => {
        async function fetchAdminSettings(){
            try{
                setIsFetchingSettings(true)
                const adminSettings = await fetch('/api/admin/settings/landing-page/')
                const adminSettingsJson =  await adminSettings.json()
                if(!adminSettingsJson.success){
                    throw new Error(adminSettingsJson.msg)
                }
                setLandingPageSettings(adminSettingsJson.settings)
            }catch(error){
                toast(error.message)
            }finally{
                setIsFetchingSettings(false)
            }
        }
        fetchAdminSettings()
    }, [])
    
    const [isLoading, setIsLoading] = useState(false)

    const handleSettingsSave = async () => {
        try{
            if( [
                    landingPageSettings.banner.welcome_text, 
                    landingPageSettings.banner.banner_image_url, 
                    landingPageSettings.banner.body_text
                ]
                .some(value => value.trim().length === 0)
            ){
                toast("Values can't be empty")
                return
            }
            const formData = new FormData();
            setIsLoading(true)
            formData.append('data', JSON.stringify(landingPageSettings));
            const result = await pOSTRequest(formData, 'api/admin/settings/landing-page')
            if (result.success === true) {
                toast("Settings saved")
            }else{
                throw new Error(result.msg)
            }
        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    const [mediaUploadOverlayStatus, setMediaUploadOverlayStatus] = useState(false)

    const handleOverlayStatusChange  = () => {
        setMediaUploadOverlayStatus(!mediaUploadOverlayStatus);
    }

    const handleStateChange = (key, value) => {
        setLandingPageSettings(prevSettings => ({
            ...prevSettings, // spread the previous settings
            banner: {
                ...prevSettings.banner, // spread the previous banner settings
                [key]: value // update the banner_image_url
            }
        }));
    }

    const handleMediaUploadSuccess = (newUrl) => {
        handleStateChange('banner_image_url', newUrl)
    }

    if(isFetchingSettings){
        return <SimpleBackdrop />
    }

    return(
        <>
            {
                mediaUploadOverlayStatus  
                    ? <MediaUploadGeneral onClose={handleOverlayStatusChange} onSuccess={handleMediaUploadSuccess} />
                    : <></>
            }

            <Paper sx={{p: 4}}>

                <Grid container alignItems={'center'}>
                    <Grid item xs={8}>
                        <Alert sx={{textAlign:'center'}} severity="info">Landing Page Banner Settings</Alert>
                    </Grid>
                    <Grid item xs={4} justifyContent={'flex-end'}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={handleSettingsSave} loading={isLoading}>Save Changes</Button>
                        </Box>                    
                    </Grid>
                </Grid>
                
                <Grid container spacing={2} sx={{mt: 1}} alignItems={'center'}>
                    
                    <Grid item xs={4}>
                        Welcome Text
                    </Grid>
                    <Grid item xs={8}>
                        <TextField onChange = {(e) => handleStateChange('welcome_text', e.target.value)} fullWidth 
                        defaultValue={landingPageSettings?.banner?.welcome_text} />
                    </Grid>
                    
                    <Grid item xs={4}>
                        Welcome Paragraph
                    </Grid>
                    <Grid item xs={8}>
                        <textarea rows={5} onChange = {(e) => handleStateChange('body_text', e.target.value)} style={{width: '100%', resize:'vertical', boxSizing:'border-box', padding: '10px'}}>
                            {landingPageSettings?.banner.body_text}
                        </textarea>
                    </Grid>

                    <Grid item xs={4}>
                        <div>Banner Image</div>
                        <div style={{marginTop: '5px'}}>
                            <Button onClick={handleOverlayStatusChange} variant="outlined">Change</Button>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <img src={ landingPageSettings?.banner?.banner_image_url } style={{maxWidth: '200px', height: 'auto'}} />
                    </Grid>

                </Grid>
            </Paper>
        </>
    )
}