export const TimeDate = (now)=>{
    return new Date(now).toLocaleString().replace(/:\d{1,2}$/,' ');
}
export const formatTimestamp = (timestamp)=> {
    const now = new Date();
    const date = new Date(timestamp);

    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInHours < 24) {
        // Within 24 hours, display hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    } else if (diffInHours < 48) {
        // Within 48 hours, display "Yesterday"
        return 'Yesterday';
    } else {
        // More than 48 hours, display specific date (e.g., 23/05/06)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year.toString().slice(-2)}`;
    }
}