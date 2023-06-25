import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  message: {
    width: "100%"
  }
}));
const TextInputComponent = ({ field, form, ...props }) => {
  const classes = useStyles();

  const { label, variant, hidden } = props;
  const { name, value, onChange, onBlur } = field;
  const { touched, errors } = form;

  // console.log("props ", props)
  // console.log("fields ", field)

  return (
    <div>
      {hidden === "true" ? (
        <>
          <TextField
            className={classes.message}
            rows={10}
            name={name}
            label={label}
            error={touched[name] && errors[name]}
            value={value}
            helperText={
              touched[name] && !!errors[name] ? errors[name] : undefined
            }
            onChange={onChange}
            onBlur={onBlur}
            multiline
            hidden
            variant={variant}
          />
        </>
      ) : (
        <>
          <TextField
            className={classes.message}
            rows={10}
            name={name}
            label={label}
            error={touched[name] && !!errors[name]}
            value={value}
            helperText={
              touched[name] && !!errors[name] ? errors[name] : undefined
            }
            onChange={onChange}
            onBlur={onBlur}
            multiline
            variant={variant}
          />
        </>
      )}
    </div>
  );
};
export default TextInputComponent;
