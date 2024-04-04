import React, { useState } from "react";
import Fetcher from "../../utils/Fetcher";

import {
  Box,
  TextField,
  List,
  ListItemText,
  ListItem,
  IconButton,
  LinearProgress,
  Snackbar,
} from "@mui/material";

import { Delete, Edit, Close, Done } from "@mui/icons-material";

import { AttributeType } from "./Attribute";

interface Props {
  type: string,
  attributes: AttributeType[];
  setAttributes: React.Dispatch<React.SetStateAction<AttributeType[]>>
}

const fetcher = new Fetcher();

const AttributeList = ({ attributes, setAttributes, type }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingAttributeValue, setEditingAttributeValue] =
    useState<string>("");

  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  const [removeFailed, setRemoveFailed] = useState<boolean>(false);

  const removeAttribute = async (id: number) => {
    setIsRemoving(id);
    try {
      await fetcher.deleteData(`/admin/attribute/${id}`);
      const filteredAttributes = attributes.filter(
        (attribute) => attribute.id !== id
      );
      setAttributes([...filteredAttributes]);
    } catch (e) {
      setRemoveFailed(true);
    }

    setIsRemoving(null);
  };

  const updateAttribute = async (id: number, newValue: string) => {
    const newAttributes = attributes.map((attribute) => {
      if (attribute.id === id) {
        return {
          id,
          value: newValue,
        };
      }

      return attribute;
    });
    setAttributes([...newAttributes]);
    setEditingId(null);
    fetcher.patchData(`/admin/attribute/${id}`, { type, value: newValue });
  };

  return (
    <List>
      {attributes
        .sort((a, b) => b.id - a.id)
        .map((attribute) => (
          <>
            <ListItem
              style={{ padding: ".5rem" }}
              key={attribute.id}
              secondaryAction={
                <>
                  <IconButton
                    style={{ marginRight: 0 }}
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setEditingId(attribute.id);
                      setEditingAttributeValue(attribute.value);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeAttribute(attribute.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              {editingId === attribute.id ? (
                <Box display="flex" alignItems="center">
                  <TextField
                    value={editingAttributeValue}
                    onChange={(e) => setEditingAttributeValue(e.target.value)}
                  />
                  <IconButton
                    style={{ marginRight: 0 }}
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      updateAttribute(attribute.id, editingAttributeValue)
                    }
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => setEditingId(null)}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ) : (
                <ListItemText primary={attribute.value} />
              )}
            </ListItem>
            {isRemoving && isRemoving === attribute.id && (
              <LinearProgress color="error" />
            )}
            <Snackbar
              open={removeFailed}
              onClose={() => setRemoveFailed(false)}
              message="Can't remove this attribute"
              autoHideDuration={6000}
            />
          </>
        ))}
    </List>
  );
};

export default AttributeList;
