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

export interface IType {
  _id: string;
  name: string;
}

const CustomCategoryForm = (props: Props) => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [fetchedTypes, setFetchedTypes] = React.useState([]);

  const { sendRequest, error } = useHttp();
  const { sendRequest: getTypes } = useHttp();

  const handleClose = props.onCloseForm;

  const onSubmit = () => {
    sendRequest(
      {
        url: `${BASE_URL}/category/create`,
        method: "POST",
        body: JSON.stringify({ name, type }),
        removeCache: true,
      },
      () => {
        handleClose();
      }
    );
  };

  React.useEffect(() => {
    getTypes({ url: `${BASE_URL}/user/type/all`, cache: true }, (data) => {
      setFetchedTypes(data);
    });
  }, []);

  return (
    <div>
      <DialogContent sx={{minWidth: "360px"}}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
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
              {fetchedTypes.map((type: IType) => {
                return (
                  <MenuItem value={type._id}>{type.name}</MenuItem>
                );
              })}
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
