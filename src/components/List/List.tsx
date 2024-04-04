import React, { useEffect, useState } from "react";

import DashboardLayer from "../DashboardLayer/DashbordLayer";
import DashboardList from "../DashboardList/DashboardList";

import { DashboardListInterface } from '../../types/types';
import { CircularProgress, Box } from "@mui/material";

import Fetcher from "../../utils/Fetcher";

const fetcher = new Fetcher();

interface Props {
  apiUrl: string;
  name: string;
  fields: {
    name: string;
    pathDetail: string;
  };
  path: string;
}

const List = ( { apiUrl, name, fields, path }: Props ) => {
  const [dataList, setDataList] = useState<DashboardListInterface[] | null>(null);
  const [filteredList, setFilteredList] = useState<DashboardListInterface[] | null>(null);

  useEffect(() => {
    setDataList(null);
    const fetchCoals = async () => {
      const res = await fetcher.fetchData<any>(apiUrl);
      const mappedData = mapToList(res[name]);
      setDataList(mappedData);
      setFilteredList(mappedData);
    };

    fetchCoals();
  }, [apiUrl]);

  const mapToList = (data: any): DashboardListInterface[] => {
    return data.map((d: any) => ({
      name: d[fields.name],
      path: `/${fields.pathDetail}/${d.id}`,
      iconUrl: d.imageUrl,
    }))
  }

  if (!dataList || !filteredList) {
    return (
      <DashboardLayer withTopBar={false}>
        <Box display="flex" justifyContent="center" marginTop="5rem">
          <CircularProgress size={150} />
        </Box>
      </DashboardLayer>
    )
  }

  return (
    <DashboardLayer searchList={dataList} setFilteredList={setFilteredList} newEntryPath={`/add${apiUrl}`}>
      <DashboardList list={filteredList} />
    </DashboardLayer>
  );
};

export default List;
