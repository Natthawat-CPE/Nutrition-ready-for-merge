import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

function App() {
  const top100Films = () => [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  const [value, setValue] = React.useState<Date | null>(null);

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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="md">
        <Box
        // sx={{
        //   display: "flex",
        //   "& > :not(style)": {
        //     m: 1,
        //     width: 700,
        //     // height: 600,
        //   },
        // }}
        >
          <Paper>
            <Box
              display={"flex"}
              sx={{
                marginTop: 2,
                marginX: 2,
                padding: 0,
              }}
            >
              <h2>เพิ่มโภชนาการ</h2>
            </Box>
            <hr />

            <Grid container spacing={5} sx={{ padding: 5 }}>
              <Grid item xs={6}>
                <p>ชื่อผู้ป่วย</p>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films()}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="เลือก" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <p>โภชนาการแบบ</p>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films()}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="เลือก" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <p>แพทย์ผู้จัดการ</p>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films()}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Lock-Doctor" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <p>Date Time</p>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <p>หมายเหตุ</p>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  // label="Outlined"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default App;
