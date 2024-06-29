export type InitialState = {
  week: Array<Day>,
  interval: 0;
  lifeTime: 0;
  attempts: 0;
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
