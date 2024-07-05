import DayOfWeek from '../dayOfWeek/DayOfWeek'
import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import EditPanel from '../editPanel/EditPanel'
import { Day } from '../types'
import { WeekDay } from '../../enums/enums'

type DaysProps = {
    weekDays: Record<WeekDay, Day>
}

const Days = observer((props: DaysProps) => {
    return (
        <Box gap={10}>
            <EditPanel />
            {!!props.weekDays && Object.keys(props.weekDays).map((key) =>
                <DayOfWeek day={props.weekDays[key as WeekDay]} title={key as WeekDay} />
            )}
        </Box>
    )
})

export default Days;