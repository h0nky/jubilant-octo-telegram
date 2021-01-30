import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, Typography, Divider } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { colors, fontSize } from "../constants/constants";
import Schedule from "./Schedule";

const useStyles = makeStyles({
  root: {
    width: 424,
    minWidth: 424,
    minHeight: 460,
    maxHeight: 460,
    borderRadius: 14
  },
  title: {
    fontSize: fontSize.xLarge,
    color: colors.black,
    fontFamily: 'Roboto Bold',
  },
  divider: {
    backgroundColor: colors.black
  },
});

export default function Scheduler(): ReactElement {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          pl={5.5}
          pr={5.5}
          pb={2.5}
          pt={4.5}
        >
          <Box mr={2}>
            <AccessTimeIcon />
          </Box>
          <Typography className={classes.title}>
              Opening hours
          </Typography>
        </Box>
        <Box ml={5.5} mr={5.5}>
          <Divider className={classes.divider} />
        </Box>
        <Box pt={0} pl={5.5} pr={5.5}>
            <Schedule />
        </Box>
    </Card>
  );
}
