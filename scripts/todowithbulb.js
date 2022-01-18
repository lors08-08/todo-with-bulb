class Task {
    constructor(text) {
        this.text = text
    }
}

class ToDoList {
    constructor() {
        this.tasks = []
        this.searchedTask = ''
        this.foundTasks = []
        this.render(this.tasks)
    }

    render(arrayOfTasks) {
        this.setSwitch()
        this.renderTasksList(arrayOfTasks)
        this.searchTask()
    }

    renderTasksList(tasks) {
        document.querySelector('.tasks-list').innerHTML = ''
        const list = document.querySelector('.tasks-list')
        tasks.forEach((task, idx) => {
            const taskItem = document.createElement('div')
            const removeTaskButton = document.createElement('div')

            taskItem.className = 'task'
            taskItem.innerText = task.text

            removeTaskButton.addEventListener('click', () => {
                list.removeChild(taskItem)
                this.tasks = this.tasks.slice(0, idx).concat(this.tasks.slice(idx+1, this.tasks.length))
                this.renderTasksList(this.tasks)
            })

            list.appendChild(taskItem)
        })

    }


    addTask(text) {
        if (text === '' || text === null) {
            alert("It would be too easy for you :)")
        } else {
            const input = document.querySelector('.input')
            input.value = ''
            this.tasks.push(new Task(text))
        }
        this.renderTasksList(this.tasks)
    }

    searchTask() {
        const searchBtn = document.querySelector('.btn-search')
        const searchInput = document.querySelector('.input')

        searchBtn.addEventListener('click', () => {
            this.searchedTask = searchInput.value

            if (this.searchedTask !== '') {
                this.foundTasks = this.tasks.filter((item) => item.text.indexOf(this.searchedTask) !== -1)
                if(this.foundTasks.length === 0) {
                    alert('Not found anything')
                }
                this.renderTasksList(this.foundTasks)
            }
        })
    }

    setSwitch() {
        const mainWrapper = document.querySelector('.main-wrapper')
        const btn = document.querySelector('.btn')
        const btnAdd = document.querySelector('.btn-add')
        const input = document.querySelector('.input')
        const audio = document.querySelector('#audio')

        btn.addEventListener('click', () => {
            mainWrapper.classList.toggle('on')
            audio.play()
        })

        btnAdd.addEventListener('click', () => {
            this.addTask(input.value)
        })
    }
}

const todo = new ToDoList()