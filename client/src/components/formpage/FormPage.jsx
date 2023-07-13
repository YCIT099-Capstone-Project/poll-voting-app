import React from "react";
import FormHeader from "./formheader/FormHeader";
import Template from "./template/Template";
import MainFormBody from "./mainformbody/MainFormBody";
import { Routes, Route } from "react-router-dom";
import FormBuilder from "./createform/FormBuilder";
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
    </>
  );
};

export default FormPage;
