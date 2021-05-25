export default function moneyNoDivider(moneyString:string){
  if (moneyString.indexOf(".") !== -1){
    let parts = moneyString.split(".")
    let fraction_part_len = 0 
    if (parts.length > 1) fraction_part_len = parts[1].length
    switch(fraction_part_len){
      case 0:
        return parseInt(parts[0]+"00")
      case 1:
        return parseInt(parts[0]+parts[1]+"0")
      case 2:
        return parseInt(parts[0]+parts[1])
    }
  }
  else if (moneyString.indexOf(",") !== -1){
    let parts = moneyString.split(",")
    let fraction_part_len = 0 
    if (parts.length > 1) fraction_part_len = parts[1].length
    switch(fraction_part_len){
      case 0:
        return parseInt(parts[0]+"00")
      case 1:
        return parseInt(parts[0]+parts[1]+"0")
      case 2:
        return parseInt(parts[0]+parts[1])
    }
  }
  return parseInt(moneyString+"00")
}