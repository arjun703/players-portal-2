
import HeaderLoggedIn from "./header_logged_in";
import HeaderNotLoggedIn from "./header_not_logged_in";
import Paper from '@mui/material/Paper';
import getUserNameFromToken from "../useauth";
import { useState, useEffect } from "react";

export default  function Header(){

    const [siteSettings, setSiteSettings] = useState({
      logo_url: "https://sports-talent-asia.blr1.digitaloceanspaces.com/user-generated-media/hGw8oW5lXGSMFSqgGiGC.png"
    })

    useEffect(() => {
        async function fetchSettings() {
            try {
                const siteSettingsResp = await fetch('/api/admin/settings'); // Relative URL should be fine client-side
                const settings = await siteSettingsResp.json();
                setSiteSettings(settings.settings);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchSettings();
    }, []);

    return (
        <Paper elevation={0} sx={{borderRadius: '0px', position: 'sticky', top: '0px', zIndex: 999}}>
          {
            getUserNameFromToken() 
              ? <HeaderLoggedIn siteSettings={siteSettings}  /> 
              : <HeaderNotLoggedIn siteSettings={siteSettings} />
          }
        </Paper>
    );
}