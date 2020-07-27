import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import './Form.scss';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch'
            }
        }
    })
);

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
    checkedB: boolean;
    checkedA: boolean;
}

export default function InputAdornments() {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        checkedA: true,
        checkedB: true
    });
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const submitForm = () => {
        console.log(values, 'find');
    };

    return (
        <div className='Basic'>
            <div className='form'>
                <label className='bookClass'>BOOK</label>
                <span className='yourticket'>YOUR TICKET</span>
                <form
                    className={clsx(classes.root)}
                    noValidate
                    autoComplete='off'
                >
                    <TextField
                        id='outlined-basic'
                        // label='Outlined'
                        placeholder='From*'
                        variant='outlined'
                    />
                    <TextField
                        id='outlined-basic'
                        // label='Outlined'
                        placeholder='To*'
                        variant='outlined'
                    />
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                    />
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.checkedA}
                                    onChange={handleCheckboxChange}
                                    name='checkedA'
                                    color='primary'
                                />
                            }
                            label='Flexible With Date'
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.checkedB}
                                    onChange={handleCheckboxChange}
                                    name='checkedB'
                                    color='primary'
                                />
                            }
                            label='Divyaang concession'
                        />
                    </div>
                    <Button variant='contained' color='primary'>
                        Find Trains
                    </Button>
                </form>
            </div>
        </div>
    );
}
