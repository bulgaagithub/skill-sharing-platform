import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { getData } from "./read-md";

const ContractModal = () => {

 const readData = getData()

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple w="100%">
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Үйлчилгээний нөхцөл
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} bg="whiteAlpha.500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ContractModal;
