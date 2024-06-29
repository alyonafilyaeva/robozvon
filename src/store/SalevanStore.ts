import { Day } from "../components/types";
import { makeAutoObservable } from "mobx";

class SalevanStore {
  week: Array<Day> = [
    {
      id: 1,
      title: "Понедельник",
      timeFrom: "10:00",
      timeTo: "11:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 2,
      title: "Вторник",
      timeFrom: "20:00",
      timeTo: "21:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 3,
      title: "Среда",
      timeFrom: "10:00",
      timeTo: "15:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 4,
      title: "Четверг",
      timeFrom: "10:00",
      timeTo: "15:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 5,
      title: "Пятница",
      timeFrom: "12:00",
      timeTo: "20:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 6,
      title: "Суббота",
      timeFrom: "15:00",
      timeTo: "16:00",
      isActive: false,
      isChoose: false,
    },
    {
      id: 7,
      title: "Воскресенье",
      timeFrom: "16:00",
      timeTo: "20:00",
      isActive: false,
      isChoose: false,
    },
  ];
  interval: number = 0;
  lifeTime: number = 0;
  attempts: number = 0;
  defaultQueue: string = "Выключен";
  arrayQueue: Array<object> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
  ];
  excludedNumbers: Array<object> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
  ];
  robotState: string = "Выключен";
  allTimeFrom: string = "00:00";
  allTimeTo: string = "00:00";
  arrayChooseDays: Array<number> = [];

  constructor() {
    makeAutoObservable(this);
  }

  intervalChange = (currentInterval: string) => {
    this.interval = +currentInterval;
  };

  lifeTimeChange = (currentLifeTime: string) => {
    this.lifeTime = +currentLifeTime;
  };

  attemptsChange = (currentAttempts: string) => {
    this.attempts = +currentAttempts;
  };

  robotStateChange = (cuurentRobotState: string) => {
    this.robotState = cuurentRobotState;
  };

  defaultQueueChange = (currentDefaultQueue: string) => {
    this.defaultQueue = currentDefaultQueue;
  };

  isChooseChange = (id: number, checked: boolean) => {
    this.week[id - 1].isChoose = checked;
    this.arrayChooseDays.push(id);
  };

  isActiveChange = (id: number, checked: boolean) => {
    this.week[id - 1].isActive = checked;
  };

  allTimeFromChange = (currentTimeFrom: string) => {
    this.allTimeFrom = currentTimeFrom;
  };

  allTimeToChange = (currentTimeTo: string) => {
    this.allTimeTo = currentTimeTo;
  };

  allTimeChange = () => {
    for (let i = 0; i < this.arrayChooseDays.length; i++) {
      this.week[this.arrayChooseDays[i]-1].timeFrom = this.allTimeFrom;
      this.week[this.arrayChooseDays[i]-1].timeTo = this.allTimeTo;
    }
  };
}

export default new SalevanStore();
