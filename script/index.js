let btn = document.querySelector('.addHandle'),
    count = false;
btn.addEventListener('click', function() {
    if (!count) {
        count = !count;
        this.className = "addHandle addOpened";
    } else {
        count = !count;
        this.className = "addHandle addClosed";
    }
})