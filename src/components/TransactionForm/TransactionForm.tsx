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
import useHttp from "../../hooks/useHttp";
import { BASE_URL, EFormMode } from "../../constants";
import { IType } from "../Category/CustomCategoryForm";
import LoadingSpin from "../UI/LoadingSpin";

type Props = { id?: string; onCloseForm: () => void; onRefresh?: () => void };
type FormMode = {
  mode: EFormMode;
};

export interface ICategory {
  _id: string;
  name: string;
  type: string;
}

const TransactionForm = (props: Props & FormMode) => {
  const [type, setType] = React.useState("");
  const [fetchedTypes, setFetchedTypes] = React.useState([]);
  const [partner, setPartner] = React.useState("");
  const [fetchedPartners, setFetchedPartners] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [fetchedCategories, setFetchedCategories] = React.useState([]);
  const [amount, setAmount] = React.useState<string | number>("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [isDone, setIsDone] = React.useState(true);

  const { sendRequest: getCategories } = useHttp();
  const { sendRequest: getTransaction, isLoading: isLoadingTransaction } =
    useHttp();
  const { sendRequest: getPartners } = useHttp();
  const { sendRequest: getTypes } = useHttp();
  const { sendRequest: submitTransactions } = useHttp();

  const handleClose = props.onCloseForm;
  const { id, mode } = props;

  const onSubmit = () => {
    const data = {
      type,
      partner,
      category,
      amount,
      description,
      date,
      isDone,
    };
    submitTransactions(
      {
        url: `${BASE_URL}/transaction/${
          mode === EFormMode.CREATE ? "create" : `update/${id}`
        }`,
        body: JSON.stringify(data),
        method: mode === EFormMode.CREATE ? "POST" : "PUT",
      },
      (data) => {
        data;
        handleClose();
        props.onRefresh?.();
      }
    );
  };

  React.useEffect(() => {
    getTypes({ url: `${BASE_URL}/user/type/all`, cache: true }, (data) => {
      setFetchedTypes(data);
    });
    if (id) {
      // console.log(id);
      getTransaction({ url: `${BASE_URL}/transaction/${id}` }, (data) => {
        const fetchedData = data[0];
        setType(fetchedData.type._id);
        setPartner(fetchedData.partner._id);
        setCategory(fetchedData.category._id);
        setAmount(fetchedData.amount);
        setDescription(fetchedData.description);
        setDate(new Date(fetchedData.date).toISOString().slice(0, 10));
        setIsDone(fetchedData.isDone);
      });
    }
  }, [id]);

  React.useEffect(() => {
    getCategories(
      { url: `${BASE_URL}/category/all?typeId=${type}`, cache: true },
      (data) => {
        setFetchedCategories(data);
      },
    );
    getPartners({ url: `${BASE_URL}/partner/all?typeId=${type}`, cache: true }, (data) => {
      setFetchedPartners(data);
    });
  }, [type]);

  return (
    <>
      <DialogContent>
        {isLoadingTransaction && <LoadingSpin />}
        {!isLoadingTransaction && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
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
                  return <MenuItem value={type._id}>{type.name}</MenuItem>;
                })}
                {/* <MenuItem value={"income"}>Income</MenuItem>
              <MenuItem value={"expense"}>Expense</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Partner</InputLabel>
              <Select
                labelId="partner"
                id="partner"
                value={partner}
                label="Partner"
                onChange={(event: SelectChangeEvent) => {
                  setPartner(event.target.value as string);
                }}
              >
                {fetchedPartners.map((category: ICategory) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
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
                {fetchedCategories.map((category: ICategory) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
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
                  checked={isDone}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIsDone(event.target.checked);
                  }}
                />
              }
              label="Done"
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default TransactionForm;
