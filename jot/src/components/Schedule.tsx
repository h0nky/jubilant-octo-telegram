import React, { ReactElement, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from "./ListItem";
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

const getFormatedSchedule = (): ISchedule => {
  // Original data object to an array [day, workingDays[]] like structure
  const workWeekArray = Object.entries(data);

  // Binding each time period to a corresponding day
  const workDaysByHours = workWeekArray
  .map(([day, workHours]) => workHours
  .map((hours: string[]) => ({ day, ...hours }))).flat();
  

  // Logic here doesn't expect to have a gap between work days [for ex. restaurant is opened from Sunday till Tuesday].
  if (workDaysByHours[0] && workDaysByHours[0].type === 'close') {
    if (workDaysByHours[0].day === 'monday')
      workDaysByHours.push(workDaysByHours.shift());
    else 
      workDaysByHours.shift();
  }

  // Creating array of [open] [close] pairs
  const workHoursPairs = workDaysByHours.reduce((acc, curr, index, arr) => {
    if (index % 2 === 0) acc.push(arr.slice(index, index + 2));
    return acc;
  }, []);

  // Transform array back to an object
  const workingHours = workHoursPairs.reduce((acc: any, pairEntries: IDaySchedule[]) => {
    console.log(pairEntries.length);
    let result;
    let [openHours] = pairEntries;

    // If restaurant opened / closed multiple times during the same day
    if (acc.hasOwnProperty([openHours.day])) {
      acc[openHours.day] = [ ...acc[openHours.day], ...pairEntries ];
      result = { ...acc, [openHours.day]: acc[openHours.day] };
    } else {
      result = { ...acc, [openHours.day]: pairEntries }
    }

    return result;
  }, {});

  return workingHours;
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
          <Item
            key={`list-${day}-1`}
            day={day}
            workingHours={workHours[day]}
            isToday={utils.getCurrentDay(day)}
          />))}
    </List>
  );
}

export default Schedule;