import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const activeUsersData = [
  { day: 1, activeUsers: 150 },
  { day: 2, activeUsers: 200 },
  { day: 3, activeUsers: 180 },
  { day: 4, activeUsers: 220 },
  { day: 5, activeUsers: 210 },
  { day: 6, activeUsers: 230 },
  { day: 7, activeUsers: 250 },
];

const signUpsData = [
  { day: 1, newSignups: 10 },
  { day: 2, newSignups: 15 },
  { day: 3, newSignups: 13 },
  { day: 4, newSignups: 17 },
  { day: 5, newSignups: 14 },
  { day: 6, newSignups: 18 },
  { day: 7, newSignups: 20 },
];

const subscriptionData = [
  { name: 'Free Users', value: 400 },
  { name: 'Paid Users', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

import { Grid, Paper, Typography } from '@mui/material';

const DashboardGraphs = () => (
  <Grid container spacing={2} sx={{mt: 0.5}}>

    {/* Daily/Weekly/Monthly Active Users */}
    <Grid item xs={12} sm={6} md={4}>
      <Paper  style={{ padding: '20px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Daily/Weekly/Monthly Active Users
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activeUsersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>

    {/* New Sign-ups */}
    <Grid item xs={12} sm={6} md={4}>
      <Paper  style={{ padding: '20px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          New Sign-ups
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={signUpsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="newSignups" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>

    {/* Subscription Metrics */}
    <Grid item xs={12} sm={6} md={4}>
      <Paper  style={{ padding: '20px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Subscription Metrics
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={subscriptionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {subscriptionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>

    {/* Total Active Users */}
    <Grid item xs={12} sm={6} md={4}>
      <Paper  style={{ padding: '20px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Total Active Users
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activeUsersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>


    {/* You can add more metrics here similarly */}

  </Grid>
);

export default DashboardGraphs;
