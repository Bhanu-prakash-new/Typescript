import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { isValidLogin } from '../api/login';

import { NotificationComponent } from '../common/NotificationComponent';
export interface LoginEntity {
    login: string;
    password: string;
}

export const createEmptyLogin = (): LoginEntity => ({
    login: '',
    password: ''
});
const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            maxWidth: 400,
            margin: '0 auto'
        }
    })
);

interface Props extends RouteComponentProps {}

const LoginPageInner = (props: Props) => {
    const [loginInfo, setLoginInfo] = React.useState<LoginEntity>(
        createEmptyLogin()
    );
    const [showLoginFailedMsg, setShowLoginFailedMsg] = React.useState(false);
    const classes = useStyles();
    const childclasses = useFormStyles();
    const resetCount = React.useCallback(() => {
        setLoginInfo(createEmptyLogin());
    }, [setLoginInfo]);

    function onLogin() {
        // if (isValidLogin(loginInfo)) {
        props.history.push('/home');
        // } else {
        //     setShowLoginFailedMsg(true);
        // }
    }
    const onTexFieldChange = (fieldId: any) => (e: any) => {
        onUpdateLoginField(fieldId, e.target.value);
    };
    function onUpdateLoginField(name: string, value: any) {
        setLoginInfo({
            ...loginInfo,
            [name]: value
        });
    }

    return (
        <>
            <Card className={classes.card}>
                <CardHeader title='Login' />
                <CardContent>
                    <div className={childclasses.formContainer}>
                        <TextField
                            label='Name'
                            margin='normal'
                            value={loginInfo.login}
                            onChange={onTexFieldChange('login')}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            margin='normal'
                            value={loginInfo.password}
                            onChange={onTexFieldChange('password')}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={onLogin}
                        >
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <NotificationComponent
                message='Invalid login or password, please type again'
                show={showLoginFailedMsg}
                onClose={() => setShowLoginFailedMsg(false)}
            />
        </>
    );
};

const LoginPage = withRouter<Props, any>(LoginPageInner);
export default LoginPage;

// https://material-ui.com/styles/api/#makestyles-styles-options-hook
const useFormStyles = makeStyles((theme) =>
    createStyles({
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    })
);
