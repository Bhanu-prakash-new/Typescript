export default (state = [], action: any) => {
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            return action.todos.data;
        case 'UPDATE_TODOS':
            let rowData: any = state;
            let index: number = rowData.findIndex(
                (data: any) => data.id === action.payload.id
            );
            rowData[index] = action.payload;
            return rowData;
    }
    return state;
};
