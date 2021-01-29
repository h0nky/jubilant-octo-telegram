import React, { FC, ReactElement, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fontSize, colors } from "../styles/variables";
import * as helpers from "../helpers";

const useStyles = makeStyles(() => ({
  root: {
    padding: 0
  },
  textPrimary: {
    fontSize: fontSize.medium,
    textTransform: 'capitalize',
    fontFamily: 'Roboto Medium'
  },
  label: {
    fontSize: fontSize.small,
    color: colors.green,
    textTransform: 'uppercase',
    fontFamily: 'Roboto Medium'
  },
  schedulePrimary: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: 'Roboto Regular'
  },
  scheduleSecondary: {
    color: colors.grey3,
    fontSize: fontSize.medium,
    fontFamily: 'Roboto Regular'
  },
  textWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 4
  }
}));

interface IScheduleItemProps {
    className: string,
    value: any
}

const ScheduleItem = ({ className, value }: IScheduleItemProps): ReactElement => (
    <Fragment>
        <Typography
            component="span"
            className={className}
        >
            {value}
        </Typography>
    </Fragment>
);

interface IItemProps {
    day: string,
    schedule: any
}

const getTimeGaps = () => {};

export default function Item({ day, schedule }: IItemProps) {
  const classes = useStyles();

  // Renders [today] label if nessesary or return false
  const renderLabel = (day: string): ReactElement | boolean => {
    return helpers.getCurrentDay(day) && (
        <Typography
            component="span"
            className={classes.label}
        >
            Today
        </Typography>
    )};

    // Renders day of the week
  const renderDay = (day: string): ReactElement => {
    return (
        <Fragment>
            <Typography
                component="span"
                className={classes.textPrimary}
            >
                {day}
            </Typography>
            {renderLabel(day)}
        </Fragment>
    );
  };

  // Renders restauraunt time schedule
  const renderDaySchedule = (value: string): ReactElement => {
    if (!value?.length) {
        return (<ScheduleItem className={classes.scheduleSecondary} value="Closed" />);
    } else {
        return (<ScheduleItem className={classes.schedulePrimary} value="10 AM" />);
    }
  };

  return (
    <>
        <ListItem className={classes.root}>
            <ListItemText
                className={classes.textWrapper}
                primary={renderDay(day)}
                secondary={renderDaySchedule(schedule[day])}
            />
        </ListItem>
        <Divider />
    </>
  );
}
