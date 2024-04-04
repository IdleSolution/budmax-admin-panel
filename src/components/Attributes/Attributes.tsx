import React, { useEffect, useState } from "react";

import DashboardLayer from "../DashboardLayer/DashbordLayer";
import DashboardList from "../DashboardList/DashboardList";

import { DashboardListInterface } from '../../types/types'
import { snakeToCamel } from '../../utils/utils';

import { CircularProgress, Box } from "@mui/material";

import Fetcher from "../../utils/Fetcher";

const fetcher = new Fetcher();

const Attributes = () => {
  const [attributeList, setAttributeList] = useState<DashboardListInterface[] | null>(null);

  useEffect(() => {
    const fetchAttributeTypes = async () => {
      const attributeTypes = await fetcher.fetchData<string[]>("/admin/attribute/types");
      const list: DashboardListInterface[] = [];
      attributeTypes.forEach(attributeType => {
        const formattedAttribute = snakeToCamel(attributeType);
        list.push({ name: formattedAttribute, path: `/attribute/${attributeType}` });
      })

      setAttributeList(list);
    };

    fetchAttributeTypes();
  }, []);


  if (!attributeList) {
    return (
      <DashboardLayer>
        <Box display="flex" justifyContent="center" marginTop="5rem">
          <CircularProgress size={150} />
        </Box>
      </DashboardLayer>
    )
  }

  return (
    <DashboardLayer>
      <DashboardList list={attributeList} />
    </DashboardLayer>
  );
};

export default Attributes;
