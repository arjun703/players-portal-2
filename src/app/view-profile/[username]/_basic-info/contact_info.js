import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
export default function basicInfo({basicInfo}){

    const contactInfo = [
        {label: 'Primary Phone', value: basicInfo?.primary_phone || ''},
        {label: 'Primary Email', value: basicInfo?.primary_email || ''},
        {label: 'Secondary Phone', value: basicInfo?.secondary_phone || ''},
        {label: 'Secondary Email', value: basicInfo?.secondary_email || ''},
    ]

    return(
        <Paper sx={{ p: '0 20px 20px 20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>Contact Info</h3>
            <Box>
                {
                    contactInfo.map(ci => {
                        if(ci.value.toString().trim().length == 0) return''
                        return(
                            <div style={{ marginBottom: '10px' }}>
                                <span className="general-info-label" 
                                    style={{ fontWeight: 'bold', marginRight: '10px' }}
                                >
                                    {ci.label}
                                </span>
                                <span className="general-info-value">
                                    {ci.value}
                                </span>
                            </div>
                        )
                    })
                }
            </Box>
        </Paper>
    )
}