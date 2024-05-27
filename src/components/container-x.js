import { AppBar, Box, Button, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../theme-context';
import { ApiVersionContext } from '../api-version-context';
import { DarkMode, LightMode } from '@mui/icons-material';

function ContainerX({ children }) {
  const { mode, toggleDarkMode } = useContext(ThemeContext);
  const { apiVersion, changeApiVersion } = useContext(ApiVersionContext);
  return (
    <div className={`min-h-screen overflow-hidden bg-gray-50 ${mode} dark:bg-gray-800  text-black`}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color='inherit' position="static">
          <Toolbar>
            <Typography variant="h6" className='font-bold' component="div" sx={{ flexGrow: 1 }}>
              Where in the world?
            </Typography>
            <div className={`md:flex`}>
              <div className={`me-2`}>
              <Select
                fullWidth
                sx={{ maxWidth: '30ch' }}
                displayEmpty
                size='small'
                value={apiVersion}
                onChange={(e) => changeApiVersion(e.target.value)}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>API Version</em>;
                  }

                  return selected;
                }}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3.1}>3.1</MenuItem>
              </Select>
              </div>

              <Button startIcon={mode === "dark" ? <LightMode /> : <DarkMode />} color="inherit" onClick={toggleDarkMode}>Dark Mode</Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="px-6 pt-10 pb-8 sm:px-10">
        {children}
      </div>
    </div>
  )
}
export default ContainerX