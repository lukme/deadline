let ul = document.querySelector('.tasks'),
    // li = document.querySelectorAll('.task'),
    addBtn = document.querySelector('.addHandle'),
    addSubmitBtn = document.querySelector('.addSubmit'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    count = false,
    taskData = [],
    actualDatePara = document.querySelector('.currentDate');

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
        document.querySelector('.addContent').children[2], // Name
        document.querySelector('.addContent').children[4], // Deadline
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
    div.classList.add('progressBar');
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

        const buildInStartSeconds = el.children[2].innerText,
            deadline = new Date(`${el.children[3].innerText.slice(3,5)}/${el.children[3].innerText.slice(0,2)}/${el.children[3].innerText.slice(6,10)}`),
            deadlineSeconds = Date.parse(deadline);
            today = Date.now(),

            buildInDifference = deadlineSeconds - buildInStartSeconds,
            realDifference = (deadlineSeconds - today);

            percentDifference = (realDifference / buildInDifference) * 100;
            percentValue = (100 - Math.floor(percentDifference));

        // console.log(buildInDifference);
        // console.log(realDifference);
        // console.log(percentValue);

        console.log((realDifference / buildInDifference) * 100);

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
    actualDatePara.innerText = `${dateZero(actualDateParaDate.getDate())}.${dateZero(actualDateParaDate.getMonth()+1)}.${dateZero(actualDateParaDate.getFullYear())}`;
}

window.onload(countPercent());
setInterval(countPercent, 60000);