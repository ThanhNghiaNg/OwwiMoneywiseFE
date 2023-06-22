import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { Button } from "@mui/material";

import TransactionForm from "../TransactionForm/TransactionForm";
import { IDialogBaseRef } from "../../types/dialog.type";
import FormDialog from "../CommonDialog/FormDialog";
import CustomCategoryForm from "../Category/CustomCategoryForm";
import CustomPartnerForm from "../Partner/CustomPartnerForm";
import { BASE_URL, EFormMode } from "../../constants";
import useHttp from "../../hooks/useHttp";
import ConfirmDialog from "../CommonDialog/ConfirmDialog";
import dotStyleCurrency from "../../utils/common";
import { ITableBaseRef } from "../../types/table.type";

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [reload, setReload] = useState(false);

  const transactionTableRef = useRef<ITableBaseRef>(null);
  const transactionFormRef = useRef<IDialogBaseRef>(null);
  const transactionFormEditRef = useRef<IDialogBaseRef>(null);
  const transactionDeleteDialogRef = useRef<IDialogBaseRef>(null);
  const categoryFormRef = useRef<IDialogBaseRef>(null);
  const partnerFormRef = useRef<IDialogBaseRef>(null);

  const { sendRequest: getTransactionsList, isLoading: isLoadingTransactions } =
    useHttp();
  const { sendRequest: deleteTransaction } = useHttp();

  const toggleReload = () => {
    setReload((prev) => !prev);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    const id =
      target.parentElement?.parentElement?.getElementsByTagName("input")[0]
        .value;
    setSelectedId(id);
    transactionFormEditRef.current?.show();
  };

  const handleOpenDialogDelete = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLElement;
    const id =
      target.parentElement?.parentElement?.getElementsByTagName("input")[0]
        .value;
    setSelectedId(id);
    transactionDeleteDialogRef.current?.show();
  };

  const handleDeleteTransaction = () => {
    // console.log(selectedId);
    deleteTransaction(
      { url: `${BASE_URL}/transaction/delete/${selectedId}`, method: "DELETE" },
      () => {
        transactionDeleteDialogRef.current?.hide();
        toggleReload();
      }
    );
  };

  useEffect(() => {
    const { page, pageSize } = transactionTableRef.current?.getPageSize() || {};

    getTransactionsList(
      {
        url: `${BASE_URL}/transaction/all?page=${
          page + 1
        }&pageSize=${pageSize}`,
      },
      (data) => {
        transactionTableRef.current?.setTotalCount(data.totalCount);
        const handledData = data.data.map((item: any) => {
          const fullData = {
            ...item,
            amount: dotStyleCurrency(item.amount),
            partner: item.partner.name,
            category: item.category.name,
            type: item.type.name,
            date: new Date(item.date).toLocaleDateString(),
            id: item._id,
          };
          return fullData;
        });

        setTransactionList(handledData);
      }
    );
  }, [reload]);
  // console.log(transactionList);
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
      <ConfirmDialog
        title="Delete Transaction"
        onSubmit={handleDeleteTransaction}
        content="Are you sure to delete this transaction?"
        ref={transactionDeleteDialogRef}
      />
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
        fields={[
          { key: "amount", label: "Price" },
          { key: "category", label: "Category" },
          { key: "date", label: "Date" },
          { key: "description", label: "Description" },
          { key: "isDone", type: "checkbox", label: "Done" },
          { key: "partner", label: "Partner" },
          { key: "type", label: "Type" },
          { key: "actions", type: "actions", label: "Actions" },
        ]}
        data={transactionList}
        isLoading={isLoadingTransactions}
        handleEdit={handleEdit}
        handleChangePage={toggleReload}
        handleDelete={handleOpenDialogDelete}
        ref={transactionTableRef}
      />
    </div>
  );
}
