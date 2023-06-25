import React, { useEffect, useState, useRef } from 'react';

import { Box, IconButton, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Grid } from '@mui/material';
import CommonForm from "../common/CommonForm";
import Chip from '@mui/material/Chip';
import TemplateForTables from '../common/table/TemplateForTables';
import CircularProgress from "@mui/material/CircularProgress";
import Table from '../common/table/DynamicPaginationTable'
import DeleteIcon from '@mui/icons-material/Delete';
import { CafeService } from '../../services/CafeService';
import * as Yup from "yup";

export default function Dashboard() {

    const [layouts, setLayouts] = useState([{}]);
    const [status, setStatus] = useState(false);
    const [orders, setOrders] = useState([{}]);
    const [orderedItems, setOrderedItems] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [items, setItems] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const [initialValues, setInitialValues] = useState([{
        orderId: "",
        tableId: "",
        tableName: "",
        itemsList: [],
        orderTotal: "",
        isActive: "",
        itemId: "",
        itemPrice: "",
        itemQuantity: ""
    }])

    let formikForm = useRef(null);

    const handleAddLayout = () => {
        // setLayouts(prevLayouts => [...prevLayouts, {}]);
        setInitialValues(prevInitialValues => [...prevInitialValues, {
            orderId: "",
            tableId: "",
            tableName: "",
            itemsList: [],
            orderTotal: "",
            isActive: "",
            itemId: "",
            itemPrice: "",
            itemQuantity: ""
        }])
    };

    useEffect(() => {
        CafeService.getAllTables().then(response => {
            setTableData(response.data);
        })
        CafeService.getAllItems().then(response => {
            setItems(response.data);
        })
    }, []);


    useEffect(() => {
        CafeService.getAllOrders().then(response => {
            console.log("getting data ",  response.data.length)
            if (response.data.length > 0) {
                response.data.forEach(orders => orders.itemQuantity = "");
                setInitialValues(response.data);
                console.log("set initial", response.data)
            } else {
                setInitialValues([{
                    orderId: "",
                    tableId: "",
                    tableName: "",
                    itemsList: [],
                    orderTotal: "",
                    isActive: "",
                    itemId: "",
                    itemPrice: "",
                    itemQuantity: ""
                }])
            }
        })
        setUpdateTable(false);
    }, [updateTable]);

    const fields = [
        {
            type: "select",
            name: "tableId",
            label: "Table Name",
            placeholder: "User Name",
            option:
                tableData.length > 0
                    ? tableData.map(table => ({
                        value: table.tableId,
                        label: table.tableName
                    }))
                    : [],
            grid: {
                xs: 12,
                sm: 12,
                className: ""
            }
        },

        {
            type: "select",
            name: "itemId",
            label: "Item Name",
            placeholder: "Item Name",
            option:
                items.length > 0
                    ? items.map(item => ({
                        value: item.itemId,
                        label: item.itemName
                    }))
                    : [],
            grid: {
                xs: 12,
                sm: 9,
                className: ""
            }
        },

        {
            type: "number",
            name: "itemQuantity",
            label: "Quantity",
            placeholder: "Quantity",
            grid: {
                xs: 12,
                sm: 3,
                className: ""
            }
        }
    ]


    const columns = React.useMemo(
        () => [
            // {
            //     Header: "item ID",
            //     accessor: "itemId",
            // },
            {
                Header: "item Name",
                accessor: "itemName",
            },
            {
                Header: "item Price",
                accessor: "itemPrice"
            },
            {
                Header: "item Quntity",
                accessor: "itemQuantity"
            },
            {
                Header: "item total",
                accessor: "itemTotal"
            },
            // {
            //     Header: "Modify",
            //     accessor: "modify",
            //     Cell: ({ row, cell }) => {
            //         return (
            //             <>
            //                 <Button onClick={() => handleUpdateClick(row.original)}
            //                 >
            //                     <EditIcon />
            //                 </Button>
            //             </>
            //         );
            //     }
            // },
            {
                Header: "Delete",
                accessor: "delete",
                Cell: ({ row, cell }) => {
                    return (
                        <>
                            <Button onClick={() => handleDelete(row.original.orderedItemId)}
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


    const data = React.useMemo(() => initialValues);

    let initialValuesDefault = initialValues;


    const handleDelete = (orderedItemId) => {

        CafeService.deleteOrderedItem(orderedItemId).then(response => {
            setUpdateTable(true);
        });
    }

    const handleSubmit = (values, setSubmitting, resetForm) => {
        console.log("Values=================== ", values);

        CafeService.updateOrder(values).then(response => {
            setUpdateTable(true);
            setSubmitting(false);
        })
    };

    const handleCancel = (values, resetForm) => {
        console.log("cancelling =====================================", values)
        console.log("initial values", initialValues)
        if(values.orderId) {
            CafeService.makeInActive(values.orderId).then(response => {
                setUpdateTable(true);
            });
        }else{
            setUpdateTable(true);
        }
        

    }

    const validationSchema = Yup.object().shape({
        itemId: Yup.string().required('Name is required'),
        itemQuantity: Yup.string().required('Quantity is required')
    });

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: 64 }}>
            {/* Place your components here */}

            {initialValues.map((order, index) => (
                <Grid item>
                    <Box
                        key={index}
                        flex="1"
                        //   display="flex"
                        justifyContent="center"
                        alignItems="center"
                        // height="500px"
                        width="500px"
                        minHeight="500px"
                        margin="10px"
                        padding="20px"
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #c0c0aa, #C4E0E5)'
                            
                        }}
                    >
                        <CommonForm
                            fields={fields}
                            submitLabel={"Add Item"}
                            submittingLabel={"Adding Item"}
                            initialValues={initialValues[index]}
                            validationSchema={validationSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                            enableReinitialize
                            onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
                                handleSubmit(values, setSubmitting, resetForm);
                            }}
                            handleCancel={()=>handleCancel(initialValues[index])}
                            formikRef={formikForm}
                            buttonSize={3}
                            buttonPosition="right"
                            showCancelButton
                            cancelButtonPosition="right"
                        
                        />
                        {/* <Chip label="Tag" onDelete={() => console.log('Deleted')} /> */}

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
                                        data={data[index].itemsList}
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
                            <Typography style={{
                                marginTop: "25px",
                                textAlign: "right",
                                fontSize: "12px",
                                fontWeight: 600
                            }}> Order Total = {initialValues[index].orderTotal}</Typography>
                        </TemplateForTables>
                    </Box>

                </Grid>
            ))}
            <Button variant="contained" onClick={handleAddLayout}><AddCircleOutlineIcon /></Button>

        </Grid>

    )
}