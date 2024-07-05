import { SelectValues, SettingsData } from "../components/types";
import { makeAutoObservable } from "mobx";
import { GetSettings } from "../api/api";
import { WeekDay } from "../enums/enums";

class SalevanStore {
  data: SettingsData = null;
  arrayQueueOptions: Array<SelectValues> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
  ];
  excludedNumbersOptions: Array<SelectValues> = [
    { label: "AAAA", id: 1 },
    { label: "BBBB", id: 2 },
    { label: "CCCC", id: 3 },
  ];
  allTimeFrom = "";
  allTimeTo = "";
  arrayChooseDays: WeekDay[] = [];
  allIsActive = false;
  allIsChoose = false;
  isLoading = false;
  errorTimeFrom = false;
  errorTimeTo = false;

  constructor() {
    makeAutoObservable(this);
  }

  intervalChange = (currentIntensity: string) => {
    if (this.data) {
      this.data.intensity = Number(currentIntensity);
    }
  };

  lifeTimeChange = (currentLifeTime: string) => {
    if (this.data) {
      this.data.lifetime = Number(currentLifeTime);
    }
  };

  attemptsChange = (currentAttempt: string) => {
    if (this.data) {
      this.data.attempt = Number(currentAttempt);
    }
  };

  robotStateChange = (cuurentRobotState: string) => {
    if (this.data) {
      this.data.robotState = Number(cuurentRobotState);
    }
  };

  defaultQueueChange = (currentDefaultQueue: string) => {
    if (this.data) {
      this.data.useDefaultQueue = +currentDefaultQueue;
    }
  };

  isChooseChange = (dayKey: WeekDay, checked: boolean) => {
    checked
      ? this.arrayChooseDays.push(dayKey)
      : (this.arrayChooseDays = this.arrayChooseDays.filter(
          (day) => day !== dayKey
        ));
  };

  isActiveChange = (dayKey: WeekDay, checked: boolean) => {
    if (this.data) {
      this.data.weekDays[dayKey].is_active = checked;
    }
  };

  timeFromChange = (currentTimeFrom: string) => {
    this.allTimeFrom = currentTimeFrom;
    if (!this.errorTimeFrom) {
      this.allTimeFromChange();
    }
  };

  timeToChange = (currentTimeTo: string) => {
    this.allTimeTo = currentTimeTo;
    if (!this.errorTimeTo) {
      this.allTimeToChange();
    }
  };

  allTimeFromChange = () => {
    this.arrayChooseDays.forEach((item) => {
      if (this.data) {
        this.data.weekDays[item].start = this.allTimeFrom;
      }
    });
    document.getElementById("timeTo")?.focus();
  };

  allTimeToChange = () => {
    this.arrayChooseDays.forEach((item) => {
      if (this.data) {
        this.data.weekDays[item].end = this.allTimeTo;
      }
    });
  };

  allTimeChange = () => {
    this.arrayChooseDays.forEach((item) => {
      if (this.data) {
        this.data.weekDays[item].start = this.allTimeFrom;
        this.data.weekDays[item].end = this.allTimeTo;
      }
    });
  };

  allIsActiveChange = (currentAllIsActive: boolean) => {
    this.allIsActive = currentAllIsActive;
    if (this.data) {
      Object.keys(this.data.weekDays).forEach((item) => {
        if (this.data) {
          this.data.weekDays[item as WeekDay].is_active = this.allIsActive;
        }
      });
    }
  };

  allIsChooseChange = (currentAllIsChoose: boolean) => {
    currentAllIsChoose
      ? (this.arrayChooseDays = Object.values(WeekDay))
      : (this.arrayChooseDays = []);
    this.allIsActive = currentAllIsChoose;
  };

  defaultQueueItemChange = (currentDefaultQueueItem: string) => {
    if (this.data) {
      this.data.defaultQueueName = currentDefaultQueueItem;
    }
  };

  excludedNumbersChange = (currentExcludedNumbers: Array<SelectValues>) => {
    if (this.data) {
      this.data.ignoreCompanyNumbers = currentExcludedNumbers.map(
        ({ label }) => label
      );
    }
  };

  setIsLoading = (status: boolean) => {
    this.isLoading = status;
  };

  getSettingsRequest = async () => {
    try {
      this.isLoading = true;
      const response = await GetSettings();
      const {
        default_queue_name,
        week_days,
        use_default_queue,
        ignore_company_numbers,
        switch: robotState,
        ...other
      } = response.data;

      this.data = {
        weekDays: week_days,
        defaultQueueName: default_queue_name,
        useDefaultQueue: use_default_queue,
        ignoreCompanyNumbers: ignore_company_numbers,
        robotState,
        ...other,
      };
      this.isLoading = false;
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  };

  editSettingsRequest = () => {
    if (this.data) {
      const post = {
        week_days: this.data.weekDays,
        attempt: this.data.attempt,
        intensity: this.data.intensity,
        lifetime: this.data.lifetime,
        running: this.data.running,
        switch: this.data.robotState,
        default_queue_name: this.data.defaultQueueName,
        use_default_queue: this.data.useDefaultQueue,
        ignore_company_numbers: this.data.ignoreCompanyNumbers,
      };
      console.log(post);
    }
  };

  errorTimeFromChange = (currentValue: boolean) => {
    this.errorTimeFrom = currentValue;
  };

  errorTimeToChange = (currentValue: boolean) => {
    this.errorTimeTo = currentValue;
  };
}

export default new SalevanStore();
