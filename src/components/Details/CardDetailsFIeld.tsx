import React from "react";

import { Box, Typography } from "@mui/material";
import { CoalTypeTranslations } from "../../utils/utils";

interface Props {
  name: string;
  value: 'cube' | 'walnut' | 'eco';
}

const CardDetailsField = ({ name, value }: Props) => {
  
  if(name === 'typ') {
    value = CoalTypeTranslations[value] as any;
  }

  return (
    <Box display="flex">
      <Typography
        sx={{
          marginRight: ".5rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {name}:
      </Typography>
      <Typography sx={{ fontSize: "1.2rem" }}>{value}</Typography>
    </Box>
  );
};

export default CardDetailsField;
