import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputText } from 'primereact/inputtext';

interface AlertProps {
    saveChanges: (rowdata: any) => any;
    rowData: any;
}
export default function AlertDialog(props: AlertProps) {
    const [rowdata, setRowData] = React.useState(props.rowData);

    const handleClose = () => {
        props.saveChanges(rowdata);
    };
    const saveEditData = (value: any, key: any) => {
        setRowData({
            ...rowdata,
            [key]: value
        });
    };

    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>EDIT RECORD</DialogTitle>
                <DialogContent>
                    <InputText
                        value={rowdata.categories}
                        placeholder='categories'
                        onChange={(event) =>
                            saveEditData(
                                (event.target as HTMLInputElement).value,
                                'categories'
                            )
                        }
                    />
                    <InputText
                        value={rowdata.content}
                        placeholder='content'
                        onChange={(event) =>
                            saveEditData(
                                (event.target as HTMLInputElement).value,
                                'content'
                            )
                        }
                    />
                    <InputText
                        value={rowdata.title}
                        placeholder='title'
                        onChange={(event) =>
                            saveEditData(
                                (event.target as HTMLInputElement).value,
                                'title'
                            )
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Save
                    </Button>
                    <Button onClick={handleClose} color='primary' autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
