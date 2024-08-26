import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import Header from './_header';
import { BorderBottom } from '@mui/icons-material';

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '70px',
  borderBottom: '1px solid rgba(0,0,0, 0.2)',
  backgroundColor: 'white',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  zIndex: 1000, // Ensures the header stays on top
};

const sidebarStyle = {
  position: 'fixed',
  top: '70px', // Adjusted to account for the header height
  left: 0,
  width: '250px',
  height: 'calc(100vh - 50px)', // Adjusted height for the sidebar
  backgroundColor: 'white',
  borderRight: '1px solid rgba(0, 0, 0, 0.2)',
  paddingTop: '20px',
  overflowX: 'hidden'
};

const linkStyle = {
  padding: '15px 20px',
  textDecoration: 'none',
  fontSize: '18px',
  color: '#ffffff',
  display: 'block'
};

const mainContentStyle = {
  marginLeft: '250px',
  padding: '20px',
  paddingTop: '70px', // Adjusted padding to account for the header height
  backgroundColor: '#ecf0f1',
  minHeight: '100vh'
};

import DashboardIcon from '@mui/icons-material/Dashboard';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import Dashboard from './_dashboard';
import LandingPageSettings from './_landing-page-settings';
import ContactFormSubmissions from './_contact-form-submissions';
import PricingPageSettings from './_pricing-page-settings';
import SiteSettings from './_site-settings';
import ChangeAdminPassword from './_user-settings';

export default function Index() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div class="admin-panel">
      <div style={headerStyle}>
        <img style={{position:'absolute', left: 35, width: '60px', height: 'auto'}} src="https://sportstalentasia.com/site-assets/logo.png"></img>
        <h2>Sports Talent Asia Admin Panel</h2>
      </div>
      <TabContext value={value}>
        <div style={sidebarStyle}>
          <TabList sx={{width: '100%'}} orientation="vertical" onChange={handleChange} aria-label="lab API tabs example">
            <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" value="1" />
            <Tab icon={<ContactSupportIcon />} iconPosition='start' label="Inquiries" value="3" />
            <Tab icon={<WysiwygIcon />} iconPosition='start' label="Landing Page" value="2" />
            <Tab icon={<WysiwygIcon />} iconPosition='start' label="Pricing Page" value="6" />
            <Tab icon={<PersonIcon />} iconPosition='start' label="User" value="4" />
            <Tab icon={<SettingsIcon />} iconPosition='start' label="Settings" value="5" />
          </TabList>
        </div>
        <div style={mainContentStyle}>
            <TabPanel value="1">
              <Dashboard />
            </TabPanel>
            <TabPanel value="2">
              <LandingPageSettings />
            </TabPanel>
            <TabPanel value="3">
              <ContactFormSubmissions />
            </TabPanel>
            <TabPanel value="4">
              <ChangeAdminPassword />
            </TabPanel>
            <TabPanel value="5">
              <SiteSettings />
            </TabPanel>
            <TabPanel value="6">
              <PricingPageSettings />
            </TabPanel>
        </div>
      </TabContext>
    </div>
  );
}
