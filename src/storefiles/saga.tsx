import axios from 'axios';
import { call, put, takeEvery, all } from 'redux-saga/effects';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=edgar1234';

export function* fetchTodos() {
    try {
        const todos = yield call(axios.get, `${ROOT_URL}/posts${API_KEY}`);
        yield put({ type: 'FETCH_TODOS_SUCCESS', todos });
    } catch (error) {
        console.log('fetchTodos error:', error.message);
    }
}

function* watchFetchTodos() {
    yield takeEvery('FETCH_TODOS', fetchTodos);
}

export function* createTodo(action: any) {
    const newTodo = {
        title: action.payload.task,
        categories: action.payload.task,
        content: action.payload.task
    };
    try {
        yield call(axios.post, `${ROOT_URL}/posts${API_KEY}`, newTodo);
        yield put({ type: 'FETCH_TODOS' });
    } catch (error) {
        console.log('createTodo error:', error.message);
    }
}

function* watchAddToDo() {
    yield takeEvery('ADD_TODO', createTodo);
}
export function* deleteTodo(id: any) {
    try {
        yield call(axios.delete, `${ROOT_URL}/posts/${id.id}${API_KEY}`);
        yield put({ type: 'FETCH_TODOS' });
    } catch (error) {
        console.log('deleteTodo Error:', error.message);
    }
}
function* watchDeleteTodo() {
    yield takeEvery('DELETE_TODOS', deleteTodo);
}

export default function* rootSaga() {
    yield all([watchFetchTodos(), watchAddToDo(), watchDeleteTodo()]);
}
