import { useState } from 'react'
import './App.css'
import { Autocomplete, Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Days from './components/days/Days'
import { InitialState } from './components/types'
import { observer } from 'mobx-react-lite'
import SalevanStore from './store/SalevanStore'

const App = observer(() => {
  console.log(SalevanStore)
  const { week, interval, lifeTime, attempts, defaultQueue,arrayQueue,  excludedNumbers, robotState, intervalChange, lifeTimeChange, attemptsChange, robotStateChange, defaultQueueChange } = SalevanStore
  return (
    <>
      <Box display='flex' flexDirection='row' justifyContent='space-around'>
        <Days />
        <Box display='flex' flexDirection='column' justifyContent='space-between' gap={4}>
          <Box>
            <Typography variant='h6'>Какой то заголовок блока</Typography>
            <Box display='flex' flexDirection='row' justifyContent='space-around' gap={5}>
              <TextField id="outlined-basic" label="Интервал" variant="outlined" type='number' value={interval} onChange={(event) => intervalChange(event.target.value)} />
              <TextField id="outlined-basic" label="Время жизни" variant="outlined" type='number' value={lifeTime} onChange={(event) => lifeTimeChange(event.target.value)} />
              <TextField id="outlined-basic" label="Количество попыток" variant="outlined" type='number' value={attempts} onChange={(event) => attemptsChange(event.target.value)}/>
            </Box>
          </Box>
          <Box>
            <Typography variant='h6'>Очередь по умолчанию</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="Выключен"
              onChange={(event) => defaultQueueChange(event.target.value)}
            >
              <FormControlLabel
                value="Выключен"
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Не вызывались"
                control={<Radio />}
                label="Не вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Вызывались"
                control={<Radio />}
                label="Вызывались"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Всегда"
                control={<Radio />}
                label="Всегда"
                labelPlacement="end"
              />
            </RadioGroup>
            {defaultQueue !== 'Выключен' && <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={arrayQueue}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Выбрать" />}

            />}
          </Box>
          <Box>
            <Typography variant='h6'>Исключить номера</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={excludedNumbers}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Выбрать" />}

            />
          </Box>
          <Box>
            <Typography variant='h6'>Состояние робота</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="Выключен"
              onChange={(event) => robotStateChange(event.target.value)}
            >
              <FormControlLabel
                value="Выключен"
                control={<Radio />}
                label="Выключен"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Включен"
                control={<Radio />}
                label="Включен"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Дремать ночью"
                control={<Radio />}
                label="Дремать ночью"
                labelPlacement="end"
              />
            </RadioGroup>
          </Box>
          <Box display='flex' flexDirection='row' justifyContent='end' gap={2}>
            <Button variant="text" color="primary">Отмена</Button>
            <Button variant="text" color="primary">Сохранить</Button>
          </Box>
        </Box>

      </Box>
    </>)
});

export default App
