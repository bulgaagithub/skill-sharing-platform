import React, { useEffect, useState } from "react";
import { Box, Button, Text, Textarea } from "@chakra-ui/react";

const TextArea = ({ loading, mention, handleSubmit }) => {
  return (
    <Box w={300}>
      <form onSubmit={handleSubmit}>
        <Textarea rows={3} maxLength={250} name="comment">
          {mention}
        </Textarea>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button
            isLoading={loading}
            type="submit"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            color="#fff"
            size="sm"
            _hover={{ bgGradient: "linear(to-l, #FF0080, #7928CA)" }}
          >
            Илгээх
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TextArea;
