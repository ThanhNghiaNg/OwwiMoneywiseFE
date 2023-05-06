import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = { onCloseForm: () => void };

const TransactionForm = (props: Props) => {
  const [type, setType] = React.useState("expense");
  const [partner, setPartner] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState<string | number>("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [isFinished, setIsFinished] = React.useState(true);

  const handleClose = props.onCloseForm;

  const onSubmit = () => {
    handleClose();
  };

  return (
    <div>
      <DialogContent>
        <div className="grid grid-cols-3 gap-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="type"
              onChange={(event: SelectChangeEvent) => {
                setType(event.target.value as string);
              }}
            >
              <MenuItem value={"income"}>Income</MenuItem>
              <MenuItem value={"expense"}>Expense</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="partner"
              label="Partner"
              value={partner}
              onChange={(event) => {
                setPartner(event.target.value);
              }}
              defaultValue="PartnerName"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={category}
              label="category"
              onChange={(event: SelectChangeEvent) => {
                setCategory(event.target.value as string);
              }}
            >
              <MenuItem value={"salary"}>Salary</MenuItem>
              <MenuItem value={"parking"}>Parking</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={(event) => {
                setAmount(Number(event.target.value));
              }}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="Description"
              label="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel id="date">Date</InputLabel> */}
            <TextField
              id="Date"
              value={date}
              type="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            ></TextField>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={isFinished}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setIsFinished(event.target.checked);
                }}
              />
            }
            label="Finished"
          />
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

export default TransactionForm;
