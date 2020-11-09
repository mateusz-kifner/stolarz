export default function stringToDate(date:string,time:string){
  let date_split = date.split("-")
  let time_split = time.split(":")
  console.log(date_split,time_split)
  console.log(parseInt(date_split[0]),parseInt(date_split[1])-1,parseInt(date_split[2]),parseInt(time_split[0]),parseInt(time_split[1]))
  let new_date =  new Date(parseInt(date_split[0]),parseInt(date_split[1])-1,parseInt(date_split[2]),parseInt(time_split[0]),parseInt(time_split[1]))
  console.log(new_date)
  return new_date
}