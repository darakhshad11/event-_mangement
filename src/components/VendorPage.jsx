

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductAdderDialog from "./Dialog";
import { v4 as uuidV4 } from "uuid";
import fetchProduct from "../api/fetchProducts";
import addProduct from "../api/addProducts";
import updateProducts from "../api/updateProduct";
import deleteProducts from "../api/deleteProduct";



const VendorPage = () => {
  console.log("i ma m vendorpage")
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [idCounter, setIdCounter] = React.useState("Add Product");
  const getData = React.useRef(() => {});

  const [formData, setFormData] = React.useState({
    id: uuidV4().split("-")[0],
    name: "",
    price: "",
    quantity: "",
    description: "",
    date: "",
  });

  const handleAdd = async () => {
    if (idCounter === "Update Product") {
      await updateProducts(formData);
    } else {
      await addProduct(formData);
      console.log({formData})
    }
    setFormData({
      id: uuidV4().split("-")[0],
      name: "",
      price: "",
      quantity: "",
      description: "",
      date: "",
    });
    setIdCounter("Add Product");
    getData.current();
    handleClose();
  };

  getData.current = async () => {
    const savedData = await fetchProduct();
    setData(savedData);
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { role: "" };
    if (user.role) {
      if (user.role === "vendor") {
        
      } else {
        getData.current();
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleEdit = (index) => {
    const updatedData = data.filter((abcd) => {
      return abcd.id === index;
    });
    setFormData(updatedData[0]);
    setIdCounter("Update Product");
    handleClickOpen();
  };

  const handleDelete = async (productId) => {
    await deleteProducts(productId);
    getData.current();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    
  
      <Navbar name="Vendor" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >


        <Typography variant="h3" component="h2" style={{fontFamily:'serif'}} >
          Add Product
        </Typography>
        <Button variant="outlined" color="primary"  onClick={handleClickOpen} style={{marginTop:'40px',marginBottom:'50px', fontSize:'18px'}}>
          Add Product
        </Button>
        <TableContainer
          component={Paper}
          style={{ minWidth: "650px", marginTop: "20px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                     
                      onClick={() => handleDelete(row.id)}
                      style={{color : "red"}}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ProductAdderDialog
        open={open}
        handleClose={handleClose}
        title={idCounter}
        formData={formData}
        setFormData={setFormData}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default VendorPage;
