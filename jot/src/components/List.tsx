import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { fontSize } from "../styles/variables";
import Item from "./ListItem";

const useStyles: any = makeStyles(({
  root: {
    padding: 0
  },
  textPrimary: {
    fontSize: fontSize.medium,
    textTransform: 'capitalize'
  },
  divider: {
    marginLeft: 42,
    marginRight: 42
}
}));

interface IListProps {
    days: string[],
    schedule: any
}

const ItemsList = ({ days, schedule }: IListProps): ReactElement => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {days.map((day: string) => (<Item day={day} schedule={schedule} />))}
    </List>
  );
}

export default ItemsList;