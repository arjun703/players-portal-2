import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { Paper } from "@mui/material";
import Alert from '@mui/material/Alert';
import {Grid, Box} from "@mui/material";
import { TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import SimpleBackdrop from "@/app/_components/backdrop";
import MediaUploadGeneral from "@/app/_components/_media-upload-general";
import { pOSTRequest } from "@/app/_components/file_upload";

export default function SiteSettings(){

    const [siteSettings, setSiteSettings] = useState(
        {
            store_name: '',
            logo_url: ''
        }
    )

    const [isFetchingSettings, setIsFetchingSettings] = useState(false)

    useEffect(() => {
        async function fetchAdminSettings(){
            try{
                setIsFetchingSettings(true)
                const adminSettings = await fetch('/api/admin/settings/')
                const adminSettingsJson =  await adminSettings.json()
                if(!adminSettingsJson.success){
                    throw new Error(adminSettingsJson.msg)
                }
                setSiteSettings(adminSettingsJson.settings)
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
                    siteSettings.site_name, 
                    siteSettings.logo_url, 
                ]
                .some(value => value.trim().length === 0)
            ){
                toast("Values can't be empty")
                return
            }
            const formData = new FormData();
            setIsLoading(true)
            formData.append('data', JSON.stringify(siteSettings));
            const result = await pOSTRequest(formData, 'api/admin/settings/')
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
        setSiteSettings(prevSettings => ({
            ...prevSettings, // spread the previous settings
            [key]: value 
        }));
    }

    const handleMediaUploadSuccess = (newUrl) => {
        handleStateChange('logo_url', newUrl)
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
                        <Alert sx={{textAlign:'center'}} severity="info">Site Settings</Alert>
                    </Grid>
                    <Grid item xs={4} justifyContent={'flex-end'}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button loading={isLoading} onClick={handleSettingsSave}>Save Changes</Button>
                        </Box>                    
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mt: 1}} alignItems={'center'}>

                    <Grid item xs={4}>
                        Site Name
                    </Grid>
                    <Grid item xs={8}>
                        <TextField  onChange = {(e) => handleStateChange('site_name', e.target.value)} fullWidth 
                        defaultValue={siteSettings?.site_name} />
                    </Grid>

                    <Grid item xs={4}>
                        <div>Site Logo</div>
                        <div style={{marginTop: '5px'}}>
                            <Button onClick={handleOverlayStatusChange} variant="outlined">Change</Button>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <img src={ siteSettings.logo_url } style={{maxWidth: '200px', height: 'auto'}} />
                    </Grid>
                </Grid>


            </Paper>
        </>
    )
}