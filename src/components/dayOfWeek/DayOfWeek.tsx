import { Box, Checkbox, Switch, Typography } from '@mui/material';
import SalevanStore from '../../store/SalevanStore';
import { Day } from '../types';
import { observer } from 'mobx-react-lite';

export type DayProps = {
    day: Day,

}
const DayOfWeek = observer((props: DayProps) => {
    const { isChooseChange, isActiveChange } = SalevanStore;
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
                    checked={props.day.isChoose}
                    onChange={(event) => isChooseChange(props?.day.id, event?.target.checked)}
                />
                <Typography display='block' textAlign='start'>{props?.day?.title}</Typography>
            </Box>
            <Box display='flex'
                flexDirection='row'
                alignItems='center'
                gap={6}>
                <Typography>{props?.day?.timeFrom} - {props?.day?.timeTo}</Typography>
                <Switch checked={props.day.isActive} onChange={(event) => isActiveChange(props?.day.id, event?.target.checked)}></Switch>
            </Box>

        </Box>
    )
})

export default DayOfWeek;