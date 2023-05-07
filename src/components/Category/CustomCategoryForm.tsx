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
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../constants";

type Props = { onCloseForm: () => void };

const CustomCategoryForm = (props: Props) => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState<string | number>("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  const { sendRequest, error } = useHttp();

  const handleClose = props.onCloseForm;

  const onSubmit = () => {
    sendRequest({ url: `${BASE_URL}/category/create`, method: "POST" }, () => {
      handleClose();
    });
  };

  return (
    <div>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 my-5">
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
        </div>
        {error && <p className="text-red-600">{error}</p>}
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

export default CustomCategoryForm;
