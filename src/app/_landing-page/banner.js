'use client'
import { Height, Opacity } from "@mui/icons-material";
import useLang from "../_components/uselang";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/navigation";
import LandingPageSettings from "../admin/_admin-panel/_landing-page-settings";

export default function Banner({landngPageSettings}) {
    const lang = useLang();
    const router = useRouter();
    const handleClick = () => {
        router.push('/register-options')
    }
    
    const {banner} = landngPageSettings
    
    return (
        <div className="banner position-relative">
            <div className="banner-image">
                <img src={banner.banner_image_url} className="banner-image" alt="Tennis Hero" />
            </div>
            <div className="position-absolute-lg">
                <Box>
                    <div className="banner-card-wrapper">
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h4" sx={{fontWeight:700}} gutterBottom>
                                    {banner.welcome_text}
                                </Typography>
                                <Typography component="div">
                                    {banner.body_text}
                                </Typography>
                            </CardContent>
                            <div  className="banner-cardactions-wrapper">
                                <CardActions>
                                    <div className="banner-button-wrapper">
                                        <Button 
                                            sx={{minWidth: '250px'}} 
                                            variant="solid" 
                                            onClick={handleClick}
                                        >
                                            {lang.sign_up_text}
                                        </Button>
                                    </div>
                                </CardActions>
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        </div>
    );
  }