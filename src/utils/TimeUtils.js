export const TimeDate = (now)=>{
    return new Date(now).toLocaleString().replace(/:\d{1,2}$/,' ');
}