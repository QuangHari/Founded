import * as React from 'react';
import { styled, alpha ,createTheme,ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreIcon from '@mui/icons-material/MoreVert';
import logoImg from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext'
import { useContext ,useState} from 'react'
import Login from '../Authenticattion/Login'
import Register from '../Authenticattion/Register'
import FOUNDED_LOGO from '../../assets/FOUNDED_LOGO.png'
import blackLogo from '../../assets/FINALLOGO_Black.png'
import whiteLogo from '../../assets/FINALLOGO_White.png'
import './navbar.css'
import ProgressBar from '../Auction/Progress'
import AddAuction from '../Auction/AddAuction';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

  function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {currentUser,logout,login,register,userRole} = useContext(AuthContext)

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
      <AccountCircle style={{ fontSize: '48px' }} />
    </div>
    {currentUser && (
      <MenuItem disabled>
        
        <Typography variant="body2" color="textSecondary">
          {currentUser.email}
        </Typography>
      </MenuItem>
    )}
    <MenuItem className="centeredMenuItem" onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem className="centeredMenuItem" onClick={handleMenuClose}>My account</MenuItem>
    <MenuItem className="centeredMenuItem" onClick={() => {
       handleMenuClose(); // Đóng menu dropdown
       logout(); // Thực hiện hành động logout
   
      
    }} >Logout</MenuItem>
  </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    
      
       

      <MenuItem>
      
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const { searchAuction } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const {docs} = useContext(AuthContext)
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior if applicable
    // if (searchTerm === '') {
    //   console.log(docs);
    //   return docs; // Early return if search term is empty
    // }
    
    
    try {
      const results = await searchAuction(searchTerm);
      // Handle search results here (e.g., display them in a separate component)
      console.log('Search results:', results); // Example logging
    } catch (error) {
      console.error('Error searching auctions:', error);
      // setGlobalMsg('An error occurred during search. Please try again later.');
    } finally {
      // Optionally clear the search term after a certain time
      // setTimeout(() => setSearchTerm(''), 5000); // Example with 5-second delay
    }
  };
  const [auction, setAuction] = useState(null)
return (
  <>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    {/* Founded */}
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <form onSubmit={handleSearch}>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                          value={searchTerm}
                          onChange={(event) => setSearchTerm(event.target.value)}
                        />
                      </form>

                    {/* <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    /> */}
                </Search>
                <div className="navbar-brand" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '300px' }}>
                    <img src={whiteLogo} alt="logo" height="75" />
                </div>
                <Box sx={{ flexGrow: 1 }} />
                {currentUser ? (
                <>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <IconButton size="large" aria-label="add new" color="inherit">
                          <AddCircleOutlineIcon />
                        </IconButton> */}
                        {currentUser && <AddAuction setAuction={setAuction} />}
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </>) : (
                  <>
                  
           
                    < Login />
                    < Register />
                  </>
                )}
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
    </Box>
    <div>
      {auction && <ProgressBar auction = {auction} setAuction={setAuction}/>}
    </div>
    </>
);
}
const theme = createTheme({
  palette: {
    mode: 'dark', // Chuyển sang chủ đề màu tối
  },
});

// Các styled components và hàm PrimarySearchAppBar không thay đổi, chỉ chuyển component bên trong ThemeProvider

const ThemedPrimarySearchAppBar = () => {
  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      
    </ThemeProvider>
  );
};

export default ThemedPrimarySearchAppBar;