import './App.css'
import { Autocomplete, Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Days from './components/days/Days'
import { observer } from 'mobx-react-lite'
import SalevanStore from './store/SalevanStore'
import { PatternFormat, NumericFormat } from 'react-number-format'
import { useEffect, useState } from 'react'
import { EditSettings, GetSettings } from './api'
import axios from 'axios'

const App = observer(() => {
  const { week,
    defaultQueue,
    itemQueueId,
    excludedNumbers,
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
    data,
    isLoading } = SalevanStore

  const { weekDays, 
    intensity,
    lifetime,
    attempt, 
    running, 
    robotState, 
    defaultQueueName, 
    useDefaultQueue, 
    ignoreCompanyNumbers } = data
  
    const store = {
    intensity: intensity,
    lifetime: lifetime,
    attempt: attempt,
    defaultQueue: defaultQueue,
    itemQueueId: itemQueueId,
    robotState: robotState,
    excludedNumbers: excludedNumbers,
    week: week
  }

  useEffect(() => {
    GetSettings()
  }, [])
  console.log(data)
  return (
    isLoading ? <p>Loading...</p> : <>
      <Box display='flex' flexDirection='row' justifyContent='space-around'>
        <Days weekDays={weekDays}/>
        <Box display='flex' flexDirection='column' justifyContent='space-between' gap={4}>
          <Box>
            <Typography variant='h6' paddingBottom={'1rem'}>Настройка звонков</Typography>
            <Box display='flex' flexDirection='row' justifyContent='space-around' gap={5}>
              <NumericFormat customInput={TextField} id="outlined-basic" label="Интервал" variant="outlined" type="number"
                allowNegative={false} value={intensity} onChange={(event) => intervalChange(event.target.value)}>
              </NumericFormat>
              <NumericFormat customInput={TextField} id="outlined-basic" label="Время жизни" variant="outlined" type='number'
                allowNegative={false} value={lifetime} onChange={(event) => lifeTimeChange(event.target.value)}>
              </NumericFormat>
              <NumericFormat customInput={TextField} id="outlined-basic" label="Количество попыток" variant="outlined" type='number'
                allowNegative={false} value={attempt} onChange={(event) => attemptsChange(event.target.value)}>
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
              onChange={(event) => defaultQueueChange(event.target.value)}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Не вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value={3}
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
              value={defaultQueueName}
              onChange={(event, newValue) => defaultQueueItemChange(newValue.id)}
            />}
          </Box>
          <Box>
            <Typography variant='h6'>Исключить номера</Typography>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={excludedNumbersOptions}
              value={ignoreCompanyNumbers}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Выбрать" />}
              onChange={(event, newValue) => excludedNumbersChange(newValue)}
            />
          </Box>
          <Box>
            <Typography variant='h6'>Состояние робота</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue={robotState}
              onChange={(event) => robotStateChange(event.target.value)}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Включен"
                labelPlacement="end"
              />
              <FormControlLabel
                value={2}
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
