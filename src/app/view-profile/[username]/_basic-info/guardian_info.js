import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
export default function GuardianInfo({basicInfo}){

    const guardianInfo = [
        {label: 'Relation', value: basicInfo?.guardian_relation || ''},
        {label: 'Guardian Name', value: basicInfo?.guardian_name || ''},
        {label: 'Primary Phone', value: basicInfo?.guardian_primary_phone || ''},
        {label: 'Secondary Phone', value: basicInfo?.guardian_secondary_phone || ''},
        {label: 'Secondary Email', value: basicInfo?.guardian_secondary_email || ''},
        {label: 'Guardian Education', value: basicInfo?.guardian_highest_education_level || ''}
    ]

    return(
        <Paper sx={{ p: '0 20px 20px 20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>Guardian Info</h3>
            <Box>
                {
                    guardianInfo.map(ci => {
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