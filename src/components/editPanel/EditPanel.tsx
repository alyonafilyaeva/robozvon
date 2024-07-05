import { Box, Checkbox, Switch, TextField, Typography } from '@mui/material'
import SalevanStore from '../../store/SalevanStore'
import { observer } from 'mobx-react-lite'
import { PatternFormat } from 'react-number-format';
import React from 'react';

const EditPanel = observer(() => {
    const { allIsActive,
        arrayChooseDays,
        errorTimeFrom,
        errorTimeTo,
        allTimeFrom,
        timeFromChange,
        timeToChange,
        allIsActiveChange,
        allIsChooseChange,
        errorTimeFromChange,
        errorTimeToChange
    } = SalevanStore;

    /* const [errorTimeFrom, setErrorTimeFrom] = useState<boolean>()
    const [errorTimeTo, setErrorTimeTo] = useState<boolean>() */
    const handleChangeTimeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.validity.valid) {
            errorTimeFromChange(false)
        } else {
            errorTimeFromChange(true)
        }
        timeFromChange(event.target.value)

    }
    const handleChangeTimeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.validity.valid) {
            errorTimeToChange(false)
        } else {
            errorTimeToChange(true)
        }
        timeToChange(event.target.value)
    }

    const handleAllIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        allIsActiveChange(event.target.checked)
    }

    return (
        <Box>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6'>Дни недели</Typography>
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
                            maxLength={5}
                            onChange={handleChangeTimeFrom}
                            placeholder='00:00'
                            disabled={arrayChooseDays.length === 0}
                            error={errorTimeFrom}
                            inputProps={{
                                pattern: "^([01][0-9]|2[0-3]):([0-5][0-9])$",
                            }}
                            required
                        >
                        </PatternFormat>
                        <Typography>-</Typography>
                        <PatternFormat
                            format="##:##"
                            mask="_"
                            size='small'
                            customInput={TextField}
                            onChange={handleChangeTimeTo}
                            placeholder='23:59'
                            disabled={arrayChooseDays.length === 0}
                            error={errorTimeTo}
                            inputProps={{
                                pattern: "^([01][0-9]|2[0-3]):([0-5][0-9])$",
                            }}
                            id='timeTo'
                        >
                        </PatternFormat>
                    </Box>
                    <Switch value={allIsActive} onChange={handleAllIsActive}></Switch>
                </Box>
            </Box>
        </Box>
    )
})

export default EditPanel;