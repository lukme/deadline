let ul = document.querySelector('.tasks'),
    tasks = [],
    addBtn = document.querySelector('.addHandle'),
    addSubmitBtn = document.querySelector('.addSubmit'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    addPanelCount = false,
    descriptionCount = false,
    taskData = [
        document.querySelector('.addContent').children[2], // Name
        document.querySelector('.addContent').children[4].children[0], // Deadline
        document.querySelector('.addContent').children[4].children[1], // Deadline Time
        document.querySelector('.addContent').children[6] // Description
    ],
    actualDatePara = document.querySelector('.currentDate'),
    welcomePlaceholder = document.querySelectorAll('.listPlaceholder'),
    reminder = document.querySelector('.reminder'),
    reminderTasks = document.querySelector('.reminder .tasksNames'),
    el = "";

// Open and close add panel
addBtn.addEventListener('click', menageAddPanel);

function menageAddPanel() {
    if (!addPanelCount) {
        addPanelCount = !addPanelCount;
        addPanel.className = "addPanel addOpened";
        addContent.className = "addContent shown";
    } else {
        addPanelCount = !addPanelCount;
        addPanel.className = "addPanel addClosed";
        addContent.className = "addContent hidden";
    }
}

class Task {
    constructor() {
        this.name = document.querySelector('.addContent').children[2].value;
        this.start = Date.now();
        this.deadline = document.querySelector('.addContent').children[4].children[0].value;
        this.deadlineTime = document.querySelector('.addContent').children[4].children[1].value;
        this.description = document.querySelector('.addContent').children[6].value;
    }
}

class AddTask {
    constructor(tasks) {
        this.tasks = tasks;
    }

    createObject() {
        let task = new Task;
        tasks.push(task);
        el = task;
        menageAddPanel()
    }

    createElements(el) {
        const li = document.createElement('LI'),
            div = document.createElement('DIV'),
            percentage = document.createElement('P'),
            start = document.createElement('P'),
            deadline = document.createElement('P'),
            deadlineTime = document.createElement('P'),
            name = document.createElement('P'),
            descriptionBtn = document.createElement('P'),
            description = document.createElement('P'),
            finishedBtn = document.createElement('BUTTON'),
            finishedBtnImg = document.createElement('IMG'),
            endDate = `${el.deadline.slice(8, 10)}.${el.deadline.slice(5, 7)}.${el.deadline.slice(0, 4)}`; // dd.mm.rrrr
        li.classList.add('task');
        div.classList.add('progressBar');
        percentage.classList.add('taskPercentage');
        start.classList.add('taskStart');
        deadline.classList.add('taskDeadline');
        deadlineTime.classList.add('taskDeadlineTime');
        name.classList.add('taskName');
        description.classList.add('taskDescription');
        descriptionBtn.classList.add('descriptionBtn');
        finishedBtn.classList.add('taskFinished');
        finishedBtnImg.setAttribute('src', '/media/tic_archive.svg');
        finishedBtnImg.setAttribute('alt', 'taskFinished');
        finishedBtn.appendChild(finishedBtnImg);
        finishedBtn.addEventListener('click', function (e) {
            RemoveElement.remove(el, e)
        }.bind(finishedBtn));
        name.innerText = el.name;
        descriptionBtn.innerText = "info";
        description.innerText = el.description;
        start.innerText = el.start;
        deadline.innerText = endDate;
        deadlineTime.innerText = el.deadlineTime;
        li.appendChild(div);
        li.appendChild(percentage);
        li.appendChild(start);
        li.appendChild(deadline);
        li.appendChild(deadlineTime);
        (el.description) ? li.appendChild(descriptionBtn) : null;
        li.appendChild(name);
        li.appendChild(description);
        li.appendChild(finishedBtn);
        ul.insertBefore(li, ul.children[0]);
        descriptionBtn.addEventListener('click', function (e) {
            Description.showDescription(e)
        })

        // Clear the inputs
        taskData.forEach(el => {
            el.value = "";
            document.querySelector('.addContent').children[4].children[1].value = "08:00";
        });
        saveToLocalStorage()
        updateDates();
    }
}

class RemoveElement {
    static remove(el, e) {
        const index = tasks.indexOf(el);
        tasks.splice(index, 1);
        e.target.parentElement.remove();
        saveToLocalStorage();
    }
}

class Description {
    static showDescription(e) {

        if (!descriptionCount) {
            descriptionCount = !descriptionCount;
            e.target.parentElement.children[7].style.display = "block";
        } else {
            descriptionCount = !descriptionCount;
            e.target.parentElement.children[7].style.display = "none";
        }
    }
}

getFromLocalStorage()

class Reminder {
    constructor() {
        this.tomorrowDeadlines = [];
    }
    checkTomorrow(el) {
        const today = Date.now(),
            oneDay = 86400000,
            deadline = Date.parse(el.deadline);
        ((deadline - today) <= oneDay) ? this.tomorrowDeadlines.push(el) : null;
    }
    showTomorrows() {
        reminderTasks.innerText = [];
        (this.tomorrowDeadlines.length > 1) ? reminder.children[0].innerText = 'You have deadlines soon!' : null;
        this.tomorrowDeadlines.forEach((el) => {
            const reminderObj = document.createElement('P');
            reminderObj.innerText = el.name;
            reminderTasks.appendChild(reminderObj);
        })
    }
}

class InitApp {
    constructor() {
        this.addTask = new AddTask();
        this.reminder = new Reminder();
        this.initAddBtn = document.querySelector('.addSubmit').addEventListener('click', () => {
            if (document.querySelector('.addContent').children[2].value && document.querySelector('.addContent').children[4].children[0].value) {
                this.addTask.createObject();
                this.addTask.createElements(el);
            } else { alert("Please input both task name and deadline") };
        });
        if (tasks.length > 0) {
            tasks.forEach((el) => {
                this.addTask.createElements(el);
                this.reminder.checkTomorrow(el);
            })
            this.reminder.showTomorrows();
            if (reminderTasks.children[0] !== undefined) {
                reminder.style.animation = "reminderSlideIn 2000ms ease-in-out forwards";
                reminder.children[2].addEventListener('click', function () {
                    this.parentNode.style.animation = "reminderSlideOut 600ms ease-in-out forwards"
                })
            }
        }
    }
}

function updateDates() {
    let li = document.querySelectorAll('.task');

    li.forEach((el) => {
        const buildInStartSeconds = el.children[2].innerText,
            deadline = new Date(`${el.children[3].innerText.slice(3, 5)}/${el.children[3].innerText.slice(0, 2)}/${el.children[3].innerText.slice(6, 10)}`),

            deadlineTime = (el.children[4].innerText.slice(0, 2) * 3600000) + (el.children[4].innerText.slice(3, 5) * 60000),

            deadlineSeconds = Date.parse(deadline) + deadlineTime,

            today = Date.now(),

            buildInDifference = deadlineSeconds - buildInStartSeconds,
            realDifference = (deadlineSeconds - today),
            percentDifference = (realDifference / buildInDifference) * 100,
            percentValue = (100 - Math.floor(percentDifference));

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

    // Hide welcome placeholder 
    if (li.length !== 0) {
        welcomePlaceholder.forEach((el) => {
            el.style.display = 'none';
        })
    }

}

function saveToLocalStorage() {
    const elements = JSON.stringify(tasks);
    localStorage.setItem('tasks', elements);
}

function getFromLocalStorage() {
    if (localStorage.getItem('tasks') !== '[]') {
        const elements = localStorage.getItem('tasks');
        tasks = JSON.parse(elements);
    }
}

const initApp = new InitApp;
window.onload = updateDates;
setInterval(updateDates, 10000);
document.querySelector('.addContent').children[4].children[1].value = "08:00";