export type DataSettings = {
  week: Array<Day>;
  interval: number;
  lifeTime: number;
  attempts: number;
  defaultQueue: string;
  excludedNumbers: [];
  robotState: string;
};

export type Day = {
  id: number;
  title: string;
  timeFrom: string;
  timeTo: string;
  isActive: boolean;
  isChoose: boolean;
};

export type SettingsData = {
  weekDays: Array<object>;
  attempt: number;
  intensity: number;
  lifetime: number;
  running: string;
  robotState: number;
  defaultQueueName: string;
  useDefaultQueue: number;
  ignoreCompanyNumbers: Array<string>;
};
