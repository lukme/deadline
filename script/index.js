let ul = document.querySelector('.tasks'),
    // li = document.querySelectorAll('.task'),
    addBtn = document.querySelector('.addHandle'),
    addSubmitBtn = document.querySelector('.addSubmit'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    count = false,
    taskData = [];

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

function initAddTask() {
    taskData = [
        document.querySelector('.addContent').children[1], // Name
        document.querySelector('.addContent').children[2], // Deadline
    ];
    if (taskData[0].value && taskData[1].value) {
        createElement();
        menageAddPanel();
        countPercent();
    } else { return };
}

function createElement() {
    const li = document.createElement('LI'),
        div = document.createElement('DIV'),
        percentage = document.createElement('P'),
        start = document.createElement('P'),
        deadline = document.createElement('P'),
        name = document.createElement('P'),
        finishedBtn = document.createElement('BUTTON'),
        finishedBtnImg = document.createElement('IMG'),
        endDate = `${taskData[1].value.slice(8, 10)}.${taskData[1].value.slice(5, 7)}.${taskData[1].value.slice(0, 4)}`; // dd.mm.rrrr
        startSeconds = Date.now();
    li.classList.add('task');
    div.classList.add('progressBar', 'firstPeriod');
    percentage.classList.add('taskPercentage');
    start.classList.add('taskStart');
    deadline.classList.add('taskDeadline');
    name.classList.add('taskName');
    finishedBtn.classList.add('taskFinished');
    finishedBtnImg.setAttribute('src', '/media/tic_archive.svg');
    finishedBtnImg.setAttribute('alt', 'taskFinished');
    finishedBtn.appendChild(finishedBtnImg);
    finishedBtn.addEventListener('click', removeElement);
    start.innerText = startSeconds;
    deadline.innerText = endDate;
    name.innerText = taskData[0].value;
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
}

function removeElement() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

addSubmitBtn.addEventListener('click', initAddTask);

function countPercent() {
    let li = document.querySelectorAll('.task');
    
    li.forEach((el) => {

        let buildInStartSeconds = el.children[2].innerText,
            // buildInStart = buildInStart,
            deadline = new Date(`${el.children[3].innerText.slice(3,5)}/${el.children[3].innerText.slice(0,2)}/${el.children[3].innerText.slice(6,10)}`),
            deadlineSeconds = Date.parse(deadline);
            today = Date.now(),

            buildInDifference = deadlineSeconds - buildInStartSeconds,
            realDifference = deadlineSeconds - today;

            percentDifference = (realDifference / buildInDifference) * 100;

        console.log(buildInDifference);
        console.log(realDifference);
        el.children[1].innerText = Math.floor(percentDifference) + "%";
    })
}
