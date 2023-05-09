import React, { useEffect, useRef, useState } from "react";
import { TransactionEntity } from "../../types/entities/transaction.entity";
import CustomTable from "../CustomTable/CustomTable";
import { Box, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TransactionForm from "../TransactionForm/TransactionForm";
import { IDialogBaseRef } from "../../types/dialog.type";
import FormDialog from "../CommonDialog/FormDialog";
import CustomCategoryForm from "../Category/CustomCategoryForm";
import CustomPartnerForm from "../Partner/CustomPartnerForm";
import { BASE_URL } from "../../constants";
import useHttp from "../../hooks/useHttp";

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [reload, setReload] = useState(false);

  const transactionFormRef = useRef<IDialogBaseRef>(null);
  const categoryFormRef = useRef<IDialogBaseRef>(null);
  const partnerFormRef = useRef<IDialogBaseRef>(null);

  const { sendRequest: getTransactionsList } = useHttp();

  const toggleReload = () => {
    setReload((prev) => !prev);
  };

  const dataHandled = transactionList
    .map((item) => ({
      ...item,
      partner: item.partner.name,
      category: item.category.name,
      type: item.type.name,
      date: new Date(item.date).toLocaleDateString(),
    }))
    .map((item) =>
      Object.values(item)
        .map((value) => ({
          type: "string",
          value: String(value),
        }))
        .concat([
          {
            type: "button",
            value: (
              <>
                <Button>
                  <ModeEditOutlineIcon />
                </Button>
                <Button color="error">
                  <DeleteOutlineIcon />
                </Button>
              </>
            ),
          },
        ])
    );

  const columns = [
    "ID",
    "Type",
    "Category",
    "Partner",
    "Amount",
    "Description",
    "Done",
    "Date",
    "Actions",
  ];

  useEffect(() => {
    getTransactionsList({ url: `${BASE_URL}/transaction/all` }, (data) => {
      setTransactionList(data);
    });
  }, [reload]);

  return (
    <div className="mt-10">
      <FormDialog title="New Transaction" ref={transactionFormRef}>
        <TransactionForm
          onCloseForm={() => {
            transactionFormRef.current?.hide();
          }}
          onRefresh={() => {
            toggleReload();
          }}
        />
      </FormDialog>
      <FormDialog title="New Category" ref={categoryFormRef}>
        <CustomCategoryForm
          onCloseForm={() => {
            categoryFormRef.current?.hide();
          }}
        />
      </FormDialog>
      <FormDialog title="New Partner" ref={partnerFormRef}>
        <CustomPartnerForm
          onCloseForm={() => {
            partnerFormRef.current?.hide();
          }}
        />
      </FormDialog>
      <div className="flex justify-end gap-2">
        <Button
          variant="contained"
          className="mt"
          onClick={() => {
            transactionFormRef.current?.show();
          }}
        >
          + Transaction
        </Button>
        <Button
          variant="contained"
          className="mt"
          onClick={() => {
            categoryFormRef.current?.show();
          }}
        >
          + Category
        </Button>
        <Button
          variant="contained"
          className="mt"
          onClick={() => {
            partnerFormRef.current?.show();
          }}
        >
          + Partner
        </Button>
      </div>
      <CustomTable columns={columns} rows={dataHandled} />
    </div>
  );
}
