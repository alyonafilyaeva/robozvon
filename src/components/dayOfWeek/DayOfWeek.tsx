import { Box, Checkbox, Switch, Typography } from '@mui/material';
import SalevanStore from '../../store/SalevanStore';
import { Day } from '../types';
import { observer } from 'mobx-react-lite';
import { WeekDays } from '../../enums/enums';

export type DayProps = {
    day: Day,
    title: string
}
const DayOfWeek = observer((props: DayProps) => {
    const { isChooseChange, isActiveChange, arrayChooseDays } = SalevanStore;
    const title = props.title
    console.log()
    return (
        <Box display='flex'
            flexDirection='row'
            alignItems='center'
            borderRadius={4}
            border={'1px solid #9E9E9E'}
            height={'3rem'}
            width={'25rem'}
            justifyContent={'space-between'}
            paddingInline={'1rem'}
            marginBlock={'0.5rem'}
            textAlign='end'
        >
            <Box display='flex'
                flexDirection='row'
                alignItems='center'
                gap={2}>
                <Checkbox
                    checked={arrayChooseDays.includes(title)}
                    onChange={(event) => isChooseChange(title, event?.target.checked)}
                />
                <Typography display='block' textAlign='start'>{WeekDays[title]}</Typography>
            </Box>
            <Box display='flex'
                flexDirection='row'
                alignItems='center'
                gap={6}>
                <Typography>{props?.day?.start.substr(0,5)} - {props?.day?.end.substr(0,5)}</Typography>
                <Switch checked={props.day.is_active} onChange={(event) => isActiveChange(title, event?.target.checked)}></Switch>
            </Box>

        </Box>
    )
})

export default DayOfWeek;