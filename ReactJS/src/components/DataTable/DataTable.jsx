import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import generatePDF from "react-to-pdf";

import { CSVExportFiler } from "../Filer/CSV";

export function DataTable() {
  const [mssv, setMssv] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [birthdate, setBirthdate] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [dataList, setDataList] = React.useState([]);

  const handleCreateStudent = (student) => {
    if (!mssv || !fullname || !birthdate || !email)
      return alert("Please enter full field");
    if (dataList.find((e) => e.mssv === mssv))
      return alert("Duplicate student");
    setDataList((prev) => [...prev, { mssv, fullname, birthdate, email }]);
  };

  const handleDeleteStudent = (index) => {
    const dataFiltered = [...dataList];
    dataFiltered.splice(index, 1);
    setDataList(dataFiltered);
  };

  const generateFileName = () => {
    const d = new Date();
    const day = d.getDay();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return "DataTable " + day + "-" + month + "-" + year;
  };

  const targetPDF = React.useRef();

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        padding: "50px ",
        marginBottom: "20px",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          border: "2px solid grey",
          justifyContent: "flex-end",
        }}
        noValidate
        autoComplete="off"
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        mr={80}
      >
        <div>
          <TextField
            id="outlined-basic"
            label="MSSV"
            variant="outlined"
            mr={4}
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Họ và tên"
            variant="outlined"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="dataPicker"
              DateTimeFormat={window.Intl.DateTimeFormat}
              format="DD-MM-YYYY"
              onChange={(e) => {
                setBirthdate(e.format("DD-MM-YYYY"));
              }}
            />
          </LocalizationProvider>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" onClick={() => handleCreateStudent()}>
              Thêm
            </Button>
          </div>
        </div>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        {/* <Button
          variant="blue"
          onClick={() =>
            generatePDF(targetPDF, { filename: "hehe", page: { margin: 20 } })
          }
        >
          PDF
        </Button> */}
        <CSVExportFiler csvData={dataList} fileName={generateFileName()} />
      </Box>

      <div>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "500px" }}
          ref={targetPDF}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">MSSV</TableCell>
                <TableCell align="center">Họ và tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.length > 0 &&
                dataList.map((row, index) => (
                  <TableRow
                    key={index}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.mssv}</TableCell>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">{row.birthdate}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteStudent(index)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
