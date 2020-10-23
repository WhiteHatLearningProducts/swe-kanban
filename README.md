# Kanban
## organise your tasks
----
![Kanban screen shot](https://user-images.githubusercontent.com/4499581/97007662-a629ab80-1539-11eb-9aa3-aa9f09dd2477.png)

```sh
npm run dev
```

```javascript
const connectionSettings = {
    test: {dialect: 'sqlite', storage: 'sqlite::memory:'},
    dev: {dialect: 'sqlite', storage: path.join(__dirname, 'data.db'), logging: false},
    production: {dialect: 'postgres', protocal: 'postgres'}
}
```
