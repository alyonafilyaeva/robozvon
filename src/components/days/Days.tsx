import DayOfWeek from '../dayOfWeek/DayOfWeek'
import { Box } from '@mui/material'
import { Day } from '../types'
import SalevanStore from '../../store/SalevanStore'
import { observer } from 'mobx-react-lite'
import EditPanel from '../editPanel/EditPanel'

const Days = observer((props) => {
    const { week} = SalevanStore;

    return (
        <Box gap={10}>
            <EditPanel />
            {!!props.weekDays && Object.keys(props.weekDays).map((key) =>
                <DayOfWeek day={props.weekDays[key]} title={key}/>
            )}
        </Box>

    )
})

export default Days