export function readableDateFormat(date:string, shorthen:boolean = false): string{
    const [dayName, month, dateNo, year, time] = String(new Date(date)).split(' ')
    if(shorthen){
        return (`${dateNo}/${month} (${time.slice(0, 5)})`)
    }
    return (`${dayName} ${dateNo}/${month}/${year} (${time})`)
}