import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import { IDialogBaseRef } from "../../types/dialog.type";

type Props = {
  children?: ReactNode;
  title: string;
  content?: string;
  onSubmit: () => void;
};
const ConfirmDialog = forwardRef(
  (props: Props, ref: React.Ref<IDialogBaseRef>) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const { onSubmit } = props;

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
        <DialogContent>{props.content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ConfirmDialog;
