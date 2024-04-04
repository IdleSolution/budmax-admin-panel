import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Fetcher from "../../utils/Fetcher";

import DashboardLayer from "../DashboardLayer/DashbordLayer";

import { Box, Button, CircularProgress, Snackbar } from "@mui/material";

import CardDetailsField from "./CardDetailsFIeld";

import BasicModal from "../BasicModal/BasicModal";

import { Link } from "react-router-dom";

const fetcher = new Fetcher();

interface Props {
  apiPath: string;
  name: string;
  path: string;
  listPath: string;
  fields: {
    shownName: string;
    name: string;
  }[]
}

const CardDetails = ( { apiPath, name, path, fields, listPath }: Props) => {
  const [data, setData] = useState<any>(null);
  const [isRemoveModalOpened, setRemoveModalOpened] = useState<boolean>(false);

  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const { id = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.fetchData<any>(
          `${apiPath}/${id}`
        );
        setData(data[name]);
      } catch (e) {
        navigate(`${path}`);
      }
    };

    fetchData();
  }, [id, navigate]);

  const removeCard = async () => {
    setIsRemoving(true);
    try {
      await fetcher.deleteData(`${apiPath}/${id}`);
      navigate(`${listPath}`);
    } catch (e) {
      setNotificationMessage("Problem z usunięciem!")
      setRemoveModalOpened(false);
      console.log(e);
    }

    setIsRemoving(false);
  };

  const handleCloseRemoveModal = () => {
    setRemoveModalOpened(false);
  };

  const handleOpenRemoveModal = () => {
    setRemoveModalOpened(true);
  };

  if (!data || isRemoving) {
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
      <Box display="flex" marginTop="5rem" position="relative">
        <Box marginLeft="5rem" width="30%" height="30rem" display="flex" justifyContent="flex-end">
          <img src={data.imageUrl} alt="" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </Box>
        <Box
          width="70%"
          boxSizing="border-box"
          marginLeft="2rem"
          marginTop="1rem"
          paddingRight="5rem"
        >
          {fields.map(field => (
            <CardDetailsField name={field.shownName} value={data[field.name]} />
          ))}

          <Box display="flex" gap=".5rem" marginTop="1rem">
            <Link to={`${path}/edit/${id}`}>
              <Button variant="contained">
                Edytuj
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenRemoveModal}
            >
              Usuń
            </Button>
          </Box>
        </Box>
      </Box>
      <BasicModal
        text={"Na pewno chcesz to usunąć?"}
        yesText={"Tak"}
        yesHandler={removeCard}
        noText={"Nie"}
        noHandler={handleCloseRemoveModal}
        isOpened={isRemoveModalOpened}
      />
      <Snackbar
        open={notificationMessage.length !== 0}
        onClose={() => setNotificationMessage("")}
        message={notificationMessage}
        autoHideDuration={6000}
      />
    </DashboardLayer>
  );
};

export default CardDetails;
