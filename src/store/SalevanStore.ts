import axios from "axios";
import { Day, SettingsData } from "../components/types";
import { makeAutoObservable } from "mobx";
import { EditSettings, GetSettings } from "../api";
import { WeekDays } from "../enums/enums";

class SalevanStore {
  data: SettingsData = {};
  /* week: Array<Day> = [
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
  ]; */
  /* intensity: number = 0;
  lifetime: number = 0;
  attempt: number = 0; */
  defaultQueue: string = "Выключен";
  arrayQueueOptions: Array<object> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
  ];
  itemQueueId: number = 0;
  excludedNumbersOptions: Array<object> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
    { label: "CCCC", id: 3 },
  ];
  excludedNumbers: Array<object> = [];
  robotState: string = "Выключен";
  allTimeFrom: string = "";
  allTimeTo: string = "";
  arrayChooseDays: Array<string> = [];
  allIsActive: boolean = false;
  allIsChoose: boolean = false;
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this);
  }

  intervalChange = (currentIntensity: string) => {
    this.data.intensity = +currentIntensity;
  };

  lifeTimeChange = (currentLifeTime: string) => {
    this.data.lifetime = +currentLifeTime;
  };

  attemptsChange = (currentAttempt: string) => {
    this.data.attempt = +currentAttempt;
  };

  robotStateChange = (cuurentRobotState: string) => {
    this.data.robotState = +cuurentRobotState;
  };

  defaultQueueChange = (currentDefaultQueue: string) => {
    this.data.defaultQueueName = currentDefaultQueue;
  };

  isChooseChange = (dayKey: string, checked: boolean) => {
    if (checked) {
      this.arrayChooseDays.push(dayKey);
    } else {
      const index = this.arrayChooseDays.indexOf(dayKey)
      this.arrayChooseDays.splice(index, 1)
    }
    console.log(this.arrayChooseDays)
  };

  isActiveChange = (dayKey: string, checked: boolean) => {
    this.data.weekDays[dayKey].isActive = checked;
  };

  allTimeFromChange = (currentTimeFrom: string) => {
    this.allTimeFrom = currentTimeFrom;
  };

  allTimeToChange = (currentTimeTo: string) => {
    this.allTimeTo = currentTimeTo;
  };

  allTimeChange = () => {
    console.log(this.arrayChooseDays)
    for (let i = 0; i < this.arrayChooseDays.length; i++) {
      this.data.weekDays[this.arrayChooseDays[i]].start = this.allTimeFrom;
      this.data.weekDays[this.arrayChooseDays[i]].end = this.allTimeTo;
    }
  };

  allIsActiveChange = (currentAllIsActive: boolean) => {
    const keys = Object.keys(this.data.weekDays)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      this.data.weekDays[key].is_active = currentAllIsActive;
    }
    this.allIsActive = currentAllIsActive;
  };

  allIsChooseChange = (currentAllIsChoose: boolean) => {
    const keys = Object.keys(this.data.weekDays)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      currentAllIsChoose 
      ? this.arrayChooseDays.push(key)
      : this.arrayChooseDays = []
    }
    this.allIsActive = currentAllIsChoose;
  };

  defaultQueueItemChange = (currentDefaultQueueItem: number) => {
    this.itemQueueId = currentDefaultQueueItem;
  };

  excludedNumbersChange = (currentExcludedNumber: object) => {
    this.excludedNumbers.push(currentExcludedNumber);
  };

  setIsLoading = (status: boolean) => {
    this.isLoading = status
  }

  getSettingsRequest = (settingsData: object) => {
    this.data.weekDays = settingsData.week_days
    this.data.defaultQueueName = settingsData.default_queue_name
    this.data.ignoreCompanyNumbers = settingsData.ignore_company_numbers
    this.data.useDefaultQueue = settingsData.use_default_queue
    this.data.attempt = settingsData.attempt
    this.data.intensity = settingsData.intensity
    this.data.lifetime = settingsData.lifetime
    this.data.running = settingsData.running
    this.data.robotState = settingsData.switch
  }

  editSettingsRequest = () => {
    const post = {week_days: this.data.weekDays,
    attempt: this.data.attempt,
    intensity: this.data.intensity,
    lifetime: this.data.lifetime,
    running: this.data.running,
    // 0=Выключен, 1=включен, 2=дремлет
    switch: this.data.robotState,
    default_queue_name: this.data.defaultQueueName,
    use_default_queue: this.data.useDefaultQueue,
    ignore_company_numbers: this.data.ignoreCompanyNumbers}
    console.log(post)
  }
  
}

export default new SalevanStore();
