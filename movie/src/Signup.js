import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import "./signup.css";

const defaultTheme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [valemail, setValemail] = useState("");
  const [valpass, setValpass] = useState("");
  
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setObj({ ...obj, [name]: value });
  }
  
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const e1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const p1 =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const { email, password } = obj;
      
      if (!e1.test(email)) {
        setValemail("Please enter Valid Email id!");
        setValpass("");
      } else if (!p1.test(password)) {
        setValpass("Please enter Valid Password!");
        setValemail("");
      } else {
        setValemail("");
        setValpass("");
        let result = await fetch("http://localhost:5000/signup", {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        result = await result.json();
        
        if (result.exists) {
          setValemail("Email id is aldready registered");
        } else if (result.message) {
          navigate("/signin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#153e67',
        
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
                // border:"1px solid black",
                padding:"30px",
                background:"white",
                borderRadius:"10px"
              }}
            >
              <h1 style={{color:'#153e67'}}>Sign Up</h1>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastname"
                      autoComplete="family-name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
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
                      style={{color:'white'}}
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
                  sx={{ mt: 3, mb: 2,color:'white',backgroundColor:'#153e67',height:'45px',fontSize:'16px' }}
                >
                  Sign Up
                </Button>
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item>
                    <Link to="/signin" style={{ textDecoration: "none",color: "#153e67",fontWeight:'bold' }}>
                      Already have an account? Sign in
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
export default SignUp;