import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EnhancedTableHead from "../EnhancedTableHead";
import EnhancedTableToolbar from "../EnhancedTableToolbar";
import orderBy from "lodash/orderBy";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style"; 

const  EnhancedTable = (props) => {
  const { classes, columnData, data, rows } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderedBy, setOrderedBy] = React.useState(columnData[3].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [items, setItems] = React.useState(orderBy(data, orderedBy, order));

  const handleSort = columnName => {
    if (orderedBy === columnName) {
      const isAsc = order === "asc" ? true : false;
      setOrder(isAsc ? "desc" : "asc");
    }

    setOrderedBy(columnName);
    setItems(orderBy(data, orderedBy, order));
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter(d =>
      d.class_name.toLowerCase().includes(value) ||
      d.name.toLowerCase().includes(value)
    );
    setItems(orderBy(filteredData, orderedBy, order));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar onSearch={handleSearch} />
        <TableContainer>
          <Table
            className={classes.table}
            size="medium"
            aria-label="Enhanced Table"
          >
            <EnhancedTableHead
              columnData={columnData}
              order={order}
              orderBy={orderedBy}
              onRequestSort={handleSort}
            />
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(r => {
                  return (
                    <TableRow
                      key={r.name}
                      hover
                    >
                      <TableCell>{r.class_name}</TableCell>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{r.description}</TableCell>
                      <TableCell>{r.due}</TableCell>
                      <TableCell>{r.completed ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default withStyles(styles)(EnhancedTable);
