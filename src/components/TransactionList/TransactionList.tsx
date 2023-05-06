import React, { useEffect, useRef } from "react";
import { TransactionEntity } from "../../types/entities/transaction.entity";
import CustomTable from "../CustomTable/CustomTable";
import { HOST_URL } from "../../constants";
import { Box, Button } from "@mui/material";
import TransactionForm from "../TransactionForm/TransactionForm";
import { IDialogBaseRef } from "../../types/dialog";
import FormDialog from "../CommonDialog/FormDialog";
import CustomCategoryForm from "../Category/CustomCategoryForm";
import CustomPartnerForm from "../Partner/CustomPartnerForm";

export default function TransactionList() {
  const transactionFormRef = useRef<IDialogBaseRef>(null);
  const categoryFormRef = useRef<IDialogBaseRef>(null);
  const partnerFormRef = useRef<IDialogBaseRef>(null);

  useEffect(() => {
    const getTransactionsList = async () => {
      const respone = await fetch(`${HOST_URL}/transaction/all`);
      const data = await respone.json();
      console.log(data);
    };
    getTransactionsList();
  }, []);
  const data = [
    {
      id: "00001",
      type: "income",
      partner: "Mom",
      category: "weekly",
      amount: 200000,
      description: "",
      date: "",
    },
    {
      id: "00002",
      type: "income",
      partner: "Mom",
      category: "weekly",
      amount: 200000,
      description: "",
      date: "",
    },
    {
      id: "00003",
      type: "income",
      partner: "Mom",
      category: "weekly",
      amount: 200000,
      description: "",
      date: "",
    },
    {
      id: "00004",
      type: "income",
      partner: "Mom",
      category: "weekly",
      amount: 200000,
      description: "",
      date: "",
    },
  ];
  const dataHandled = data.map((item) =>
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
              <Button>Edit</Button>
              <Button>Delete</Button>
            </>
          ),
        },
      ])
  );
  const columns = [
    "ID",
    "Type",
    "Partner",
    "Category",
    "Amount",
    "Description",
    "Date",
    "Actions",
  ];

  return (
    <div className="mt-10">
      <FormDialog title="New transaction" ref={transactionFormRef}>
        <TransactionForm
          onCloseForm={() => {
            transactionFormRef.current?.hide();
          }}
        />
      </FormDialog>
      <FormDialog title="New category" ref={categoryFormRef}>
        <CustomCategoryForm
          onCloseForm={() => {
            categoryFormRef.current?.hide();
          }}
        />
      </FormDialog>
      <FormDialog title="New transaction" ref={partnerFormRef}>
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
