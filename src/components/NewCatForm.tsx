import React, { useReducer, useState } from "react";
import {
  Button,
  Icon,
  FormControl,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { jsx, css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { CatsService } from "@/services/api/cats-service";
import { useRouter } from "next/router";

const service = new CatsService();

export function NewCatForm(props: any) {
  const router = useRouter();

  const theme = useTheme();

  const styles = {
    root: css`
      padding: theme.spacing(3, 2);
    `,
    link: css`
      marginleft: theme.spacing(1);
      marginright: theme.spacing(1);
      width: 400;
    `,
    title: css`
      margin: 0 auto;
      max-width: 960;
      padding: 1.45rem 1.0875rem;
    `,
  };

  const [fieldValues, setFieldValues] = useState({
    name: "",
    description: "",
  });

  const handleChange = (name) => (event) => {
    setFieldValues({ ...fieldValues, [name]: event.target.value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    service.create({
      id: "",
      name: fieldValues.name,
      description: fieldValues.description,
      group: "",
    });
    router.push({ pathname: "/cats" });
  };

  return (
    <div>
      <Typography variant="h5" component="h3">
        Modify Cat Information
      </Typography>
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: theme.spacing(3, 2),
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ marginTop: "10px" }}
            label="Cat Name"
            id="name-helperText"
            value={fieldValues.name}
            helperText="Enter your full name"
            onChange={handleChange("name")}
            sx={{
              marginleft: theme.spacing(1),
              marginright: theme.spacing(1),
              width: 400,
            }}
          />
          <TextField
            style={{ marginTop: "20px" }}
            label="Description"
            id="description-helperText"
            helperText="Very Lazy Pussy Cat"
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
          >
            Add Cat
          </Button>
        </form>
      </Paper>
    </div>
  );
}
