import React from "react";
import FormHeader from "./formheader/FormHeader";
import Template from "./template/Template";
import MainFormBody from "./mainformbody/MainFormBody";
import { Routes, Route } from "react-router-dom";
import FormBuilder from "./createform/FormBuilder";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const FormPage = () => {
  return (
    <>
      <FormHeader />
      <Routes>
        <Route
          path="/create/:id"
          element={
            <>
              <FormBuilder />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Template />
              <MainFormBody />
            </>
          }
        />
      </Routes>

      <Box sx={{ width: "fit-content", margin: "0 auto" }}>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#9C27B0",
            color: "white",
            fontSize: "20px",
            padding: "10px 60px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "opacity 0.36s ease", // Add transition property for opacity
            "&:hover": {
              backgroundColor: "#BA68C8",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default FormPage;
