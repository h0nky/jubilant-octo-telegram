import React, { ReactElement, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { colors, fontSize } from "../styles/variables";
import List from "./List";

import data from '../data.json';

const daysOfWeek : string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const useStyles: any = makeStyles({
  root: {
    minWidth: 424,
    minHeight: 460,
    borderRadius: 14
  },
  header: {
    paddingTop: 37,
    paddingRight: 42,
    paddingLeft: 42,
    paddingBottom: 0
  },
  title: {
    fontSize: fontSize.xLarge,
    color: colors.black,
    fontFamily: 'Roboto Bold',
    marginTop: 3
  },
  divider: {
      marginLeft: 42,
      marginRight: 42,
      backgroundColor: colors.black
  },
  content: {
    paddingTop: 0,
    paddingLeft: 42,
    paddingRight: 42
  }
});

interface IDaySchedule {
  type: string,
  value: number
}

interface IData {
  [key: string]: IDaySchedule[] 
}

export default function SimpleCard(): ReactElement {
  const [ schedule, setSchedule ] = useState<IData>(data);
  const classes = useStyles();

  useEffect(() => {
    setSchedule(data);
  }, [data]);

  return (
    <Card className={classes.root}>
        <CardHeader
            avatar={
                <AccessTimeIcon />
            }
            className={classes.header}
            title={
                <Typography className={classes.title} gutterBottom>
                    Opening hours
                </Typography>
            }
        />
        <Divider className={classes.divider} />
        <CardContent className={classes.content}>
            <List days={daysOfWeek} schedule={schedule} />
        </CardContent>
    </Card>
  );
}
