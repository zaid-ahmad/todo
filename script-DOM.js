/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */

import {
  categories, CreateTask,
} from './script.js';

const tasks = [];

const addTaskEl = document.querySelector('.addBtn');
const coverEl = document.querySelector('.cover');
const formCrossEl = document.querySelector('.cross');
const form = document.querySelector('form');
const options = document.querySelector('#cat');
const inpField = document.querySelector('.cat');
const tasksList = document.querySelector('#taskslist');
const sideBar = document.querySelector('#side-bar');
const tasksInbox = document.querySelector('#sidebar_tasks');
const completedSection = document.querySelector('.completed');
const first = document.querySelector('#first');

const newOptionMaker = (opt_name) => {
  const newOption = new Option(opt_name, 'db');
  options.appendChild(newOption);
};

function onChange() {
  const { value } = options;

  if (value === 'create-new') {
    inpField.classList.toggle('new');
  } else {
    inpField.classList.toggle('new');
  }
}
options.onchange = onChange;
onChange();

addTaskEl.addEventListener('click', () => {
  coverEl.classList.toggle('visible');
  if (categories.length !== 0) {
    for (const category of categories) {
      newOptionMaker(category);
    }
  }
});

formCrossEl.addEventListener('click', () => {
  coverEl.classList.toggle('visible');
});

const taskDisplayer = (task, tag_type) => {
  const li = document.createElement('li');
  const label = document.createElement('LABEL');
  const checkbox = document.createElement('INPUT');
  const span = document.createElement('span');
  const infoDiv = document.createElement('div');
  const p = document.createElement('p');
  const tagDiv = document.createElement('div');
  const tagName = document.createElement('p');

  label.classList.add('main');
  checkbox.setAttribute('type', 'checkbox');
  span.classList.add('checkmark');
  infoDiv.classList.add('info');
  tagDiv.classList.add(tag_type);

  label.textContent = task.task;
  label.id = 'click';
  p.textContent = `(due date: ${task.date})`;
  tagName.textContent = task.priority;

  tagDiv.appendChild(tagName);
  infoDiv.appendChild(p);
  infoDiv.appendChild(tagDiv);
  label.appendChild(infoDiv);
  label.appendChild(checkbox);
  label.appendChild(span);
  li.appendChild(label);
  tasksList.appendChild(li);
};

const taskDisplayerSidebar = (task) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const span = document.createElement('span');
  const taskcontainer = document.querySelector('.project-tasks');

  p.textContent = task.task;
  span.textContent = `(due date: ${task.date})`;

  li.appendChild(p);
  li.appendChild(span);

  const clone = li.cloneNode(true);

  tasksInbox.appendChild(li);
  taskcontainer.appendChild(clone);
};

const buildCategory = () => {
  for (const category of categories) {
    const element = document.querySelector(`.${category}`);
    if (element == null) {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const ul = document.createElement('ul');

      div.classList.add('project');
      if (category.indexOf(' ') >= 0) {
        div.classList.add(`${category.split(' ').join('_')}`);
      } else {
        div.classList.add(`${category}`);
      }
      h2.textContent = category;
      ul.classList.add('project-tasks');

      div.appendChild(h2);
      div.appendChild(ul);
      sideBar.insertBefore(div, completedSection);
    }
  }
};

const displayTasks = (task) => {
  if (categories.length !== 0) {
    buildCategory();
  } else {
    console.log('hi');
  }

  if (task.priority === 'Important') {
    taskDisplayer(task, 'imp-tag');
  } else if (task.priority === 'Urgent') {
    taskDisplayer(task, 'urg-tag');
  } else if (task.priority === 'Not as Important') {
    taskDisplayer(task, 'nimp-tag');
  } else if (task.priority === 'Custom') {
    taskDisplayer(task, 'cus-tag');
  }

  taskDisplayerSidebar(task);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  first.style.display = 'none';

  const temp = [];

  const formData = new FormData(form);

  for (const item of formData) {
    temp.push(item[1]);
  }

  const newTask = new CreateTask(temp[0], temp[1], temp[4], temp[3]);

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(newTask);

  coverEl.classList.toggle('visible');

  form.reset();
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('#click'); // Or any other selector.

  if (target) {
    target.remove();
    alert('Congratulations on completing the task!');
  }
});

window.addEventListener('load', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (storedTasks) {
    tasks.push(...storedTasks);
    tasks.forEach((task) => displayTasks(task));
  }
});
