const formAddTodo = document.querySelector('.form-add-todo')
const inputSearch = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addNewTodo = value => {
  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${value}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `
}

const resetAddTodoForm = () => {
  formAddTodo.reset()
}

const getTodosThatNotMatchWithSearch = (todos, inputSearchValue) => todos
  .filter(todo => !todo.textContent.toLowerCase().includes(inputSearchValue))

const getTodosThatMatchWithSearch = (todos, inputSearchValue) => todos
  .filter(todo => todo.textContent.toLowerCase().includes(inputSearchValue))

const hiddeTodos = todos => {
  todos.forEach(todo => {
    todo.classList.remove('d-flex')
    todo.classList.add('hidden')
  })
}

const showTodos = todos => {
  todos.forEach(todo => {
    todo.classList.remove('hidden')
    todo.classList.add('d-flex')
  })
}

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()
  const isInputNotEmpty = inputValue.length 

  if (isInputNotEmpty) {
    addNewTodo(inputValue)
    resetAddTodoForm()
  }
})

todosContainer.addEventListener('click', event => {
  const clickedElement = event.target
  const clickedElementClasses = Array.from(clickedElement.classList)
  const shouldElementDeleteTodo = clickedElementClasses.includes('delete')

  if (shouldElementDeleteTodo) {
    clickedElement.parentElement.remove()
  }
})

inputSearch.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  const todosThatNotMatchWithSearch = getTodosThatNotMatchWithSearch(todos, inputValue)
  const todosThatMatchWithSearch = getTodosThatMatchWithSearch(todos, inputValue)
  
  hiddeTodos(todosThatNotMatchWithSearch)
  showTodos(todosThatMatchWithSearch)
})