import React, { useState, useEffect, FormEvent } from "react";

import NewEntryForm from "../NewEntryForm/NewEntryForm";

import Fetcher from "../../utils/Fetcher";
import DashboardLayer from "../DashboardLayer/DashbordLayer";
import { CircularProgress, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const fetcher = new Fetcher();

interface Props {
  apiUrl: string,
  path: string,
  name: string,
  fields: {
    shownName: string;
    name: string;
    defaultValue: string | number;
    values?: {
      id: number;
      value: string;
    }[];
  }[]
}

const AddEntityForm = ({ fields, apiUrl, path, name }: Props) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const defaultFormValues: any = {};
  fields.map(field => defaultFormValues[field.name] = field.defaultValue)
  defaultFormValues['image'] = null;
  const [formValues, setFormValues] = useState<Record<string, any>>(defaultFormValues);
  const navigate = useNavigate();

  const [notificationMessage, setNotificationMessage] = useState<string>("")

  const submitNewCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    fields.map(field => {
      if(field.values) {
        const id = formValues[field.name];
        const value = field.values.find(x => x.id === id);
        data.append(field.name, value!.value);
      } else {
        data.append(field.name, formValues[field.name]);
      }
    })

    data.append("image", formValues['image']);


    setIsAdding(true);

    try {
      const res = await fetcher.postData<any>(`${apiUrl}`, data);
      console.log(res);
      const id = res[name].id;
      setNotificationMessage("Dodano!")
      resetFormValues();
      navigate(`${path}/${id}`);
    } catch (e) {
      setNotificationMessage("Błąd przy dodawaniu");
      console.log(e);
    }

    setIsAdding(false);
  };

  const resetFormValues = () => {
    const formValues: any = {};

    fields.map(field => formValues[field.name] = field.defaultValue);
    formValues['image'] = null;

    setFormValues(formValues);
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

  const inputFields = fields.map(field => {
    if(field.values) {
      return {
        inputType: "select",
        name: field.shownName,
        key: field.name,
        values: field.values,
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
    <DashboardLayer withTopBar={false}>
      <NewEntryForm
        submitFunction={submitNewCard}
        formValues={formValues}
        setFormValues={setFormValues}
        fields={[
          ...inputFields,
          {
            inputType: "fileInput",
            name: "Zdjęcie",
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

export default AddEntityForm;
