window.mouseX = 0;
window.mouseY = 0;
window.shadowOX = 0;
window.shadowOY = 0;
window.targetOX = 0;
window.targetOY = 0;

function animateShadow() {
    const speed = 0.01;
    window.shadowOX += (window.targetOX - window.shadowOX) * speed;
    window.shadowOY += (window.targetOY - window.shadowOY) * speed;

    const poly = document.getElementById('shadow-poly');
    const cx = window.mouseX || 0;
    const cy = window.mouseY || 0;
    const W = 50;
    if (poly) {
        poly.setAttribute('points',
            `${cx},${cy} ${cx+W},${cy} ${cx+W+window.shadowOX},${cy+window.shadowOY} ${cx+window.shadowOX},${cy+window.shadowOY}`
        );
    }
    requestAnimationFrame(animateShadow);
}

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', function(event) {
        window.mouseX = event.clientX;
        window.mouseY = event.clientY;

        if (cursor) {
            cursor.style.left = event.clientX + 'px';
            cursor.style.top  = event.clientY + 'px';
        }
    });

    requestAnimationFrame(animateShadow);
});
