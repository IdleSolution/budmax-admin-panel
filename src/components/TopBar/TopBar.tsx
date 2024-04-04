import React from "react";

import { Box, Button } from "@mui/material";

import { Link } from 'react-router-dom';
import { DashboardListInterface } from "../../types/types";

import SearchBar from "../SearchBar/SearchBar";

interface Props {
  newEntryPath?: string;
  searchList?: DashboardListInterface[];
  setFilteredList?: React.Dispatch<React.SetStateAction<any>>;
}

const TopBar = ({ newEntryPath, searchList, setFilteredList }: Props) => {
  return (
    <Box display="flex" justifyContent="center" marginTop="1rem">
      <Box width="30%" marginLeft="auto">
        {searchList && setFilteredList && <SearchBar searchList={searchList} setFilteredList={setFilteredList} />}
      </Box>
      <Box marginLeft="auto" marginRight="1rem">
        {newEntryPath && <Link to={newEntryPath}><Button variant="contained">Dodaj</Button></Link>}
      </Box>
    </Box>
  );
};

export default TopBar;
