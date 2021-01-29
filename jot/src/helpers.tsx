export const getCurrentDay = (day: string) => {
    const daysOfWeek : string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date();
    const currentDay = daysOfWeek[date.getDay()];
    return currentDay === day;
};

export const secondsToTimeFormat = (seconds: number) => {
// TODO
};