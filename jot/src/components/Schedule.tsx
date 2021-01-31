import React, { ReactElement, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ScheduleItem from "./ScheduleItem";
import * as utils from "../utils";

import { daysOfWeek } from '../constants/daysOfWeek';
import data from '../data.json';

const useStyles = makeStyles(({
  root: {
    padding: 0
  }
}));

interface IDaySchedule {
  day: string,
  type: string,
  value: number
}

interface ISchedule {
  [key: string]: IDaySchedule[] 
}

interface IWorkHours {
  type: string,
  value: number
}

const getFormatedSchedule = (): ISchedule => {
  // Original data object to an array [day, workDays[]] like structure
  const workWeekArray = Object.entries(data);

  // Binding each time period to a corresponding day
  const workDaysByHours = workWeekArray
  .map(([day, workHours]: (string|IWorkHours[]|any)[]) => workHours
  .map((hours: string[]) => ({ day, ...hours }))).flat();


  // Logic here doesn't expect to have a gap between work days [for ex. restaurant is opened from Sunday till Tuesday].
  if (workDaysByHours[0] && workDaysByHours[0].type === 'close') {
    if (workDaysByHours[0].day === 'monday')
      workDaysByHours.push(workDaysByHours.shift());
    else 
      workDaysByHours.shift();
  }

  // Creating array of [open] [close] pairs
  const workHoursPairs = utils.splitArrayInPairs(workDaysByHours);

  // Transform array back to an object
  const workHours = workHoursPairs.reduce((acc: any, pairEntries: IDaySchedule[]) => {
    let result;
    let [openHours] = pairEntries;

    // Condition for the case when restaurant opened/closed multiple times during the same day
    if (acc.hasOwnProperty([openHours.day])) {
      acc[openHours.day] = [ ...acc[openHours.day], ...pairEntries ];
      result = { ...acc, [openHours.day]: acc[openHours.day] };
    } else {
      result = { ...acc, [openHours.day]: pairEntries };
    }

    return result;
  }, {});

  return workHours;
};

const Schedule = (): ReactElement => {
  const [ workHours, setWorkHours ] = useState<ISchedule>({});
  const classes = useStyles();

  useEffect(() => {
    setWorkHours(getFormatedSchedule());
  }, []);

  return (
    <List className={classes.root}>
        {daysOfWeek.map((day: string) => (
          <ScheduleItem
            key={`list-${day}-1`}
            day={day}
            workHours={workHours[day]}
            isToday={utils.getCurrentDay(day)}
          />))}
    </List>
  );
}

export default Schedule;