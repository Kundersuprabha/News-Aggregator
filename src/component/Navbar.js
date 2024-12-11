import * as React from 'react';
import {
  AppBar,
  styled, 
  alpha,
  Box,
  InputBase,
  Toolbar,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import world from '../assets/video/world1.mp4';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Navbar = () => {
  return (
    <AppBar position="static" sx={{background:'black'}}>
      <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between">

        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <video
              src={world}
              autoPlay
              loop
              muted
              style={{
                height: '70px', // Adjust video height
                width: 'auto',  // Maintain aspect ratio
              }}
            />
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <video
              src={world}
              autoPlay
              loop
              muted
              style={{
                height: '40px', // Adjust for smaller screen sizes
                width: 'auto',
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row" spacing={2}>
                <Typography>Home</Typography>
                <Typography>Personalized</Typography>
                <Typography>General</Typography>
                <Typography>All Data Source</Typography>
            </Stack>
          </Box>

        </Toolbar>
        <Toolbar>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
