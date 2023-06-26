import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Checkbox } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import NoDataImage from "../UI/NoDataImage";
import LoadingSpin from "../UI/LoadingSpin";

type Props = {
  isLoading: boolean;
  fields: { key: string; type?: string; label: string }[];
  data: any[];
  interleavedBackgroundFieldKey?: string;
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangePageInfo: () => void;
};

const CustomTable = React.forwardRef(
  (
    {
      isLoading,
      fields,
      data,
      interleavedBackgroundFieldKey,
      handleEdit,
      handleDelete,
      handleChangePageInfo,
    }: Props,
    ref
  ) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCount, setTotalCount] = React.useState(0);

    // const { isLoading, fields, data, handleEdit, handleDelete } = props;

    const changePageHandler = (event: unknown, newPage: number) => {
      event;
      setPage(newPage);
      handleChangePageInfo?.();
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log("pageNUm: ", event.target.value);
      setRowsPerPage(+event.target.value);
      setPage(0);
      handleChangePageInfo?.();
    };

    React.useImperativeHandle(ref, () => {
      return {
        getPageSize: () => ({
          page,
          pageSize: rowsPerPage,
        }),
        setTotalCount: (totalCount: number) => {
          setTotalCount(totalCount);
        },
      };
    });

    let interleavedBackgroundColor = "#fff";

    return (
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={`Header-${field.key}`} align={"center"}>
                    {field.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {data.map((row, i) => {
                  if (interleavedBackgroundFieldKey && i >= 1) {
                    if (
                      row[interleavedBackgroundFieldKey] !==
                      data[i - 1][interleavedBackgroundFieldKey]
                    ) {
                      interleavedBackgroundColor =
                        interleavedBackgroundColor === "#fff"
                          ? "#f1f3f5"
                          : "#fff";
                    }
                  }
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`table-row-${i}`}
                      style={{
                        backgroundColor: interleavedBackgroundColor,
                      }}
                    >
                      {fields.map((field) => {
                        if (field.type === "actions") {
                          return (
                            <TableCell key={row.id} align="center">
                              <Button onClick={handleEdit}>
                                <input type="text" value={row.id} hidden />
                                <ModeEditOutlineIcon />
                              </Button>
                              <Button color="error" onClick={handleDelete}>
                                <input type="text" value={row.id} hidden />
                                <DeleteOutlineIcon />
                              </Button>
                            </TableCell>
                          );
                        } else if (field.type === "checkbox") {
                          return (
                            <TableCell key={row.id} align="center">
                              <Checkbox
                                checked={row[field.key]}
                                disabled={true}
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={row.id} align="center">
                              {row[field.key]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {!isLoading && data.length === 0 && <NoDataImage />}
        {isLoading && <LoadingSpin />}
        <TablePagination
          rowsPerPageOptions={[7, 10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={changePageHandler}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{
            style: isLoading ? { opacity: 0.5, pointerEvents: "none" } : {},
          }}
          backIconButtonProps={{
            style: isLoading ? { opacity: 0.5, pointerEvents: "none" } : {},
          }}
        />
      </Paper>
    );
  }
);

export default React.memo(CustomTable) as typeof CustomTable;
