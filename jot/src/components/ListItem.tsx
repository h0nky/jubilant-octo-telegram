import React, { ReactElement, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fontSize, colors } from "../constants/constants";

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
    value: string
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
    workingHours: any,
    isToday: boolean
}


  // Renders day of the week
  const renderDay = (day: string, isToday: boolean): ReactElement => {
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

  // Renders restauraunt time schedule
  const renderDaySchedule = (value: string): ReactElement => {
    const classes = useStyles();

    if (!value) {
        return (<ScheduleItem className={classes.scheduleSecondary} value="Closed" />);
    } else {
        // return (<ScheduleItem className={classes.schedulePrimary} value={value} />);
    }
  };

export default function Item({ day, workingHours, isToday }: IItemProps) {
  const classes = useStyles();
  
  return (
    <>
        <ListItem className={classes.root}>
            <ListItemText
                className={classes.textWrapper}
                primary={renderDay(day, isToday)}
                secondary={renderDaySchedule(workingHours)}
            />
        </ListItem>
        <Divider />
    </>
  );
}
