export function getFormattedDateString(dateTime: Date) {
    const date =
        dateTime.getDate() < 10
            ? `0${dateTime.getDate()}`
            : dateTime.getDate().toString();
    const month =
        dateTime.getMonth() + 1 < 10
            ? `0${dateTime.getMonth() + 1}`
            : (dateTime.getDate() + 1).toString();
    const year = dateTime.getFullYear().toString();

    const hour =
        dateTime.getHours() < 10
            ? `0${dateTime.getHours()}`
            : dateTime.getHours().toString();
    const minutes =
        dateTime.getMinutes() < 10
            ? `0${dateTime.getMinutes()}`
            : dateTime.getMinutes().toString();

    return `${date}.${month}.${year} ${hour}:${minutes}`;
}
