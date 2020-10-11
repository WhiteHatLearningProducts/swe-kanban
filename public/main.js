const state = {
    tasks: []
}
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        const task = {
            id: window.crypto.getRandomValues(new Uint8Array(2)).join(''),
            text: data.get('text'),
            highlight: '',
            status: 0
        }
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(() => app.run('getTasks'))
        return state
    },
    onDragStart: (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },
    onDrop: (state, event) => {
        event.preventDefault()
        const id = event.dataTransfer.getData('text')
        const index = state.tasks.findIndex(task => task.id === id)
        state.tasks.splice(index, 1)
        return state
    },
    onHighlight: (state, event) => {
        event.preventDefault()
        event.stopPropagation()
        const id = event.dataTransfer.getData('text')
        const index = state.tasks.findIndex(task => task.id === id)
        state.tasks[index].highlight = 'highlight'
        return state
    },
    getTasks: async (state) => {
        state.tasks = await fetch('/tasks').then(res => res.json())
        return state
    }
}
const view = state => `
    <section>
        <h2>Tasks</h2>
        <article>
            <ul>
                ${state.tasks.map(task => `<li id="${task.id}" class="${task.highlight}" draggable="true" ondragstart="app.run('onDragStart', event)">${task.text}</li>`).join("")}
            </ul>
            <div ondragover="event.preventDefault();" ondrop="app.run('onDrop', event)"></div>
        </article>
    <section>
    <section>
        <form onsubmit="app.run('add', this); return false;">
            <input name="text" placeholder="Add a task" />
            <button>Add</button>
        </form>
    </section>
`
app.start('app', state, view, update)
app.run('getTasks')
