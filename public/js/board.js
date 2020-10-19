const view = state => `
    <h1>${state.board.title}</h1>
    <section>
        <aside>
            <h2>todo</h2>
            ${state.board.tasks
            .filter(task => task.status === 0)
            .map(task => {
                return `
                    <article class="task">
                        ${task.desc}
                    </article>
                `
            }).join("")}
        </aside>
        <aside>
            <h2>doing</h2>
        </aside>
        <aside>
            <h2>done</h2>
        </aside>
    </section>
`
const update = {}

app.start('board', state, view, update)