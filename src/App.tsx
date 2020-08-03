import React from 'react';
import './App.css';
import Header from './components/header';
import Todos from './components/Todos';
import InputAdornments from './components/form';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import reducers from './storefiles/reduxCombiners';
import sagas from './storefiles/saga';
import LoginPage from './components/login';

type ContextProps = {
    time: string;
    updateValues: any;
};
export const AppContext = React.createContext<Partial<ContextProps>>({});

const AppContextProvider = AppContext.Provider;

export const AppContextConsumer = AppContext.Consumer;

export interface propsInt {}

export interface stateInt {
    time: string;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(promise, sagaMiddleware));

sagaMiddleware.run(sagas);

class App extends React.Component<propsInt, stateInt> {
    constructor(props: propsInt) {
        super(props);
        this.updateValues = this.updateValues.bind(this);
    }
    public state = {
        time: 'bhanu'
    };
    updateValues(updatevalue: keyof stateInt) {
        this.setState({ ...this.state, time: updatevalue });
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <AppContextProvider
                            value={{
                                ...this.state,
                                updateValues: this.updateValues
                            }}
                        >
                            <label> {this.state.time}</label>
                            <Header></Header>
                            {/* <InputAdornments /> */}
                        </AppContextProvider>
                        <Route path='/home' exact component={InputAdornments} />
                        <Route path='/todos' exact component={Todos} />
                        <Route path='/login' exact component={LoginPage} />
                        <Route exact path='/'>
                            <Redirect to='/todos' />
                        </Route>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
