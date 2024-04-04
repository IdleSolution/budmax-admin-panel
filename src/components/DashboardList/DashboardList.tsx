import React from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import { Link } from "react-router-dom";

import { DashboardListInterface } from "../../types/types";

const mocked = Array(50).fill({ name: "Archer", path: "/cards" });

interface Props {
  list?: DashboardListInterface[];
}

const DashboardList = ({ list = mocked }: Props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {list.map((item) => (
        <Link to={item.path}>
          <ListItemButton sx={{ padding: "1rem", paddingLeft: "2rem" }}>
            {item.iconUrl && (
              <ListItemIcon sx={{ width: '3rem', marginRight: '1rem' }}>
                <img style={{ width: '100%' }} src={item.iconUrl} alt="" />
              </ListItemIcon>
            )}
            <ListItemText primary={item.name} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};

export default DashboardList;
