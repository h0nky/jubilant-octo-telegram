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
  type: string,
  value: number
}

interface IData {
  [key: string]: IDaySchedule[] 
}

interface IWorkHourPair {
  day: string,
  type: string,
  value: number
}

const getWorkingHours = () => {
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

  const workHoursPairs = workDaysByHours.reduce((acc, curr, index, arr) => {
    if (index % 2 === 0) acc.push(arr.slice(index, index + 2));
    return acc;
  }, []);

  const workingHours = workHoursPairs.reduce((acc, pairEntries) => {
    let [openHours] = pairEntries;
    return {
      ...acc,
      [openHours.day]: pairEntries 
    }
  }, {});

  return workingHours;
};

const Schedule = (): ReactElement => {
  const [ schedule, setSchedule ] = useState<IData>(data);
  const [ workingHours, setWorkingHours ] = useState<IData>({});
  const classes = useStyles();

  useEffect(() => {
    setSchedule(data);
  }, [data]);

  useEffect(() => {
    setWorkingHours(getWorkingHours());
  }, []);

  return (
    <List className={classes.root}>
        {daysOfWeek.map((day: string) => (
          <Item
            key={`list-${day}-1`}
            day={day}
            workingHours={workingHours[day]}
            isToday={utils.getCurrentDay(day)}
          />))}
    </List>
  );
}

export default Schedule;