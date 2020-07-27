export default (state = [], action: any) => {
    console.log('came',action)
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            return action.todos.data;
    }
    return state;
};
