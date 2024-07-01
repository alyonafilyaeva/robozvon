import { Box, Button, Checkbox, Switch, TextField, Typography } from '@mui/material'
import SalevanStore from '../../store/SalevanStore'
import { observer } from 'mobx-react-lite'
import { PatternFormat } from 'react-number-format';
import { Day } from '../types';

const EditPanel = observer(() => {
    const { data, allTimeFrom, allTimeTo, allIsActive, allIsChoose, allTimeFromChange, 
        allTimeToChange, allTimeChange, allIsActiveChange, allIsChooseChange } = SalevanStore;
    return (
        <Box>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6'>Дни недели</Typography>
                {/* isChoose && */ <Button variant="outlined" onClick={allTimeChange}>Изменить время</Button>}
            </Box>
            <Box display='flex'
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
                    <Checkbox /* indeterminate={isChoose} */ onChange={(event) => allIsChooseChange(event.target.checked)} /* checked={allIsChoose} */></Checkbox>
                    <Typography>День</Typography>
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
                        <PatternFormat
                            format="##:##"
                            mask="_"
                            size='small'
                            customInput={TextField}
                            onChange={(event) => allTimeFromChange(event.target.value)}
                        >
                        </PatternFormat>
                        <Typography>-</Typography>
                        <PatternFormat
                            format="##:##"
                            mask="_"
                            size='small'
                            customInput={TextField}
                            onChange={(event) => allTimeToChange(event.target.value)}
                        >
                        </PatternFormat>
                    </Box>
                    <Switch value={allIsActive} onChange={(event) => allIsActiveChange(event.target.checked)}></Switch>
                </Box>
            </Box>
        </Box>
    )
})

export default EditPanel;