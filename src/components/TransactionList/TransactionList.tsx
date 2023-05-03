import React, { useEffect } from "react";
import { TransactionEntity } from "../../types/entities/transaction.entity";
import CustomTable from "../CustomTable/CustomTable";
import { HOST_URL } from "../../constants";
import { Button } from "@mui/material";

export default function TransactionList() {
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
    <div>
      <CustomTable columns={columns} rows={dataHandled} />
    </div>
  );
}
