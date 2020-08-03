import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { InputText } from 'primereact/inputtext';
import './Todos.scss';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { isThisISOWeek } from 'date-fns/esm';
import AlertDialog from './editPopup';
export const deletePost = (id: string) => {
    return {
        type: 'DELETE_TODOS',
        id
    };
};
export const addTodo = (payload: any) => {
    return {
        type: 'ADD_TODO',
        payload
    };
};
type addDataInput = { task: string };
export const fetchTodos = () => {
    return { type: 'FETCH_TODOS' };
};
export const updateTodos = (payload: any) => {
    return { type: 'UPDATE_TODOS', payload };
};

interface TodosProps {
    onTextChange: (text: string) => void;
    todoList: Array<any>;
    addTodoAction: (payload: addDataInput) => void;
    dispatch: any;
    listItemClickAction: () => void;
    deleteItemAction: (id: string) => void;
    updateListAction: (payload: any) => void;
}
interface stateProps {
    task: string;
    city: string;
    showEditPopup: boolean;
    rowData: any;
}
const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
class Todos extends Component<TodosProps, stateProps> {
    constructor(props: TodosProps) {
        super(props);
        this.state = {
            task: '',
            city: 'NY',
            showEditPopup: false,
            rowData: {}
        };
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleInputChange(text: string): void {
        this.setState({ task: text });
    }
    handleSubmit = () => {
        if (!!this.state.task && this.state.task !== '') {
            this.props.addTodoAction({ task: this.state.task });
            this.setState({ task: '' });
        }
    };
    onCityChange = (e: { value: any }) => {
        this.setState({ city: e.value });
    };

    deleteRow = (id: string) => {
        this.props.deleteItemAction(id);
    };
    componentDidMount() {
        this.props.listItemClickAction();
    }
    componentWillMount() {
        console.log('logon');
    }
    saveChanges(updatedData: any) {
        this.props.updateListAction(updatedData);
        this.setState({ showEditPopup: false });
    }

    editRow(rowData: any) {
        this.setState({ rowData, showEditPopup: true });
    }

    public render() {
        const { todoList } = this.props;
        return (
            <div className='todosParent'>
                {this.state.showEditPopup && (
                    <AlertDialog
                        saveChanges={this.saveChanges}
                        rowData={this.state.rowData}
                    />
                )}
                <div className='FormClass'>
                    <InputText
                        value={this.state.task}
                        placeholder='new task'
                    onChange={({target}) =>
                            this.handleInputChange(
                                (target as HTMLInputElement).value
                            )
                        }
                    />
                    <Dropdown
                        optionLabel='name'
                        value={this.state.city}
                        options={cities}
                        onChange={this.onCityChange}
                        placeholder='Select a City'
                    />

                    <Button label='Submit' onClick={this.handleSubmit} />
                </div>
                <table className='table'>
                    <thead>
                        <tr className="captial">
                            <th scope='col'>#</th>
                            <th scope='col'>First</th>
                            <th scope='col'>Last</th>
                            <th scope='col'>Handle</th>
                            <th scope='col'>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList.map((data, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data.categories}</td>
                                    <td>{data.content}</td>
                                    <td>{data.title}</td>
                                    <td>
                                        <Button
                                            label='EDIT'
                                            onClick={() => this.editRow(data)}
                                        />
                                        {' '}
                                        <Button
                                            label='DELETE'
                                            onClick={() =>
                                                this.deleteRow(data.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state: TodosProps) => {
    return {
        todoList: getBarState(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            deleteItemAction: deletePost,
            listItemClickAction: fetchTodos,
            addTodoAction: addTodo,
            updateListAction: updateTodos
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

const getBar = (state: TodosProps) => state.todoList;

const getBarState = createSelector([getBar], (todoList) => todoList);
