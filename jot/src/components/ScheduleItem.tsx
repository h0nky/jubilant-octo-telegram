import React, { ReactElement, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { fontSize, colors } from "../constants/constants";
import * as utils from "../utils";

const useStyles = makeStyles((theme) => ({
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
    fontFamily: 'Roboto Medium',
    marginLeft: theme.spacing(1)
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
      marginRight: theme.spacing(.5)
  }
}));

interface IDaySchedule {
  day: string,
  type: string,
  value: number
}

interface IScheduleItemProps {
  day: string,
  workHours: any,
  isToday: boolean
}

interface IWeekDay {
  day: string,
  isToday: boolean
}

interface IScheduleItemTextProps {
  className: string,
  text: string
}

const ScheduleItemText = ({ className, text }: IScheduleItemTextProps) => {
  return (
      <Typography
        component="span"
        className={className}
      >
        {text}
    </Typography>    
  );
};

const DaySchedule = ({ workHours }: { workHours: IDaySchedule[] }) => {
  const classes = useStyles();
  if (!workHours) return (<ScheduleItemText className={classes.scheduleSecondary} text="Closed" />);
  const timePeriods = utils.splitArrayInPairs(workHours);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      {timePeriods?.map((period: IDaySchedule[], index: number) => (
          <ScheduleItemText
            key={`list-${index}-1`}
            className={classes.schedulePrimary}
            text={`${utils.secondsToTimeFormat(period[0].value)} - ${utils.secondsToTimeFormat(period[1].value)}`}
          />
      ))}
    </Box>
  );
}

const WeekDay = ({ day, isToday }: IWeekDay): ReactElement => {
  const classes = useStyles();
  return (
      <Fragment>
          <ScheduleItemText className={classes.textPrimary} text={day} />
          {isToday && ( <ScheduleItemText className={classes.label} text="Today" />)}
      </Fragment>
  );
};

export default function ScheduleItem({ day, workHours, isToday }: IScheduleItemProps) {
  const classes = useStyles();
  return (
    <Fragment>
        <ListItem className={classes.root}>
            <ListItemText
                className={classes.textWrapper}
                primary={<WeekDay day={day} isToday={isToday} />}
                secondary={<DaySchedule workHours={workHours} />}
            />
        </ListItem>
        <Divider />
    </Fragment>
  );
}
