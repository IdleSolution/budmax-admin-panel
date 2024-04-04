import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import Fetcher from "../../utils/Fetcher";

import DashboardLayer from "../DashboardLayer/DashbordLayer";
import NewEntryForm from "../NewEntryForm/NewEntryForm";

import { Box, CircularProgress, Snackbar } from "@mui/material";
import { CoalTypeTranslations } from "../../utils/utils";

const fetcher = new Fetcher();

interface Props {
  apiUrl: string;
  name: string;
  listUrl: string;
  fields: {
    shownName: string;
    name: string;
    defaultValue: string | number;
    values?: {
      id: number;
      value: string;
    }[]
  }[]
}

const EditEntityForm = ({ apiUrl, name, listUrl, fields }: Props) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const defaultFormValues: any = {};
  fields.map(field => defaultFormValues[field.name] = field.defaultValue)
  defaultFormValues['image'] = null;

  const [formValues, setFormValues] = useState<Record<string, any>>(defaultFormValues);

  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.fetchData<any>(
          `${apiUrl}/${id}`
        );

        setFormValues({
          ...data[name],
        // @ts-ignore
          type: CoalTypeTranslations[data[name].type],
        })

      } catch (e) {
        navigate(listUrl)
      }
      
    };

    fetchData();
  }, []);

  const submitEditedCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    fields.forEach(field => {
      if(field.values) {
        const id = formValues[field.name];
        const value = field.values.find(x => x.value === id);
        data.append(field.name, value!.value);
      } else {
        data.append(field.name, formValues[field.name]);
      }
    })

    setIsAdding(true);

    try {
      await fetcher.patchData(`${apiUrl}/${id}`, data);
      navigate(`/${name}/${id}`)
    } catch (e) {
      setNotificationMessage("Błąd przy aktualizacji!");
      console.log(e);
    }

    setIsAdding(false);
  }

  if (isAdding) {
    return (
      <DashboardLayer withTopBar={false}>
        <Box display="flex" justifyContent="center" marginTop="5rem">
          <CircularProgress size={150} />
        </Box>
      </DashboardLayer>
    );
  }

  const shownFields = fields.map(field => {
    if(field.values) {
      return {
        inputType: "select",
        name: field.shownName,
        key: field.name,
        values: field.values,
        initialValue: formValues.type,
      }
    } else {
      return {
        inputType: "stringInput",
        name: field.shownName,
        key: field.name,
      }
    }
  })

  return (
    <DashboardLayer>
      <NewEntryForm
        submitFunction={submitEditedCard}
        formValues={formValues}
        setFormValues={setFormValues}
        fields={[
          ...shownFields,
          {
            inputType: "fileInput",
            name: "Image",
            key: "image",
          },
        ]}
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

export default EditEntityForm;
