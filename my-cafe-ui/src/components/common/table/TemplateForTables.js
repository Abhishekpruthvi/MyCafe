import React from "react";

// import ExcelIcon from "components/common/elements/ExcelIcon";
// import PdfIcon from "components/common/elements/PdfIcon";
// import Searchbar from "components/common/elements/searchbar";
// import PopupMenu from "./menuPopup";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  iconButtonRoot: {
    padding: "0em"
  }
}));
export default function TemplateForTables({
  importIcons,
  needDropdown,
  dropdownitems,
  children,
  ...gridProps
}) {
  const classes = useStyles();

  return (
    <Grid container item style={{ width: "100%" }} {...gridProps}>
      <Paper elevation={2} style={{ width: "100%", padding: "1.5em" }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid
            container
            item
            xs={12}
            justify="flex-end"
            style={{ flexWrap: "nowrap" }}
          >
            {/* {!!importIcons && (
              <>
                <IconButton classes={{ root: classes.iconButtonRoot }}>
                  <ExcelIcon />
                </IconButton>
                <IconButton classes={{ root: classes.iconButtonRoot }}>
                  <PdfIcon />
                </IconButton>
              </>
            )} */}
            {/* {!!needDropdown && (
              <PopupMenu droplist={dropdownitems} onclick={null} />
            )} */}
          </Grid>
        </Grid>
        <Grid>{children}</Grid>
      </Paper>
    </Grid>
  );
}
