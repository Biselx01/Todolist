import { useState } from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, Outlet } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Todolist from './components/Todolist'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


return (
    <Container maxWidth='lg'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Todos
          </Typography>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
               sx={{
              transform: anchorEl ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" underline="hover">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/todolist" underline="hover">Todolist</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/about" underline="hover">About</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/contact" underline="hover">Contact</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="Todolist" {...a11yProps(1)} />
                <Tab label="About" {...a11yProps(2)} />
                <Tab label="Contact" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Home />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Todolist />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <About />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Contact />
            </CustomTabPanel>
          </Box>
      <Outlet />
      <CssBaseline />
    </Container>
  );
}

export default App
