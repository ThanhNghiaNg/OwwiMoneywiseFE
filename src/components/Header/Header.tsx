import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { BASE_URL, HREFS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { authActions } from "../../store/authSlice";
import useHttp from "../../hooks/useHttp";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const dispatch = useDispatch();
  const isLoggedIn = !!useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { sendRequest } = useHttp();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    { name: "Home", href: HREFS.home, isShow: true },
    { name: "Dashboard", href: HREFS.dashboard, isShow: isLoggedIn },
    { name: "Transactions", href: HREFS.transactions, isShow: isLoggedIn },
    { name: "Login", href: HREFS.login, isShow: !isLoggedIn },
    {
      name: "Profile",
      href: HREFS.profile,
      isShow: isLoggedIn,
    },
    {
      name: "Logout",
      href: HREFS.login,
      isShow: isLoggedIn,
      icon: <LogoutIcon />,
      handleOnClick: () => {
        sendRequest({ url: `${BASE_URL}/logout`, method: "POST" });
        dispatch(authActions.logout());
        navigate(HREFS.login);
      },
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        OWWI
      </Typography>
      <Divider />
      <List>
        {navItems
          .filter((item) => item.isShow)
          .map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={
                  item.handleOnClick
                    ? item.handleOnClick
                    : () => {
                        navigate(item.href);
                      }
                }
              >
                {item.icon ? item.icon : <ListItemText primary={item.name} />}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            OWWI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems
              .filter((item) => item.isShow)
              .map((item) => (
                <Button
                  key={item.name}
                  sx={{ color: "#fff" }}
                  onClick={
                    item.handleOnClick
                      ? item.handleOnClick
                      : () => {
                          navigate(item.href);
                        }
                  }
                >
                  {item.icon ? item.icon : item.name}
                </Button>
              ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
