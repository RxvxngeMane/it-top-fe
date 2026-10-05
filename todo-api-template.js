/*
  Заготовка для работы с серверным Todo API.

  Сервер:
  http://212.193.11.210:3000

  Каждый ученик работает со своим списком через заголовок X-Student-Id.
  Нужно поменять STUDENT_ID на свой номер от 1 до 15.
*/

const API_URL = 'http://212.193.11.210:3000';
const STUDENT_ID = 9;

const headers = {
  'X-Student-Id': String(STUDENT_ID),
};

const jsonHeaders = {
  ...headers,
  'Content-Type': 'application/json',
};

async function getTodos() {
  // 1. Делаем GET-запрос (метод GET используется по умолчанию)
  // 2. Передаем заголовки
  const res = await fetch(`${API_URL}/todos`, { headers });
  
  // 3. Возвращаем распарсенный JSON (не забываем await)
  return await res.json();
}

async function createTodo(title) {
  // 1. Делаем POST-запрос
  // 2. Передаем jsonHeaders
  // 3. В body отправляем JSON.stringify({ title })
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ title }),
  });
  
  // 4. Возвращаем созданную задачу
  return await res.json();
}

async function updateTodo(id, data) {
  // 1. Делаем PATCH-запрос
  // 2. Передаем jsonHeaders
  // 3. В body отправляем JSON.stringify(data)
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  
  return await res.json();
}

async function deleteTodo(id) {
  // 1. Делаем DELETE-запрос
  // 2. Передаем headers
  // 3. Ответ не парсим, так как его может не быть
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers,
  });
}

async function main() {
  // Раскомментируйте по шагам и проверьте в консоли
  
  const todos = await getTodos();
  console.log('todos:', todos);

  const created = await createTodo('Новая задача из JS');
  console.log('created:', created);

  const updated = await updateTodo(created.id, { completed: true });
  console.log('updated:', updated);

  await deleteTodo(created.id);
  console.log('deleted id:', created.id);
  
  // Проверим, что задача действительно удалена
  const todosAfterDelete = await getTodos();
  console.log('todos after delete:', todosAfterDelete);
}

main();