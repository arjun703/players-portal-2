import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import ChangeAdminPassword from './_change-admin-password.js';
import AddNewAdminUser from './_add-new-admin/index.js';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Change Admin Password
        </AccordionSummary>
        <AccordionDetails>
          <ChangeAdminPassword />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Add New Admin User
        </AccordionSummary>
        <AccordionDetails>
          <AddNewAdminUser />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
