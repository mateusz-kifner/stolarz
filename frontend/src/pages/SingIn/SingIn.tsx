import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserSettingsContext } from "../../context/UserSettingsContext";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: "1.5rem",
    marginBottom: "3rem",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

function SingIn() {
  const { register, handleSubmit, errors, setValue } = useForm();
  const classes = useStyles();
  const userContext = useContext(UserSettingsContext);
  const [error, setError] = useState<boolean>(false);
  return (
    <Dialog fullScreen open={true}>
      <DialogTitle id="form-dialog-title">Stolarz</DialogTitle>
      <DialogContent>
        <DialogContentText>
          MVP aplikacji mobilnej dla stolarza do zleceń, listy zakupów i
          podlicznia finansów.
        </DialogContentText>
        {error && (
          <DialogContentText color="error">
            Niepoprawny email albo hasło
          </DialogContentText>
        )}
        <form
          onSubmit={handleSubmit(
            (values: { login: string; password: string }) => {
              setError(!userContext.singin(values.login, values.password));
            }
          )}
          className={classes.form}
        >
          <Container maxWidth="sm" className={classes.fieldsContainer}>
            <TextField
              name="login"
              inputRef={register({ required: true })}
              label="Login"
              error={"login" in errors}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              name="password"
              inputRef={register({ required: true })}
              label="Password"
              error={"password" in errors}
              variant="outlined"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
            />

            <Button type="submit" color="primary" variant="contained" fullWidth>
              Sing In
            </Button>
          </Container>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SingIn;
