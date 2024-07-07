import {Box, Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export default function LimitedAccessDiv({accessibleAfterPremium}) {
    return (
        <Paper
            sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                padding: 3,
                textAlign: 'center',
                margin: '20px auto',
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.8)',
            }}
        >
            <VpnKeyOutlinedIcon sx={{ fontSize: 40, marginBottom: 1 }} />
            <Typography variant="body1" component="div">
                {accessibleAfterPremium}
            </Typography>
            <Link href="/pricing" underline="hover" sx={{ display: 'block', marginTop: 1 }}>
                Compare plans
            </Link>
        </Paper>
    );
}