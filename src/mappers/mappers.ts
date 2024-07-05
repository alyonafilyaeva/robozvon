import { WeekDay } from "../enums/enums"

const RUSSIAN_WEEKDAYS = {
    "monday": 'Понедельник',
    "tuesday": 'Вторник',
    "wednesday": 'Среда',
    "thursday": 'Четверг',
    "friday": 'Пятница',
    "saturday": 'Суббота',
    "sunday": 'Воскресенье'
}

export const getRussianNameDay = (day: WeekDay) => {
    return RUSSIAN_WEEKDAYS[day]
}