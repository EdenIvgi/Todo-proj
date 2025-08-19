const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { loadTodos, removeTodo, saveTodo, setFilterSort } from '../store/actions/todo.actions.js'
import { changeBalance } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { TodoSort } from '../cmps/TodoSort.jsx'
import { todoService } from '../services/todo.service.js'
import { PaginationBtns } from "../cmps/PaginationBtns.jsx"
import { utilService } from "../services/util.service.js"

export function TodoIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(todoService.getFilterFromSearchParams(searchParams))
    const todos = useSelector((storeState) => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const maxPage = useSelector((storeState) => storeState.maxPage)

    useEffect(() => {
        loadTodos(filterBy)
        setSearchParams(utilService.getTruthyValues(filterBy))
    }, [filterBy])

    function onRemoveTodo(todoId) {
        const ans = confirm('Do you want to delete this todo?')
        if (!ans) return
        removeTodo(todoId)
            .then(() => {
                console.log('removed todo ' + todoId);
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the todo'))
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Updated ${todoToSave.txt} successfully`)
                if (todoToSave.isDone) {
                    return changeBalance(10)
                }
            })
            .catch(() => showErrorMsg('Had trouble updating the todo'))
    }

    function onSetFilterSort(filterSort) {
        setFilterBy(_filterBy => ({ ..._filterBy, ...filterSort }))
    }


    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        onSetFilterSort({ ...filterBy, pageIdx: newPageIdx, })
    }

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterSort} />
            <TodoSort filterBy={filterBy} onSetFilterBy={onSetFilterSort} />
            <PaginationBtns filterSortBy={filterBy} onChangePageIdx={onChangePageIdx} />
            <Link to="/todo/edit" className="add-todo-btn btn" >Add Todo</Link>
            {isLoading
                ? <h1 className="loader">Loading...</h1>
                : <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            }

        </section>
    )
}