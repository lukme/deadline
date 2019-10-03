let ul = document.querySelector('.tasks'),
    tasks = [],
    addBtn = document.querySelector('.addHandle'),
    addSubmitBtn = document.querySelector('.addSubmit'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    count = false,
    taskData = [
        document.querySelector('.addContent').children[2], // Name
        document.querySelector('.addContent').children[4] // Deadline
    ],
    actualDatePara = document.querySelector('.currentDate'),
    welcomePlaceholder = document.querySelectorAll('.listPlaceholder'),
    el = "";

// Open and close add panel
addBtn.addEventListener('click', menageAddPanel);

function menageAddPanel() {
    if (!count) {
        count = !count;
        addPanel.className = "addPanel addOpened";
        addContent.className = "addContent shown";
    } else {
        count = !count;
        addPanel.className = "addPanel addClosed";
        addContent.className = "addContent hidden";
    }
}

class Task {
    constructor() {
        this.name = document.querySelector('.addContent').children[2].value;
        this.start = Date.now();
        this.deadline = document.querySelector('.addContent').children[4].value;
    }
}

class AddTask {
    constructor(tasks) {
        this.tasks = tasks;
    }

    createObject() {
        let task = new Task;
        tasks.push(task);
        console.log(tasks);
        el = task;
    }

    createElements(el) {
        const li = document.createElement('LI'),
            div = document.createElement('DIV'),
            percentage = document.createElement('P'),
            start = document.createElement('P'),
            deadline = document.createElement('P'),
            name = document.createElement('P'),
            finishedBtn = document.createElement('BUTTON'),
            finishedBtnImg = document.createElement('IMG'),
            endDate = `${el.deadline.slice(8, 10)}.${el.deadline.slice(5, 7)}.${el.deadline.slice(0, 4)}`; // dd.mm.rrrr
        li.classList.add('task');
        div.classList.add('progressBar');
        percentage.classList.add('taskPercentage');
        start.classList.add('taskStart');
        deadline.classList.add('taskDeadline');
        name.classList.add('taskName');
        finishedBtn.classList.add('taskFinished');
        finishedBtn.id = el;
        finishedBtnImg.setAttribute('src', '/media/tic_archive.svg');
        finishedBtnImg.setAttribute('alt', 'taskFinished');
        finishedBtn.appendChild(finishedBtnImg);
        finishedBtn.addEventListener('click', function(e) {
            RemoveElement.remove(el, e)
        }.bind(finishedBtn));
        name.innerText = el.name;
        start.innerText = el.start;
        deadline.innerText = endDate;
        li.appendChild(div);
        li.appendChild(percentage);
        li.appendChild(start);
        li.appendChild(deadline);
        li.appendChild(name);
        li.appendChild(finishedBtn);
        ul.insertBefore(li, ul.children[0]);

        // Clear the inputs
        taskData.forEach(el => {
            el.value = "";
        });
        saveToLocalStorage()
        updateDates();
    }
}

class RemoveElement {
    static remove(el, e) {
        // tasks.splice(tasks.length, 1);
        e.target.parentElement.parentElement.remove();
        saveToLocalStorage();
    }
}

getFromLocalStorage()

class InitApp {
    constructor() {
        this.addTask = new AddTask();
        this.initAddBtn = document.querySelector('.addSubmit').addEventListener('click', () => {
            this.addTask.createObject();
            this.addTask.createElements(el);
        });
        if (tasks.length > 0) {
            tasks.forEach((el) => {
                // console.log(el);
                this.addTask.createElements(el);
            })
        }
    }
}

function updateDates() {
    let li = document.querySelectorAll('.task');

    li.forEach((el) => {
        const buildInStartSeconds = el.children[2].innerText,
            deadline = new Date(`${el.children[3].innerText.slice(3, 5)}/${el.children[3].innerText.slice(0, 2)}/${el.children[3].innerText.slice(6, 10)}`),
            deadlineSeconds = Date.parse(deadline);
        today = Date.now(),

            buildInDifference = deadlineSeconds - buildInStartSeconds,
            realDifference = (deadlineSeconds - today);
        percentDifference = (realDifference / buildInDifference) * 100;
        percentValue = (100 - Math.floor(percentDifference));

        // console.log((realDifference / buildInDifference) * 100);  // TEMP

        if (percentValue <= 40) {
            el.children[0].style.backgroundColor = "rgba(64, 221, 127, .55)";
        } else if (percentValue > 40 && percentValue <= 60) {
            el.children[0].style.backgroundColor = "rgba(237, 194, 43, .55)";
        } else if (percentValue > 60 && percentValue <= 80) {
            el.children[0].style.backgroundColor = "rgba(248, 120, 3, .55)";
        } else if (percentValue > 80) {
            el.children[0].style.backgroundColor = "rgba(243, 0, 0, .55)";
        }

        if (percentValue > 100 || percentValue <= 0) {
            el.children[1].innerText = 100 + "%";
            el.children[0].style.width = 100 + "%";
            el.children[0].style.backgroundColor = "rgba(243, 0, 0, .55)";
        } else {
            el.children[1].innerText = percentValue + "%";
            el.children[0].style.width = percentValue + "%";
        }
    })

    // set actual date on top
    function dateZero(i) {
        return `${i}`.padStart(2, "0");
    }
    const actualDateParaDate = new Date();
    actualDatePara.innerText = `${dateZero(actualDateParaDate.getDate())}.${dateZero(actualDateParaDate.getMonth() + 1)}.${dateZero(actualDateParaDate.getFullYear())}`;
}

function saveToLocalStorage() {
    const elements = JSON.stringify(tasks);
    localStorage.setItem('tasks', elements);
}

function getFromLocalStorage() {
    if (localStorage.length !== 0) {
        const elements = localStorage.getItem('tasks');
        tasks = JSON.parse(elements);
    }
}

const initApp = new InitApp;
window.onload = updateDates;
// setInterval(updateDates, 10000);