import { Dialog, DialogTitle } from "@mui/material";
import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import { IDialogBaseRef } from "../../types/dialog";

type Props = { children: ReactNode; title: string };
const FormDialog = forwardRef(
  (props: Props, ref: React.Ref<IDialogBaseRef>) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      show: handleClickOpen,
      hide: handleClose,
    }));

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        {props.children}
      </Dialog>
    );
  }
);

export default FormDialog;
