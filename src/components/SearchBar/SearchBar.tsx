import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";

import { DashboardListInterface } from "../../types/types";

interface Props {
  searchList: DashboardListInterface[];
  setFilteredList: React.Dispatch<React.SetStateAction<any>>;
}

const SearchBar = ({ searchList, setFilteredList }: Props) => {
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setFilteredList(searchList.filter((item) => {
      if (searchInput === "") {
        return item;
      } else {
        return item.name.toLowerCase().includes(searchInput);
      }
    }));
  }, [searchInput, searchList, setFilteredList]);

  return (
    <TextField
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      id="search"
      label="Wyszukaj..."
      type="search"
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};

export default SearchBar;
