let ul = document.querySelector('.tasks'),
    addBtn = document.querySelector('.addHandle'),
    addSubmitBtn = document.querySelector('.addSubmit'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    count = false;

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

function createElement() {
    const taskData = [
        document.querySelector('.addContent').children[1],
        document.querySelector('.addContent').children[2],
        document.querySelector('.addContent').children[3]
    ];
    if (taskData[0].value && taskData[1].value && taskData[2].value) {
        const li = document.createElement('LI'),
            div = document.createElement('DIV'),
            percentage = document.createElement('P'),
            deadline = document.createElement('P'),
            name = document.createElement('P'),
            finishedBtn = document.createElement('BUTTON'),
            finishedBtnImg = document.createElement('IMG'),
            endDate = `${taskData[2].value.slice(8, 10)}.${taskData[2].value.slice(5, 7)}.${taskData[2].value.slice(0, 4)}`;
        li.classList.add('task');
        div.classList.add('progressBar', 'firstPeriod');
        percentage.classList.add('taskPercentage');
        deadline.classList.add('taskDeadline');
        name.classList.add('taskName');
        finishedBtn.classList.add('taskFinished');
        finishedBtnImg.setAttribute('src', '/media/tic_archive.svg');
        finishedBtnImg.setAttribute('alt', 'taskFinished');
        finishedBtn.appendChild(finishedBtnImg);
        finishedBtn.addEventListener('click', removeElement);
        deadline.innerText = endDate;
        name.innerText = taskData[0].value;
        li.appendChild(div);
        li.appendChild(percentage);
        li.appendChild(deadline);
        li.appendChild(name);
        li.appendChild(finishedBtn);
        ul.insertBefore(li, ul.children[0]);
        taskData.forEach(el => {
            el.value = "";
        });
        menageAddPanel();
    } else { return };
}

function removeElement() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

addSubmitBtn.addEventListener('click', createElement);



