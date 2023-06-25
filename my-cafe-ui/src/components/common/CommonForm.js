import { Formik, Field, getIn } from "formik";
import { Grid, Paper, MenuItem } from '@mui/material';
import { TextField } from "formik-mui";
// import FileComponent from './FileComponent';
import TextInputComponent from './TextInputComponent';
import { CustomizedPrimaryButton, FileUploadButton, CustomizedCancelButton } from './CustomizedPrimaryButton';

function CommonForm({
    onSubmit = () => { },
    handleCancel = () => { },
    validationSchema,
    initialValues = {},
    validateOnBlur = true,
    validateOnChange = true,
    fields = [],
    submitLabel = "Submit",
    showSubmitButton = true,
    submittingLabel = "Submit",
    enableReinitialize = false,

    showCancelButton = false,
    cancelLabel = "Cancel",
    cancellingLabel = "Cancelling",
    ...props
}) {

    const defaultMetaProps = {
        margin: "dense",
        variant: "outlined",
        fullWidth: true
    };

    const defaultGridProps = {
        xs: 12
    };

    const renderFields = (formProps, options = { nested: false }) => field => {
        const {
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            handleBlur,
            handleChange
            /* and other goodies */
        } = formProps;

        const gridProps = !!field && {
            ...defaultGridProps,
            ...field.grid
        };
        const metaProps = !!field && {
            ...defaultMetaProps,
            ...field.meta
        };

        return !!field ? (
            <Grid key={field.name} item {...gridProps}>
                {field.type === "email" && (
                    <Field
                        type="email"
                        name={field.name}
                        label={field.label}
                        component={TextField}
                        placeholder={field.placeholder || ""}
                        InputLabelProps={{ shrink: true }}
                        {...metaProps}
                    />
                    // eslint and prettier
                )}
                {(field.type === "password") && (
                    <Field
                        type="password"
                        name={field.name}
                        component={TextField}
                        label={field.label}
                        placeholder={field.placeholder || ""}
                        disabled={field.disabled}
                        autoComplete={field.name}
                        {...metaProps}
                    />
                )}
                {(field.type === "text" || field.type === "number") && (
                    <Field
                        type={field.type || "text"}
                        name={field.name}
                        component={TextField}
                        label={field.label}
                        placeholder={field.placeholder || ""}
                        disabled={field.disabled}
                        autoComplete={field.name}
                        {...metaProps}
                    />
                )}
                {field.type === "textarea" && (
                    <Field
                        name={field.name}
                        component={TextInputComponent}
                        disabled={field.disabled}
                        label={field.label}
                        errorMessage={getIn(errors, field.name)}
                        // touched={getIn(errors, field.name)}
                        {...metaProps}

                    />
                )}
                {field.type === "fileUpload" && (
                    console.log("field here ===========", field, field.name),
                    <Field
                        name={field.name}
                        component={FileUploadButton}
                        label="Select a file"
                        setFieldValue={setFieldValue}
                        value={field.name}
                        width="12"
                        errorMessage={getIn(errors, field.name)}
                        touched={getIn(errors, field.name)}
                        style={{ display: "flex" }}
                        onBlur={handleBlur}
                    />
                )}

                {field.type === "select" && (
                    <Field
                        name={field.name}
                        id={field.name}
                        label={field.label}
                        disabled={field.disabled}
                        component={TextField}
                        select
                        placeholder={field.placeholder || field.label || ""}
                        inputProps={
                            !!field.customOnChange
                                ? {
                                    onChange: async e => {
                                        setFieldTouched(field.name, true, false);
                                        setFieldValue(field.name, e.target.value);
                                        await field.customOnChange(e.target.value);
                                    },
                                    value: getIn(values, field.name),
                                    shrink: true
                                }
                                : {}
                        }
                        {...metaProps}
                    >
                        <MenuItem disabled value="none">
                            {field.label}
                        </MenuItem>
                        {field.option.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Field>
                )}

            </Grid>
        ) : null;

    }

    return (
        <div className="common-form">
            <div className="data-form">
                <Formik
                    initialValues={initialValues}
                    validateOnBlur={validateOnBlur}
                    validateOnChange={validateOnChange}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    ref={props.formikRef}
                    enableReinitialize={!!enableReinitialize}
                >
                    {formProps => {
                        const {
                            errors,
                            handleSubmit,
                            isSubmitting,
                            submitForm,
                            handleReset,
                            isCancelling
                        } = formProps;
                        return (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {fields && fields.map(renderFields(formProps))}

                                    {!!props.formFooter && <>{props.formFooter}</>}

                                    {showSubmitButton && (
                                        <CustomizedPrimaryButton
                                            fullWidth={true}
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            onClick={() => submitForm()}
                                            className={`${isSubmitting ? "inactive-button" : ""} `}
                                            disabled={isSubmitting}
                                            label={!isSubmitting ? submitLabel : submittingLabel}
                                            position={props.buttonPosition}
                                            width={props.buttonSize}
                                            inlineButton={props.inlineButton}
                                        ></CustomizedPrimaryButton>
                                    )}

                                    {showCancelButton && (
                                        <CustomizedCancelButton
                                            fullWidth={true}
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            onClick={handleCancel}
                                            className={`${isCancelling ? "inactive-button" : ""} `}
                                            disabled={isCancelling}
                                            label={!isCancelling ? cancelLabel : cancellingLabel}
                                            position={props.cancelButtonPosition}
                                            width={props.buttonSize}
                                            inlineButton={props.inlineCancelButton}
                                            type="button"
                                        ></CustomizedCancelButton>
                                    )}
                                </Grid>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div >
    );
}

export default CommonForm;