import React from 'react';

import { Modal } from "@mui/material";

import { Box, Button, Typography } from "@mui/material";

interface Props {
  text: string;
  yesText: string;
  yesHandler: () => void;
  noText: string;
  noHandler: () => void;
  isOpened: boolean;
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const BasicModal = ({ text, yesText, noText, yesHandler, noHandler, isOpened }: Props) => {
  return (
    <Modal open={isOpened} onClose={noHandler}>
      <Box sx={modalBoxStyle}>
        <Typography>{text}</Typography>
        <Box display="flex" gap=".5rem" marginTop="1rem">
          <Button variant="contained" onClick={yesHandler}>{yesText}</Button>
          <Button variant="contained" color="error" onClick={noHandler}>{noText}</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default BasicModal;