export function TodoPreview({ todo, onToggleTodo }) {


    const createdAt = new Date(todo.createdAt).toLocaleDateString('he')
    return (
        <article className="todo-preview" >
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <h4>Created At: {createdAt}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
