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
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { v4 as uuidV4 } from "uuid";
import fetchProduct from "../api/fetchProducts";
import addProduct from "../api/addProducts";
import updateProducts from "../api/updateProduct";
import deleteProducts from "../api/deleteProduct";

const VendorPage = () => {
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
    image: "",
    imageName: ""
  });

  const handleAdd = async () => {
    if (idCounter === "Update Product") {
      await updateProducts(formData);
    } else {
      await addProduct(formData);
    }
    setFormData({
      id: uuidV4().split("-")[0],
      name: "",
      price: "",
      quantity: "",
      description: "",
      date: "",
      image: "",
      imageName: ""
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
        // Vendor specific logic if needed
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
        <Typography variant="h3" component="h2" style={{ fontFamily: 'serif' }}>
          Welcome Vendor
        </Typography>
        <div style={{display:"flex"}}>
        <Button variant="outlined" color="primary" style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}>
          Your item
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px' , marginRight: '30px'}}>
          Add New Product
        </Button>
        <Button variant="outlined" color="primary" style={{ marginTop: '40px', marginBottom: '50px', fontSize: '18px', marginRight: '30px' }}>
          Transation
        </Button>
        
        </div>
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
                <TableCell>Image Name</TableCell>
                <TableCell>Image</TableCell>
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
                  <TableCell>{row.imageName}</TableCell>
                  <TableCell>
                    <img src={row.image} alt={row.imageName} width="50" />
                  </TableCell>
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
                      style={{ color: "red" }}
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
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <Typography variant="h6" component="h2">
              {idCounter}
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Image Name"
                value={formData.imageName}
                onChange={(e) =>
                  setFormData({ ...formData, imageName: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  {idCounter}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorPage;
