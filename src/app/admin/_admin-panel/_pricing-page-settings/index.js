import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { Paper } from "@mui/material";
import Alert from '@mui/material/Alert';
import {Grid, Box} from "@mui/material";
import { TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import SimpleBackdrop from "@/app/_components/backdrop";
import { pOSTRequest } from "@/app/_components/file_upload";

export default function PricingPageSettings(){

    const [pricingPageSettings, setPricingPageSettings] = useState(
        {
            free_text: "",
            premium_text: "",
            free_feature_list: "",
            premium_feature_list: "",
            price_in_rm_per_day: 1
        }
    )

    const [isFetchingSettings, setIsFetchingSettings] = useState(false)

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
    
    const [isLoading, setIsLoading] = useState(false)

    const handleSettingsSave = async () => {
        try{
            if( [
                    pricingPageSettings.free_text, 
                    pricingPageSettings.premium_text, 
                    pricingPageSettings.free_feature_list, 
                    pricingPageSettings.premium_feature_list, 
                ]
                .some(value => value.trim().length === 0)
            ){
                toast("Values can't be empty")
                return
            }
            
            if(pricingPageSettings.price_in_rm_per_day == '' || pricingPageSettings.price_in_rm_per_day == 0  ){
                toast("Price should be greater than 0")
                return
            }

            const formData = new FormData();
            setIsLoading(true)
            formData.append('data', JSON.stringify(pricingPageSettings));
            const result = await pOSTRequest(formData, 'api/admin/settings/pricing-page')
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

    const handleStateChange = (key, value) => {
        setPricingPageSettings(prevSettings => ({
            ...prevSettings, // spread the previous settings
            [key]: value // update the banner_image_url
        }));
    }

    if(isFetchingSettings){
        return <SimpleBackdrop />
    }

    return(
        <>
            <Paper sx={{p: 4}}>

                <Grid container alignItems={'center'}>
                    <Grid item xs={8}>
                        <Alert sx={{textAlign:'center'}} severity="info">Pricing Page Settings</Alert>
                    </Grid>
                    <Grid item xs={4} justifyContent={'flex-end'}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button loading={isLoading} onClick={handleSettingsSave}>Save Changes</Button>
                        </Box>                    
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mt: 1}} alignItems={'center'}>
                    
                    <Grid item xs={4}>
                        Free Text
                    </Grid>
                    <Grid item xs={8}>
                        <TextField 
                        onChange = {(e) => handleStateChange('free_text', e.target.value)}
                        fullWidth defaultValue={pricingPageSettings?.free_text} />
                    </Grid>
                    
                    <Grid item xs={4}>
                        Premium Text
                    </Grid>
                    <Grid item xs={8}>
                        <TextField  
                        onChange = {(e) => handleStateChange('premium_text', e.target.value)}
                        fullWidth defaultValue={pricingPageSettings?.premium_text} />
                    </Grid>
                    
                    <Grid item xs={4}>
                        Price ( in RM/day)
                    </Grid>
                    <Grid item xs={8}>
                        <TextField 
                        onChange = {(e) => handleStateChange('price_in_rm_per_day', e.target.value)}
                        type="number" fullWidth defaultValue={pricingPageSettings?.price_in_rm_per_day} />
                    </Grid>

                    <Grid item xs={4}>
                        Free Plan Feature List
                    </Grid>
                    <Grid item xs={8}>
                        <textarea 
                            rows={8}
                            onChange = {(e) => handleStateChange('free_feature_list', e.target.value)}
                            style={{width: '100%', resize: 'vertical', boxSizing:'border-box', padding: '10px'}}
                        >
                            {pricingPageSettings?.free_feature_list}
                        </textarea>
                    </Grid>
                    
                    <Grid item xs={4}>
                        Premium Plan Feature List
                    </Grid>
                    <Grid item xs={8}>
                        <textarea 
                            rows={8} 
                            onChange = {(e) => handleStateChange('premium_feature_list', e.target.value)}
                            style={{width: '100%', resize: 'vertical', boxSizing:'border-box', padding: '10px'}}
                        >
                            {pricingPageSettings?.premium_feature_list}
                        </textarea>
                    </Grid>

                </Grid>
            </Paper>
        </>
    )
}