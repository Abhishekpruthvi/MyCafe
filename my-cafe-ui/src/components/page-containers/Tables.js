import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import CommonForm from '../common/CommonForm';
import * as Yup from "yup";
// import { Header } from '../../common/HeaderFooter'
import TemplateForTables from '../common/table/TemplateForTables';
import CircularProgress from "@mui/material/CircularProgress";
import Table from '../common/table/DynamicPaginationTable'
import DeleteIcon from '@mui/icons-material/Delete';
// import DownloadIcon from '@mui/icons-material/Download';
import SuccessPopup from '../common/SuccessPopup';
import { CafeService } from '../../services/CafeService';
import EditIcon from '@mui/icons-material/Edit';



const Tables = () => {

    let formikForm = useRef(null);

    const [tableData, setTableData] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("Success");
    const [status, setStatus] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState({
        tableId: "",
        tableName: "",
        tableDescription: ""
    });
    const [initialValuesChanged, setInitialValuesChanged] = React.useState(false);

    let fields = [
        {
            type: "text",
            name: "tableName",
            label: "Table Name",
            placeholder: "Table Name",
            grid: {
                xs: 12,
                sm: 6,
                className: ""
            }
        },

        {
            type: "text",
            name: "tableDescription",
            label: "Table Description",
            placeholder: "Table Description",
            grid: {
                xs: 12,
                sm: 6,
                className: ""
            }
        }
    ]

    let initialValuesDefault = initialValues;

    useEffect(() => {
        CafeService.getAllTables().then(response => {
            setTableData(response.data);
        })
        setRefresh(false);
    }, [refresh]);


    const columns = React.useMemo(
        () => [

            {
                Header: "Table ID",
                accessor: "tableId"
            },
            {
                Header: "Table Name",
                accessor: "tableName",
            },
            {
                Header: "Table Description",
                accessor: "tableDescription"
            },
            {
                Header: "Modify",
                accessor: "modify",
                Cell: ({ row, cell }) => {
                    return (
                        <>
                            <Button onClick={() => handleUpdateClick(row.original)}
                            >
                                <EditIcon />
                            </Button>
                        </>
                    );
                }
            },
            {
                Header: "Delete",
                accessor: "delete",
                Cell: ({ row, cell }) => {
                    return (
                        <>
                            <Button onClick={() => handleDelete(row.original.tableId)}
                            >
                                <DeleteIcon />
                            </Button>
                        </>
                    );
                }
            }

        ],
        []
    );


    const data = React.useMemo(() => [...tableData]);


    const handleDelete = (tableId) => {
        CafeService.deleteTable(tableId);
        setSuccess(true);
        setMessage("Table Deleted Successfully!")
        setRefresh(true);
    }




    const handleSubmit = (values, setSubmitting, resetForm) => {
        // Handle form submission with file and field data
        CafeService.addTable(values).then(response => {
            setRefresh(true)
        });

        setSubmitting(false);
        resetForm();
        setSuccess(true);
        setMessage("Table Added Successfully")
    };

    const handleUpdate = (values, setSubmitting, resetForm) => {
        // Handle form submission with file and field data
        console.log("update values ====================== ", values)
        CafeService.updateTable(values).then(response => {
            setRefresh(true)
            setEdit(false)
            setInitialValues ({
                tableId: "",
                tableName: "",
                tableDescription: ""
            })
        });

        setSubmitting(false);
        resetForm();
        setSuccess(true);
        setMessage("Table Updated Successfully")
    };


    const handleClose = () => {
        setSuccess(false);
    }


    const handleUpdateClick = (table) => {
        setEdit(true);
        setInitialValues ({
            tableId: table.tableId,
            tableName: table.tableName,
            tableDescription: table.tableDescription
        })

        setInitialValuesChanged(!initialValuesChanged)

    }

    const validationSchema = Yup.object().shape({
        tableName: Yup.string().required('Name is required')
    });



    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: 64 }}>

            <Paper elevation={2} style={{ padding: "2em", width: "100%" }}>
                <Grid item>
                    {initialValuesChanged || !initialValuesChanged ?
                        <CommonForm
                            fields={fields}
                            submitLabel={edit ? "Update Table" : "Add Table"}
                            submittingLabel={edit ? "Updating Table" : "Adding Table"}
                            initialValues={initialValuesDefault}
                            validationSchema={validationSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                            enableReinitialize
                            onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
                                edit ? handleUpdate(values, setSubmitting, resetForm) :
                                    handleSubmit(values, setSubmitting, resetForm);
                            }}
                            formikRef={formikForm}
                            buttonSize="2"
                            buttonPosition="right"
                        />
                        : null}
                </Grid>
            </Paper>


            <TemplateForTables
                // dropdownitems={dropitems}
                needDropdown={false}
            // importIcons
            >

                {status === "loading" ? (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{ height: "50vh" }}
                    >
                        <CircularProgress />
                    </Grid>
                ) : (
                        <Table
                            columns={columns}
                            data={data}
                        // paginationInfo={{
                        //     pageIndex: Number(query.get("page")),
                        //     nextPage,
                        //     previousPage,
                        //     pageSize: Number(query.get("size")),
                        //     setPageSize: handlePageSize,
                        //     pageInfo
                        // }}
                        />
                    )}
            </TemplateForTables>

            <SuccessPopup
                open={success}
                message={message}
                handleClose={handleClose}
                autoHideDuration={5000}
            />
            
        </Grid>
    );
};

export default Tables;

