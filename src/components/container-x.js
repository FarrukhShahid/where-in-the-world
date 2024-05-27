import { AppBar, Box, Button, Collapse, IconButton, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../theme-context';
import { ApiVersionContext } from '../api-version-context';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';

function ContainerX({ children }) {
  const { mode, toggleDarkMode } = useContext(ThemeContext);
  const { apiVersion, changeApiVersion } = useContext(ApiVersionContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Paper className={`min-h-screen overflow-hidden `}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color='inherit' position="static">
          <Toolbar className={`flex justify-between items-center`}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Where in the world?
            </Typography>
            <Box
              sx={{
                display: {
                  xs: mobileOpen ? 'flex' : 'none',
                  sm: mobileOpen ? 'flex' : 'none',
                  lg: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Box sx={{ mr: 2 }}>
                <Select
                  fullWidth
                  displayEmpty
                  size="small"
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
              </Box>
              <Button
                startIcon={mode === 'dark' ? <LightMode /> : <DarkMode />}
                color="inherit"
                onClick={toggleDarkMode}
              >
                Dark Mode
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="px-6 pt-10 pb-8 sm:px-10">
        {children}
      </div>
    </Paper>
  )
}
export default ContainerX