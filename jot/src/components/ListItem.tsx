import React, { ReactElement, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fontSize, colors } from "../constants/constants";
import { secondsToTimeFormat } from "../utils";

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
    workHours: any
}

interface IItemProps {
    day: string,
    workingHours: any,
    isToday: boolean
}

interface IWeekDay {
  day: string,
  isToday: boolean
}

const DaySchedule = ({ workHours }: IScheduleItemProps) => {
  const classes = useStyles();
  console.log(workHours);
  return (
    <Fragment>
      {workHours ? (
          <Typography
              component="span"
              className={classes.schedulePrimary}
          >
              {secondsToTimeFormat(workHours[0].value)} - {secondsToTimeFormat(workHours[1].value)}
          </Typography>) : (
            <Typography
            component="span"
            className={classes.scheduleSecondary}
            >
              Closed
            </Typography>
          )}
    </Fragment>
  );
}

// Renders day of the week
const WeekDay = ({ day, isToday }: IWeekDay): ReactElement => {
  const classes = useStyles();
  return (
      <Fragment>
          <Typography
              component="span"
              className={classes.textPrimary}
          >
              {day}
          </Typography>
          {isToday && (
            <Typography
                component="span"
                className={classes.label}
            >
                Today
            </Typography>
      )}
      </Fragment>
  );
};

export default function Item({ day, workingHours, isToday }: IItemProps) {
  const classes = useStyles();
  
  return (
    <>
        <ListItem className={classes.root}>
            <ListItemText
                className={classes.textWrapper}
                primary={<WeekDay day={day} isToday={isToday} />}
                secondary={<DaySchedule workHours={workingHours} />}
            />
        </ListItem>
        <Divider />
    </>
  );
}
