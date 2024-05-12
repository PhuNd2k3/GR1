import React, { useState } from "react";
import Box from "@mui/material/Box";
import catImage from "../assets/CatImage";

export default function GridImage() {
  const [position, setPosition] = useState([1, 1]);

  const handleChangePosition = (index, newValue) => {
    const newPosition = [...position];
    newPosition[index] = Number(newValue);
    setPosition(newPosition);
  };

  const renderGridImages = () => {
    const images = [];

    for (let i = 0; i < position[0]; i++) {
      const rowImages = [];

      for (let j = 0; j < position[1]; j++) {
        const imageIndex = (i * position[1] + j) % Object.keys(catImage).length;
        const imageName = Object.keys(catImage)[imageIndex];
        const imagePath = catImage[imageName];

        rowImages.push(
          <img
            key={imageIndex}
            src={imagePath}
            alt="Cat Image"
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        );
      }

      images.push(
        <div key={i} style={{ display: "flex" }}>
          {rowImages}
        </div>
      );
    }

    return images;
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
      p={5}
    >
      <Box p={10}>
        <table>
          <tbody>
            <tr>
              <th>M</th>
              <th>N</th>
            </tr>
            <tr>
              <td>
                <input
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    textAlign: "center",
                  }}
                  value={position[0]}
                  onChange={(e) => handleChangePosition(0, e.target.value)}
                />
              </td>
              <td>
                <input
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    textAlign: "center",
                  }}
                  value={position[1]}
                  onChange={(e) => handleChangePosition(1, e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      <Box
        sx={{
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
        }}
      >
        {renderGridImages()}
      </Box>
    </Box>
  );
}
