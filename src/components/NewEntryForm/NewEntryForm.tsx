import React, { Dispatch, SetStateAction, FormEvent } from "react";

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

interface Props {
  fields: FieldType[];
  submitFunction: (e: FormEvent<HTMLFormElement>) => void;
  setFormValues: Dispatch<SetStateAction<Record<string, any>>>,
  formValues: Record<string, any>,
}

interface FieldType {
  inputType: string;
  name: string;
  key: string;
  values?: SelectValueType[];
  initialValue?: string;
}

interface SelectValueType {
  id: number;
  value: string;
}

const NewEntryForm = ({ fields, submitFunction, formValues, setFormValues }: Props) => {
  const handleFieldChange = (
    newValue: string | number | File,
    key: number | string
  ) => {
    const copiedValues = { ...formValues };
    copiedValues[key] = newValue;
    setFormValues(copiedValues);
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      marginTop="2rem"
      width="100%"
    >
      <form style={{ width: '30rem' }} onSubmit={submitFunction}>
        {fields.map(field => (
          <Box key={field.key} m={1}>
            {field.inputType === "stringInput" && (
              <TextField
                fullWidth
                label={field.name}
                variant="outlined"
                value={formValues[field.key]}
                onChange={e => handleFieldChange(e.target.value, field.key)}
              />
            )}

            {field.inputType === "fileInput" && (
              <Button fullWidth variant="contained" component="label">
                Dodaj zdjęcie
                <input type="file" hidden onChange={e => e.target.files ? handleFieldChange(e.target.files[0], field.key) : null} />
              </Button>
            )}

            {field.inputType === "select" && (
              <Box display="flex" alignItems="center">
                <InputLabel style={{ width: '50%' }} id={field.key} sx={{ marginRight: "1.8rem" }}>
                  {field.name}
                </InputLabel>
                <Select
                  style={{ width: '50%' }}
                  id={field.key}
                  onChange={e => handleFieldChange(e.target.value, field.key)}
                  defaultValue={field.initialValue}
                >
                  {field.values && field.values.map((value) => (
                    <MenuItem key={value.id} value={value.id}>{value.value}</MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
        ))}
        <Box m={1}>
          <Button fullWidth variant="contained" type="submit">
            Zapisz
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewEntryForm;
