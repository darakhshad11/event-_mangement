import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductAdderDialog({
  open,
  handleClose,
  title,
  formData,
  setFormData,
  handleAdd,
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "800px",
              // height:'600px',
              overflow: "hidden",
              marginBottom: "10px",
              marginTop: "40px",
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 8 }}
              columns={{ xs: 2, sm: 10, md: 14 }}
            >
              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="ID"
                  name="id"
                  value={formData.id}
                  readOnly
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <br />
              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="Price (in rupee)"
                  name="price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={`100$`}
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>

              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="Description"
                  name="description"
                  type="textArea"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid xs={2} sm={4} md={4}>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.date}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            style={{ width: "200px", margin: "auto" }}
          >
            {title}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

