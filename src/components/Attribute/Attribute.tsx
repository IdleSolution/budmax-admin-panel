import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayer from "../DashboardLayer/DashbordLayer";
import AddAttributeForm from "./AddAttributeForm";
import AttributeList from "./AttributeList";

import {
  CircularProgress,
  Box,
} from "@mui/material";

import Fetcher from "../../utils/Fetcher";

const fetcher = new Fetcher();

export type AttributeType = {
  id: number;
  value: string;
};

const Attribute = () => {
  const [fetchedAttributes, setFetchedAttributes] = useState<boolean>(false);
  const [attributeValues, setAttributeValues] = useState<AttributeType[]>([]);

  const { type = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const attribute = await fetcher.fetchData<AttributeType[]>(
          `/admin/attribute/${type}`
        );
        setAttributeValues(attribute);
        setFetchedAttributes(true);
      } catch (e) {
        navigate("/attributes");
      }
    };

    fetchAttribute();
  }, []);

  if (!fetchedAttributes) {
    return (
      <DashboardLayer withTopBar={false}>
        <Box display="flex" justifyContent="center" marginTop="5rem">
          <CircularProgress size={150} />
        </Box>
      </DashboardLayer>
    );
  }

  return (
    <DashboardLayer withTopBar={false}>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="1rem"
        flexDirection="column"
        margin="2rem 5rem"
      >
        <AddAttributeForm
          type={type}
          attributes={attributeValues}
          setAttributes={setAttributeValues}
        />

        <AttributeList
          type={type}
          attributes={attributeValues}
          setAttributes={setAttributeValues}
        />
       
      </Box>
    </DashboardLayer>
  );
};

export default Attribute;
