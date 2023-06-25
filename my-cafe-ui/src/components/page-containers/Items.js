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



const Items = () => {

    let formikForm = useRef(null);

    const [itemData, setitemData] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("Success");
    const [status, setStatus] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [initialValuesChanged, setInitialValuesChanged] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState({
        itemId: "",
        itemName: "",
        itemPrice: ""
    });


    let fields = [
        {
            type: "text",
            name: "itemName",
            label: "Item Name",
            placeholder: "Item Name",
            grid: {
                xs: 12,
                sm: 6,
                className: ""
            }
        },

        {
            type: "text",
            name: "itemPrice",
            label: "Item Price",
            placeholder: "Item Price",
            grid: {
                xs: 12,
                sm: 6,
                className: ""
            }
        }
    ]

    console.log("refresh--------------------------------", refresh);

    useEffect(() => {
        console.log("triggered ===========================");
        CafeService.getAllItems().then(response => {
            setitemData(response.data);
        })
        setRefresh(false);
    }, [refresh]);

    const columns = React.useMemo(
        () => [

            {
                Header: "item ID",
                accessor: "itemId"
            },
            {
                Header: "item Name",
                accessor: "itemName",
            },
            {
                Header: "item Price",
                accessor: "itemPrice"
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
                            <Button onClick={() => handleDelete(row.original.itemId)}
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


    const data = React.useMemo(() => [...itemData]);


    const handleDelete = (itemId) => {
        CafeService.deleteItem(itemId);
        setSuccess(true);
        setMessage("Item Deleted Successfully!")
        console.log("refresh======================", refresh, !refresh);
        setRefresh(true);
    }

    const handleUpdateClick = (item) => {
        setEdit(true);
        setInitialValues({
            itemId: item.itemId,
            itemName: item.itemName,
            itemPrice: item.itemPrice
        })
        setInitialValuesChanged(!initialValuesChanged)

    }

    const handleSubmit = (values, setSubmitting, resetForm) => {
        // Handle form submission with file and field data
        CafeService.addItem(values).then(response => {
            setRefresh(true)
        });
        setSubmitting(false);
        resetForm();
        setSuccess(true);
        setMessage("Item Added Successfully!")
    };

    const handleUpdate = (values, setSubmitting, resetForm) => {
        CafeService.updateItem(values).then(response => {
            setRefresh(true)
            setEdit(false)
            setInitialValues({
                itemId: "",
                itemName: "",
                itemPrice: ""
            })
        });

        setSubmitting(false);
        resetForm();
        setSuccess(true);
        setMessage("Item Updated Successfully")
    }

    let initialValuesDefault = initialValues;


    const validationSchema = Yup.object().shape({
        itemName: Yup.string().required('Name is required'),
        // fileDescription: Yup.string().required('Description is required'),
        // fileUpload: Yup.string().required('Name is required')
    });

    const handleClose = () => {
        setSuccess(false);
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: 64 }}>

            <Paper elevation={2} style={{ padding: "2em", width: "100%" }}>
                {/* <Grid item>
                        <h2>Mentor File Upload</h2>
                    </Grid> */}
                <Grid item>
                    {initialValuesChanged || !initialValuesChanged ?
                        <CommonForm
                            fields={fields}
                            submitLabel={edit ? "Update Item" : "Add Item"}
                            submittingLabel={edit ? "Updating Item" : "Adding Item"}
                            initialValues={initialValuesDefault}
                            validationSchema={validationSchema}
                            validateOnBlur={true}
                            //   edit={!!props.match.params.id}
                            validateOnChange={true}
                            enableReinitialize
                            onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
                                console.log("on submit ================== ", values)
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

export default Items;

