import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

import MenuIcon from "@mui/icons-material/Menu";


const Header = () => {
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  return (
    <>
  

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
             
                <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blog 
            </Typography>

            {isLoggedIn && (
              <>
        
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                   
                      <Tabs textColor="white"  sx={{fontFamily:'monospace'}}>
                        <Tab LinkComponent={Link} to="/blogs" label="Home" />
                        <Tab
                          LinkComponent={Link}
                          to="/myblogs"
                          label="My Blogs"
                        />
                        <Tab
                          LinkComponent={Link}
                          to="/blogs/add"
                          label="Add Blog"
                        />
                      </Tabs>
                  
                  </MenuItem>
                </Menu>
              </Box>
              </>
            )}
           
 

            { isLoggedIn &&
            <>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blog 
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" ,flexDirection:'row'} }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Tabs textColor="white">
                  <Tab LinkComponent={Link} to="/blogs" label="Home" />
                  <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                  <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
                </Tabs>

              </Button>

            </Box>
             </> 
            }
              {!isLoggedIn && (
            <>  
            <Typography
              variant="h5"
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
              }}
            >
              Blog
            </Typography>

                  <Box display={"flex"} marginLeft={"auto"}>
                <Button
                variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                 variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                  LinkComponent={Link}
                  to="/signup"
                >
                  SignUp
                </Button>
                 </Box>
              </>
            )}


            {isLoggedIn && (
              <Button
                onClick={() => {
                  dispatch(authActions.logout());
                  localStorage.removeItem("userId");
                }}
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                LinkComponent={Link}
                to="/login"
              >
                Log out
              </Button>
            )}
         

          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
