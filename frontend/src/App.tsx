import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

import { FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import setSeconds from "date-fns/setSeconds";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { DoctorInterface } from "../src/interfaces/IDoctor";
import { ManageInterface } from "../src/interfaces/IMange";
import { Map_BedInterface } from "../src/interfaces/IMap_Bed";
import { NutritionInterface } from "../src/interfaces/INutrition";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

function App() {
  //[ตารางหลัก]
  const [doctorID, setDoctorID] = useState("");
  const [nutritionID, setNutritionID] = useState("");
  const [map_bed, setMap_Bed] = useState("");
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [comment, setComment] = useState<String>("");

  // data ที่ได้มาจากการ fethch
  const [doctor, setDoctor] = useState<DoctorInterface[]>([]);
  const [nutrition, setNutrition] = useState<NutritionInterface[]>([]);
  const [mb, setMB] = useState<Map_BedInterface[]>([]);
  const [manage, setManage] = useState<ManageInterface[]>([]);

  //check save
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // function submit
  async function submit() {
    // async function = Synchronous
    // เตรียม data ที่จะส่งออก
    let data = {
      DoctorID: doctorID,
      NutritionID: nutritionID,
      Map_BedID: map_bed,
      Date: date,
      Comment: comment,
    };
    console.log(data); // log ดู data

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccess(false);
      setError(false);
    };

    const apiUrl = "http://localhost:8888/manage";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  // ใส่ Field ใน Text Field comment
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof App;
    const { value } = event.target.value;
    setManage({ ...manage, [id]: value });
    setComment(value);
  };

  // onchange in combobox //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const onChangeDoctor = (event: SelectChangeEvent) => {
    setDoctorID(event.target.value as string);
  };

  const onChangeNutrition = (event: SelectChangeEvent) => {
    setNutritionID(event.target.value as string);
  };

  const onChangeMap_Bed = (event: SelectChangeEvent) => {
    setMap_Bed(event.target.value as string);
  };

  //function Search
  // function search() {
  //   const apiUrl1 = `http://localhost:8080/GetTriage/${triageID}`;
  //   const requestOptions1 = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(apiUrl1, requestOptions1)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         //console.log(res.data);
  //         setIPD_Name(res.data.InpantientDepartment.InpantientDepartment_NAME);
  //         setDisease_Name(res.data.Disease.Disease_NAME);
  //         setDiseaseType(res.data.Disease.DiseaseType.DiseaseType_NAME);
  //         setGenderType(res.data.Patient.Gender.Gender_Name);
  //       }
  //     });
  // }

  //function fetch data จาก backend
  const getDoctor = async () => {
    const apiUrl = "http://localhost:8888/doctors";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDoctor(res.data);
        }
      });
  };

  const getNutrition = async () => {
    const apiUrl = "http://localhost:8888/nutritions";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setNutrition(res.data);
        }
      });
  };

  const getMap_Bed = async () => {
    const apiUrl = "http://localhost:8888/map_beds";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMB(res.data);
        }
      });
  };

  //========function useEffect ========
  useEffect(() => {
    getDoctor();
    getNutrition();
    getMap_Bed();
  }, []);

  //Uer inter face

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ระบบเพิ่มโภชนาการผู้ป่วยใน
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md">
        <Box>
          <Paper>
            <Box
              display={"flex"}
              sx={{
                marginTop: 3,
                marginX: 2,

                paddingX: 2,
                paddingY: 0,
              }}
            >
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  gutterBottom
                  sx={{ paddingTop: 2 }}
                >
                  โภชนาการ
                </Typography>
              </Box>
            </Box>
            <Divider />

            <Grid
              container
              rowSpacing={1}
              columnSpacing={5}
              sx={{ paddingX: 5 }}
            >
              <Grid item xs={6}>
                <p>ชื่อผู้ป่วย</p>
                <FormControl fullWidth>
                  <Select
                    id="Patient_Name"
                    value={map_bed}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={onChangeMap_Bed}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    {mb.map((mb) => (
                      <MenuItem value={mb.ID} key={mb.ID}>
                        {mb.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>โภชนาการแบบ</p>
                <FormControl fullWidth>
                  <Select
                    id="Patient_Name"
                    value={nutritionID}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={onChangeNutrition}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    {nutrition.map((nutrition) => (
                      <MenuItem value={nutrition.ID} key={nutrition.ID}>
                        {nutrition.Type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <p>แพทย์ผู้จัดการ</p>
                <FormControl fullWidth>
                  <Select
                    id="Patient_Name"
                    value={doctorID}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={onChangeDoctor}
                  >
                    <MenuItem value="">เลือก</MenuItem>
                    {doctor.map((doctor) => (
                      <MenuItem value={doctor.ID} key={doctor.ID}>
                        {doctor.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <p>Date Time</p>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      // label="Curreunt Time"
                      // mask="__/__/____ __:__"
                      // views={["year", "month", "day"]}
                      value={date}
                      onChange={(date) => {
                        setDate(date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p>หมายเหตุ</p>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="โภชนาการเพิ่มเติม"
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                  // defaultValue="Default Value"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" sx={{ marginY: 3 }}>
                  Black
                </Button>
                <Button
                  variant="contained"
                  sx={{ float: "right", marginY: 3 }}
                  color="success"
                  onClick={submit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default App;
