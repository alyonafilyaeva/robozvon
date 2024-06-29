import DayOfWeek from '../dayOfWeek/DayOfWeek'
import { Box, Button, Checkbox, Switch, TextField, Typography } from '@mui/material'
import { Day } from '../types'
import SalevanStore from '../../store/SalevanStore'
import { observer } from 'mobx-react-lite'

const Days = observer(() => {
    const { week, allTimeFrom, allTimeTo, allTimeFromChange, allTimeToChange, allTimeChange } = SalevanStore;
    const isChoose: boolean = week.some((day: Day) => day.isChoose)
    return (
        <Box gap={10}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6'>Дни недели</Typography>
                {isChoose && <Button variant="outlined" onClick={allTimeChange}>Изменить время</Button>}
            </Box>
            {isChoose && <Box display='flex'
                flexDirection='row'
                alignItems='center'
                height={'3rem'}
                width={'25rem'}
                justifyContent={'space-between'}
                paddingInline={'1rem'}
                marginBlock={'1rem'}
            >
                <Box display='flex'
                flexDirection='row'
                alignItems='center'
                gap={2}>
                    <Checkbox></Checkbox>
                    <Typography>День </Typography>
                </Box>
                <Box display='flex'
                flexDirection='row'
                alignItems='center'
                gap={2}>
                    <Box display='flex'
                        flexDirection='row' 
                        alignItems='center'
                        width={'10rem'} 
                        gap={1}>
                        <TextField size="small" value={allTimeFrom} onChange={(event) => allTimeFromChange(event.target.value)}></TextField>
                        <Typography>-</Typography>
                        <TextField size="small" value={allTimeTo} onChange={(event) => allTimeToChange(event.target.value)}></TextField>
                    </Box>
                    <Switch></Switch>
                </Box>


            </Box>}
            {week.map((day: Day) =>
                <DayOfWeek day={day} key={day.id} />
            )}
        </Box>

    )
})

export default Days