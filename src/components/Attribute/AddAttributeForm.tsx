import React, { FormEvent, useState } from "react";
import Fetcher from "../../utils/Fetcher";

import { Box, TextField, Button, LinearProgress } from "@mui/material";

import { AttributeType } from "./Attribute";

interface Props {
  type: string,
  attributes: AttributeType[],
  setAttributes: React.Dispatch<React.SetStateAction<AttributeType[]>>
}

const fetcher = new Fetcher();

const AddAttributeForm = ({ attributes, setAttributes, type }: Props) => {
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const createAttribute = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAttributeValue.length) return;
    setIsAdding(true);
    try {
      const { id, value } = await fetcher.postData<AttributeType>(
        "/admin/attribute",
        { type, value: newAttributeValue }
      );
      setNewAttributeValue("");
      setAttributes([...attributes, { id, value }]);
    } catch (e) {
      console.log(e);
    }
    setIsAdding(false);
  };

  return (
    <Box>
      <form onSubmit={createAttribute} style={{ display: "flex" }}>
        <TextField
          fullWidth
          label="New attribute value"
          variant="outlined"
          value={newAttributeValue}
          onChange={(e) => setNewAttributeValue(e.target.value)}
        />
        <Button
          style={{ width: "8rem" }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isAdding}
        >
          Add
        </Button>
      </form>
      {isAdding && <LinearProgress color="success" />}
    </Box>
  );
};

export default AddAttributeForm;
