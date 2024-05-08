//The time format used in these utils is DD/MM/YYYY-HH:MM
//This function removes the time part
export const removeDayTime = (date: string) => {
  return date.split("-")[0]
}
