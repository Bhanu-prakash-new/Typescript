import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export const deletePost = (id: string) => {
    return {
        type: 'DELETE_TODO',
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

type TodosProps = {
    onTextChange: (text: string) => void;
    listdata: Array<any>;
    addTodoAction: (payload: addDataInput) => void;
    dispatch: any;
    listItemClickAction: () => void;
    deleteItemAction: (id: string) => void;
};

class Todos extends Component<TodosProps, any> {
    constructor(props: TodosProps) {
        super(props);

        this.state = {
            task: ''
        };
    }

    handleInputChange(text: string): void {
        this.setState({ task: text });
    }
    handleSubmit = () => {
        this.props.addTodoAction({ task: this.state.task });
    };
    public render() {
        const { listdata } = this.props;
        console.log(listdata.length, 'find');
        return (
            <div>
                <input
                    onChange={(event) =>
                        this.handleInputChange(event.target.value)
                    }
                    type='text'
                    placeholder='new task'
                    value={this.state.task}
                />
                <button onClick={this.handleSubmit}>Submit</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First</th>
                            <th scope='col'>Last</th>
                            <th scope='col'>Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listdata.map((data, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td> {data.categories}</td>
                                    <td>{data.content}</td>
                                    <td>{data.title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        listdata: state.todoList
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            deleteItemAction: deletePost,
            listItemClickAction: fetchTodos,
            addTodoAction: addTodo
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
