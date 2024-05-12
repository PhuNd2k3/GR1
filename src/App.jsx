import { Route, Routes } from "react-router-dom";

import DataTable from "./components/DataTable";
import GridImage from "./components/GridImage";
import Home from "./components/Home";
import Chart from "./components/Chart/Chart.jsx";
import MainLayout from "./layouts/MainLayout.layout";
import { Maze } from "./components/Maze";
import { Map } from "./components/Map";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/data_table" element={<DataTable />} />
          <Route path="/grid_image" element={<GridImage />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/maze" element={<Maze />} />
          <Route path="/map" element={<Map />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
