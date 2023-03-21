import React, { useReducer, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CatsService } from "../services/api/cats-service";
import { useRouter } from "next/router";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AddBoxIcon from "@mui/icons-material/AddBox";

const service = new CatsService();

interface FormFields {
  label: string;
  id: string;
  name: string;
  description: string;
}

export const CatForm: React.FC<FormFields> = ({
  label,
  id,
  name,
  description,
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [fieldValues, setFieldValues] = useState({
    id: id,
    name: name,
    description: description,
    group: "",
  });

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (name) => (event) => {
    setFieldValues({ ...fieldValues, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (label === "Modify") {
      service.update({
        id: fieldValues.id,
        name: fieldValues.name,
        description: fieldValues.description,
        group: fieldValues.group,
      });
      setOpenSnackBar(true);
      router.push({ pathname: "/cats" });
    } else {
      service.register({
        id: fieldValues.id,
        name: fieldValues.name,
        description: fieldValues.description,
        group: fieldValues.group,
      });
      setOpenSnackBar(true);
      router.push({ pathname: "/cats" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h3">
          {label} Cat
        </Typography>
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: theme.spacing(3, 2),
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <TextField
              style={{ marginTop: "20px", marginRight: "30px" }}
              label="Cat Name"
              id="name-helperText"
              value={fieldValues.name}
              helperText="Enter the Cat's name"
              onChange={handleChange("name")}
              sx={{
                marginleft: theme.spacing(1),
                marginright: theme.spacing(1),
                width: 400,
              }}
            />
            <TextField
              style={{ marginTop: "20px", marginRight: "30px" }}
              label="Description"
              id="description-helperText"
              helperText="Describe the Cat"
              value={fieldValues.description}
              onChange={handleChange("description")}
              sx={{
                marginleft: theme.spacing(1),
                marginright: theme.spacing(1),
                width: 400,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
              style={{ marginTop: "20px", marginBottom: "20px" }}
              startIcon={
                label === "Modify" ? <AutoFixHighIcon /> : <AddBoxIcon />
              }
            >
              {label} Cat
            </Button>
            <Snackbar
              open={openSnackBar}
              autoHideDuration={10000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                The Cat is Permanently deleted !!!
              </Alert>
            </Snackbar>
          </div>
        </Paper>
      </form>
    </div>
  );
};
