import { WeekDay } from "../enums/enums";

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
    start: string;
    end: string;
    is_active: boolean;
};

export type SettingsData = {
  weekDays: Record<WeekDay, Day>;
  attempt: number;
  intensity: number;
  lifetime: number;
  running: string;
  robotState: number;
  defaultQueueName: string;
  useDefaultQueue: number;
  ignoreCompanyNumbers: Array<string>;
} | null;

export type SettingsGetData = {
  week_days: Array<object>;
  attempt: number;
  intensity: number;
  lifetime: number;
  running: string;
  switch: number;
  default_queue_name: string;
  use_default_queue: number;
  ignore_company_numbers: Array<string>;
};

export type SelectValues = {
  label: string;
  id: number
}
