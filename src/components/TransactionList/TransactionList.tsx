import React, { useEffect, useRef, useState } from "react";
import { TransactionEntity } from "../../types/entities/transaction.entity";
import CustomTable from "../CustomTable/CustomTable";
import { Box, Button } from "@mui/material";

import TransactionForm from "../TransactionForm/TransactionForm";
import { IDialogBaseRef } from "../../types/dialog.type";
import FormDialog from "../CommonDialog/FormDialog";
import CustomCategoryForm from "../Category/CustomCategoryForm";
import CustomPartnerForm from "../Partner/CustomPartnerForm";
import { BASE_URL, EFormMode } from "../../constants";
import useHttp from "../../hooks/useHttp";

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [reload, setReload] = useState(false);

  const transactionFormRef = useRef<IDialogBaseRef>(null);
  const transactionFormEditRef = useRef<IDialogBaseRef>(null);
  const categoryFormRef = useRef<IDialogBaseRef>(null);
  const partnerFormRef = useRef<IDialogBaseRef>(null);

  const { sendRequest: getTransactionsList } = useHttp();
  const { sendRequest: editTransaction } = useHttp();
  const { sendRequest: deleteTransaction } = useHttp();

  const toggleReload = () => {
    setReload((prev) => !prev);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const id =
    //   event.target.parentElement.parentElement.parentElement.firstElementChild
    //     .textContent;
    const id =
      event.target.parentElement.parentElement.getElementsByTagName("input")[0]
        .value;
    // console.log(id);
    editTransaction({ url: `${BASE_URL}/` });
    setSelectedId(id);
    transactionFormEditRef.current?.show();
  };
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id =
      event.target.parentElement.parentElement.getElementsByTagName("input")[0]
        .value;
    console.log(id);
  };

  const dataHandled = transactionList.map((item) =>
    Object.values(item)
      .map((value) => ({
        type: "text",
        value: String(value),
      }))
      .concat([
        {
          type: "actions",
          value: "",
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
    "Date",
    "Skipped",
    "Actions",
  ];

  useEffect(() => {
    getTransactionsList({ url: `${BASE_URL}/transaction/all` }, (data) => {
      const handledData = data.map((item: any) => {
        const fullData = {
          ...item,
          partner: item.partner.name,
          category: item.category.name,
          type: item.type.name,
          date: new Date(item.date).toLocaleDateString(),
        };
        const { ...rest } = fullData;
        return rest;
      });

      setTransactionList(handledData);
    });
  }, [reload]);

  return (
    <div className="mt-10">
      <FormDialog title="New Transaction" ref={transactionFormRef}>
        <TransactionForm
          mode={EFormMode.CREATE}
          onCloseForm={() => {
            transactionFormRef.current?.hide();
          }}
          onRefresh={() => {
            toggleReload();
          }}
        />
      </FormDialog>

      <FormDialog title="New Transaction" ref={transactionFormEditRef}>
        <TransactionForm
          mode={EFormMode.UPDATE}
          id={selectedId}
          onCloseForm={() => {
            transactionFormEditRef.current?.hide();
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
      <CustomTable
        columns={columns}
        rows={dataHandled}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
