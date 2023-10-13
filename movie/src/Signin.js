import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./signin.css";

import Alert from "@mui/material/Alert";
import { ClassNames } from "@emotion/react";
const defaultTheme = createTheme();

function Signin() {
  const [obj, setObj] = useState({});
  const navigate = useNavigate();
  const [valemail, setValemail] = useState("");
  const [valpass, setValpass] = useState("");
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setObj({ ...obj, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(obj);
    try {
      let result = await fetch("http://localhost:5000/signin", {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.notemail) {
        setValemail(result.notemail);
        setValpass("");
      } else if (result.notpassword) {
        setValpass(result.notpassword);
        setValemail("");
      } else if (result.message) {
        setValemail("");
        setValpass("");
        localStorage.setItem("movieicons", true);
        localStorage.setItem("moviemail", result.getemail);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#153e67",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <h1 style={{color:'#153e67'}}>Sign In</h1>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      autoFocus
                      sx={{
                        borderColor:'white'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {valemail && <Alert severity="error">{valemail}</Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {valpass && <Alert severity="error">{valpass}</Alert>}
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: "45px",
                    backgroundColor: "#153e67",
                    fontSize: "16px",
                  }}
                >
                  Sign In
                </Button>
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#153e67",fontWeight:'bold' }}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        </Container>
      </ThemeProvider>
    </div>
  );
}
export default Signin;
