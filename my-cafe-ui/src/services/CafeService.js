import axios from 'axios';

function getBaseUsrl() {
    return process.env.REACT_APP_KRIYA_BASE_URL;
}

// function getUserDetails() {
//     const currentUser = JSON.parse(localStorage.getItem("kriyaUser"));
//     return currentUser;
// }

async function addItem(data) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_ADD_ITEM}`
    let options = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        },
        data: data
    };
    let response = await axios(options);
    return response;
}

async function updateItem(data) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_UPDATE_ITEM}/${data.itemId}`
    let options = {
        method: 'PUT',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        },
        data: data
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}

async function deleteItem(itemId) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_DELETE_ITEM}/${itemId}`
    let options = {
        method: 'DELETE',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}


async function getAllItems() {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_GET_ALL_ITEM}`
    let options = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}

async function addTable(data) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_ADD_TABLE}`
    let options = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        },
        data: data
    };
    let response = await axios(options);
    return response;
}

async function updateTable(data) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_UPDATE_TABLE}/${data.tableId}`
    let options = {
        method: 'PUT',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        },
        data: data
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}

async function deleteTable(tableId) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_DELETE_TABLE}/${tableId}`
    let options = {
        method: 'DELETE',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}


async function getAllTables() {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_GET_ALL_TABLE}`
    let options = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}


async function updateOrder(data) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_UPDATE_ORDER}`
    let options = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        },
        data: data
    };
    let response = await axios(options);
    return response;
}

async function getAllOrders() {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_GET_ALL_ORDERS}`
    let options = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}


async function deleteOrderedItem(orderedItemId) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_DELETE_ORDERD_ITEM}/${orderedItemId}`
    let options = {
        method: 'DELETE',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    try {
        let response = await axios(options);
        return response;
    } catch (error) {
        console.log('Error', error);
        return error;
    }

}

async function makeInActive(orderId) {
    let url = `${getBaseUsrl()}${process.env.REACT_APP_MAKE_INACTIVE_ORDER}/${orderId}`
    let options = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
        }
    };
    let response = await axios(options);
    return response;
}


export const CafeService = {
    addItem,
    updateItem,
    deleteItem,
    getAllItems,

    addTable,
    updateTable,
    deleteTable,
    getAllTables,

    updateOrder,
    getAllOrders,
    deleteOrderedItem,

    makeInActive

}