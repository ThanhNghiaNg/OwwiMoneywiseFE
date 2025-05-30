import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../constants";
import { IType } from "../Category/CustomCategoryForm";
import { ICategory } from "../TransactionForm/TransactionForm";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

type Props = { callBackSearch?: (filter: any) => void, onCloseDrawer?: () => void };

function TableFilter({ callBackSearch, onCloseDrawer }: Props) {

  const [type, setType] = React.useState("");
  const [partner, setPartner] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState<string | number>("");
  const [description, setDescription] = React.useState("");
  // const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [isDone, setIsDone] = React.useState(true);

  const [fetchedTypes, setFetchedTypes] = React.useState([]);
  const [fetchedPartners, setFetchedPartners] = React.useState([]);
  const [fetchedCategories, setFetchedCategories] = React.useState([]);

  const { sendRequest: getCategories } = useHttp();
  // const { sendRequest: getTransaction, isLoading: isLoadingTransaction } =
  useHttp();
  const { sendRequest: getPartners } = useHttp();
  const { sendRequest: getTypes } = useHttp();

  const onSubmit = () => {
    const data = {
      type,
      partner,
      category,
      amount,
      description,
      // date,
      isDone,
    };
    callBackSearch?.(data);
    onCloseDrawer?.();
    // console.log(data);
    // searchTransactions(
    //   {
    //     url: `${BASE_URL}/transaction/search`,
    //     body: JSON.stringify(data),
    //     method: "POST",
    //   },
    //   (data) => {
    //     data;
    //     callBackSearch?.();
    //   }
    // );
  };

  const handleReset = () => {
    setType("");
    setPartner("");
    setCategory("");
    setAmount("");
    setDescription("");
    // setDate("");
    setIsDone(true);
  };

  React.useEffect(() => {
    getTypes({ url: `${BASE_URL}/user/type/all`, cache: true }, (data) => {
      setFetchedTypes(data);
    });
  }, []);

  React.useEffect(() => {
    getCategories(
      { url: `${BASE_URL}/category/all?typeId=${type}`, cache: true },
      (data) => {
        setFetchedCategories(data);
      }
    );
    getPartners({ url: `${BASE_URL}/partner/all?typeId=${type}`, cache: true }, (data) => {
      setFetchedPartners(data);
    });
  }, [type]);



  return (
    <Box >
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
              return <MenuItem value={type._id} key={type._id}>{type.name}</MenuItem>;
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
              return <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>;
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
              return <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>;
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
        {/* <FormControl fullWidth>
          <TextField
            id="Date"
            value={date}
            type="date"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          ></TextField>
        </FormControl> */}
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
      <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
        <Button onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={onSubmit}>
          Search
        </Button>
      </Box>
    </Box >
  );
}

export default function TableFilterResponsive({ callBackSearch }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), [])
  const onOffFilter = useCallback(() => setIsFilterOpen(false), [])

  return (
    <>
      <div className="flex justify-end mt-3 sm:hidden">
        <Button onClick={toggleFilter}>
          <FilterAltOutlinedIcon />
        </Button>
      </div>
      <Drawer
        anchor="top"
        open={isFilterOpen}
        onClose={onOffFilter}
      >
        <div className="mx-4 my-3">
          <h2 className="text-2xl">Filter Transactions</h2>
          <TableFilter callBackSearch={callBackSearch} onCloseDrawer={onOffFilter} />
        </div>
      </Drawer>
      <div className="hidden sm:block">
        <TableFilter callBackSearch={callBackSearch} />
      </div>
    </>
  )
}
