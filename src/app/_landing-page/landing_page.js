import Header from '@/app/_components/_header/header';
import Banner from './banner';
import SimpleBackdrop from '../_components/backdrop';
import { useState, useEffect } from 'react';

export default function LandingPage(){
    
    const [landngPageSettings, setLandingPageSettings] = useState({})
    const [isFetchingSettings, setIsFetchingSettings]  = useState(true)

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

    if(isFetchingSettings){
        return <SimpleBackdrop />
    }

    return (
        <>
            <Header user={false} />
            <Banner landngPageSettings={landngPageSettings} />   
        </>
    );
}