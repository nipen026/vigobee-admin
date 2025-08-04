import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Box
                component="main"
                sx={{
                    // flexGrow: 1,
                    ml: collapsed ? '70px' : '240px', // dynamic sidebar width if you manage `collapsed`
                    pt: '64px',                       // fixed AppBar height
                    p: 3,
                    position:'absolute',
                    bottom:0,
                    height: 'calc(100vh - 64px)', // subtract AppBar height correctly
                   width: collapsed ? 'calc(100vw - 70px)' : 'calc(100vw - 240px)',
                    overflowY: 'auto',
                    transition: 'margin-left 0.3s',
                }}
            >
                <Outlet /> {/* Nested route content renders here */}
            </Box>
        </Box>
    );
};

export default Layout;
