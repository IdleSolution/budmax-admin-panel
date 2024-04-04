import React from "react";

import SideBarLayer from "../SideBarLayer/SideBarLayer";
import TopBar from "../TopBar/TopBar";

import { DashboardListInterface } from "../../types/types";

import { Box } from '@mui/material'

interface Props {
  children: React.ReactNode;
  withTopBar?: boolean;
  newEntryPath?: string;
  searchList?: DashboardListInterface[];
  setFilteredList?: React.Dispatch<React.SetStateAction<any>>;
}

const DashboardLayer = ({ children, withTopBar = true, newEntryPath, searchList, setFilteredList }: Props) => {
  return (
    <SideBarLayer>
      <Box width={'100%'}>
        {withTopBar && <TopBar newEntryPath={newEntryPath} searchList={searchList} setFilteredList={setFilteredList} />}
        {children}
      </Box>
    </SideBarLayer>
    )
};

export default DashboardLayer;
