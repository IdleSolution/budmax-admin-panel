import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, AccountBox } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const sideBarItems = [
  {
    id: 1,
    icon: <Dashboard />,
    name: "Węgle",
    path: "/coals",
  },
  {
    id: 2,
    icon: <Dashboard />,
    name: "Pellety",
    path: "/pellets",
  },
  {
    id: 3,
    icon: <Dashboard />,
    name: "Kamienie",
    path: "/stones",
  },
  {
    id: 4,
    icon: <Dashboard />,
    name: "Auta",
    path: "/buses",
  },
  
];

const SidebarLayer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <DrawerHeader />
        <List>
          {sideBarItems.map((sideBarItem) => (
            <Link
              key={sideBarItem.id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={sideBarItem.path}
            >
              <ListItemButton>
                <ListItemIcon>{sideBarItem.icon}</ListItemIcon>
                <ListItemText primary={sideBarItem.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      {children}
    </Box>
  );
};

export default SidebarLayer;
