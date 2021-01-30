export const getCurrentDay = (day: string) => {
    const daysOfWeek : string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date();
    const currentDay = daysOfWeek[date.getDay()];
    return currentDay === day;
};

export const secondsToTimeFormat = (seconds: number) => {
    let hours = new Date(seconds * 1000).getUTCHours();
    // let minutes = new Date(seconds * 1000).getUTCMinutes();
    let partOfTheDay = (hours: number) => hours >= 12 ? 'PM' : 'AM';

    // return (hours % 12 === 0 ? 12 : (hours % 12)) + ':' + `${minutes}`.padStart(2, "0") + ' ' + partOfTheDay(hours);
    return (hours % 12 === 0 ? 12 : (hours % 12)) + ' ' + partOfTheDay(hours);
};