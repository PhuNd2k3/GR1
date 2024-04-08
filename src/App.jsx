import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import DataTable from "./components/DataTable";
import GridImage from "./components/GridImage";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout.layout";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/data_table" element={<DataTable />} />
          <Route path="/grid_image" element={<GridImage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
