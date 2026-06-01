window.mouseX = 0;
window.mouseY = 0;
window.shadowOffsetX = 0;
window.shadowOffsetY = 0;


document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    const shadow = document.querySelector('.cursor-shadow');

    document.addEventListener('mousemove', function(event) {
        window.mouseX = event.pageX;
        window.mouseY = event.pageY;
        
        if (cursor) {
            cursor.style.left = event.pageX + 'px';
            cursor.style.top = event.pageY + 'px';
        }
        if (shadow) {
            shadow.style.left = (event.pageX + window.shadowOffsetX) + 'px';
            shadow.style.top = (event.pageY + window.shadowOffsetY) + 'px';
        }
    });
});