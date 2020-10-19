const viewUsers = state => `
    <section class="user-list">
        <button onclick="app.run('showModal')">add user</button>
        ${state.users.map(user => {
            return `
                <article class="user-pill">
                    <img src="${user.avatar}" alt="${user.name}"/>
                    <span>${user.name}</span>
                </article>
            `
        }).join("")}
    </section>
`

const viewBoards = state => `
    <section>
        ${state.boards.map(board => {
            return `
                <a href="/boards/${board.id}">
                    <article class="board-card">
                        <h2>${board.title}</h2>
                    </article>
                </a>
            `
        }).join("")}
    </section>
`

const viewAddUserModal = state => state.modal ? `
    <section id="modal" onclick="app.run('hideModal')">
        <form action="/users" method="POST" onsubmit="event.stopPropagation()">
            <input name="name" placeholder="username" required/>
            <input name="avatar" type="url" placeholder="avatar URL" required />
            <button>Add User</button>
        </form>
    </section>
` : ""

const view = state => [
    viewUsers(state),
    viewBoards(state),
    viewAddUserModal(state)
].join("")

const update = {
    showModal: state => {
        state.modal = true
        return state
    },
    hideModal: state => {
        state.modal = false
        return state
    }
}

app.start('landing', state, view, update)