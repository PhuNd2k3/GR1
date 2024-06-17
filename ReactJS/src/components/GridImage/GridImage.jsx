import { useState } from "react";
import { Box, Stack, Button, TextField } from "@mui/material";

import catImage from "../../assets/CatImage";

export function GridImage() {
  const [matrix, setMatrix] = useState([1, 1]);
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);

  const handleChangeRow = (row) => {
    setRow(Number(row));
  };

  const handleChangeCol = (col) => {
    setCol(Number(col));
  };

  const handleSubmit = () => {
    setMatrix([row, col]);
  };

  const renderGridImages = () => {
    const images = [];

    for (let i = 0; i < matrix[0]; i++) {
      const rowImages = [];

      for (let j = 0; j < matrix[1]; j++) {
        const imageIndex = (i * matrix[1] + j) % Object.keys(catImage).length;
        const imageName = Object.keys(catImage)[imageIndex];
        const imagePath = catImage[imageName];

        rowImages.push(
          <img
            key={imageIndex}
            src={imagePath}
            alt="Cat Image"
            style={{
              width: "100px",
              height: "100px",
              margin: "5px",
            }}
          />
        );
      }

      images.push(<div key={i}>{rowImages}</div>);
    }

    return images;
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
      p={0}
    >
      <Stack sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          pb={5}
        >
          <Box
            sx={{
              display: "flex",
            }}
            pt={5}
          >
            <TextField
              id="outlined-basic"
              label="Row"
              variant="outlined"
              mr={4}
              value={row}
              onChange={(e) => handleChangeRow(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Column"
              variant="outlined"
              value={col}
              onChange={(e) => handleChangeCol(e.target.value)}
              sx={{ marginLeft: "10px" }}
            />

            <div
              style={{
                display: "flex",
                alignSelf: "center",
                marginLeft: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{ height: "40px" }}
                onClick={() => handleSubmit()}
                ml={4}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            flexWrap: "wrap",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          p={5}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>{renderGridImages()}</Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
