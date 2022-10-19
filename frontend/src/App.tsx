import * as React from "react";
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

function App() {
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

            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <p>ชื่อผู้ป่วย</p>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  // label="Outlined"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <p>โภชนาการแบบ</p>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  // label="Outlined"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <p>แพทย์ผู้จัดการ</p>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  // label="Outlined"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
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
