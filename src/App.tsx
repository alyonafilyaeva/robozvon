import './App.css'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import Days from './components/days/Days'
import { observer } from 'mobx-react-lite'
import SalevanStore from './store/SalevanStore'
import { NumericFormat } from 'react-number-format'
import { useEffect } from 'react'
import { RadioQueue, RadioRobotState } from './enums/enums'
import { SelectValues } from './components/types'

const App = observer(() => {
  const {
    arrayQueueOptions,
    excludedNumbersOptions,
    intervalChange,
    lifeTimeChange,
    attemptsChange,
    robotStateChange,
    defaultQueueChange,
    defaultQueueItemChange,
    excludedNumbersChange,
    editSettingsRequest,
    getSettingsRequest,
    data,
    isLoading
  } = SalevanStore;

  const { weekDays,
    intensity,
    lifetime,
    attempt,
    robotState,
    defaultQueueName,
    useDefaultQueue,
    ignoreCompanyNumbers
  } = data ?? {};

  useEffect(() => {
    getSettingsRequest()
  }, [])

  const chooseIgnoreCompanyNumbers = excludedNumbersOptions.filter((item) => ignoreCompanyNumbers?.indexOf(item.label) !== -1)

  const handleChangeDefaultQueue = (event: React.ChangeEvent<HTMLInputElement>) => {
    defaultQueueChange(event.target.value)
  }

  const handleChangeDefaultQueueItem = (_: React.SyntheticEvent<Element, Event>, newValue: SelectValues | null) => {
    if (!newValue) {
      return
    }

    defaultQueueItemChange(newValue.label)
  }

  const handleChangeExcludedNumbers = (_: React.SyntheticEvent, newValue: SelectValues[]) => {
    if (!newValue) {
      return
    }
    excludedNumbersChange(newValue)
  }

  const handleChangeRobotState = (event: React.ChangeEvent<HTMLInputElement>) => {
    robotStateChange(event.target.value)
  }

  return (
    isLoading ? <CircularProgress /> : <>
      <Box display='flex' flexDirection='row' justifyContent='space-around'>
        {weekDays && <Days weekDays={weekDays} />}
        <Box display='flex' flexDirection='column' justifyContent='space-between' gap={4}>
          <Box>
            <Typography variant='h6' paddingBottom={'1rem'}>Настройка звонков</Typography>
            <Box display='flex' flexDirection='row' justifyContent='space-around' gap={5}>
              <NumericFormat
                customInput={TextField}
                id="outlined-basic"
                label="Интервал"
                variant="outlined"
                allowNegative={false}
                value={intensity}
                onChange={(event) => intervalChange(event.target.value)}>
              </NumericFormat>
              <NumericFormat
                customInput={TextField}
                id="outlined-basic"
                label="Время жизни"
                variant="outlined"
                allowNegative={false}
                value={lifetime}
                onChange={(event) => lifeTimeChange(event.target.value)}>
              </NumericFormat>
              <NumericFormat
                customInput={TextField}
                id="outlined-basic"
                label="Количество попыток"
                variant="outlined"
                allowNegative={false}
                value={attempt}
                onChange={(event) => attemptsChange(event.target.value)}>
              </NumericFormat>
            </Box>
          </Box>
          <Box>
            <Typography variant='h6'>Очередь по умолчанию</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue={useDefaultQueue}
              onChange={handleChangeDefaultQueue}
            >
              <FormControlLabel
                value={RadioQueue.off}
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={RadioQueue.notCalled}
                control={<Radio />}
                label="Не вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value={RadioQueue.called}
                control={<Radio />}
                label="Вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value={RadioQueue.always}
                control={<Radio />}
                label="Всегда"
                labelPlacement="end"
              />
            </RadioGroup>
            {useDefaultQueue !== 0 && <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={arrayQueueOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Выбрать" />}
              value={arrayQueueOptions.find((item) => item.label === defaultQueueName) ?? null}
              onChange={handleChangeDefaultQueueItem}
            />}
          </Box>
          <Box>
            <Typography variant='h6'>Исключить номера</Typography>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={excludedNumbersOptions}
              value={chooseIgnoreCompanyNumbers}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Выбрать" />}
              onChange={handleChangeExcludedNumbers}
            />
          </Box>
          <Box>
            <Typography variant='h6'>Состояние робота</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue={robotState}
              onChange={handleChangeRobotState}
            >
              <FormControlLabel
                value={RadioRobotState.off}
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={RadioRobotState.on}
                control={<Radio />}
                label="Включен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={RadioRobotState.sleep}
                control={<Radio />}
                label="Дремать ночью"
                labelPlacement="end"
              />
            </RadioGroup>
          </Box>
          <Box display='flex' flexDirection='row' justifyContent='end' gap={2}>
            <Button variant="text" color="primary">Отмена</Button>
            <Button variant="text" color="primary" onClick={editSettingsRequest}>Сохранить</Button>
          </Box>
        </Box>

      </Box>
    </>)
});

export default App
