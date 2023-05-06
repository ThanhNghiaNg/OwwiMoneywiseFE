import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = { onCloseForm: () => void };

const CustomPartnerForm = (props: Props) => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleClose = props.onCloseForm;

  const onSubmit = () => {
    handleClose();
  };

  return (
    <div>
      <DialogContent>
        <div className="grid grid-cols-3 gap-4 my-5">
          <FormControl fullWidth>
            <TextField
              id="name"
              label="Caregory Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label="type"
              onChange={(event: SelectChangeEvent) => {
                setType(event.target.value as string);
              }}
            >
              <MenuItem value={"salary"}>Salary</MenuItem>
              <MenuItem value={"parking"}>Parking</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="address"
              label="Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            ></TextField>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </div>
  );
};

export default CustomPartnerForm;