let btn = document.querySelector('.addHandle'),
    addPanel = document.querySelector('.addPanel'),
    addContent = document.querySelector('.addContent'),
    count = false;
btn.addEventListener('click', function() {
    if (!count) {
        count = !count;
        addPanel.className = "addPanel addOpened";
        addContent.className = "addContent shown";

    } else {
        count = !count;
        addPanel.className = "addPanel addClosed";
        addContent.className = "addContent hidden";
    }
})