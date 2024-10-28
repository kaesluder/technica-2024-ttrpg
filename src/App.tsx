import TabPanel from './TabPanel'
import Box from '@mui/material/Box'
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
    // Detect the system’s color scheme preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Create a theme that switches based on the system preference
    const theme = React.useMemo(
        () =>
        createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <CssBaseline />
                <TabPanel />
            </Box>
        </ThemeProvider>
    )
}

export default App
