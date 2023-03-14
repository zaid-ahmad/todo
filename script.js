/*
Task, date, priority
*/

const categories = [];

function CreateTask(task, date, priority, cat) {
  this.task = task;
  this.date = date;
  this.priority = priority;
  this.cat = cat;

  categories.push(this.cat);
}

export {
  categories, CreateTask,
};

/*
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
            // Firefox
            || e.code === 1014
            // test name field too, because code might not be present
            // everything except Firefox
            || e.name === 'QuotaExceededError'
            // Firefox
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  console.log('yes we indeed can!');
} else {
  // Too bad, no localStorage for us
  console.log('well this sucks, well gotta find another way then');
}
*/
