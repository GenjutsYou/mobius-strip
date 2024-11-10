document.addEventListener("DOMContentLoaded", function() {
  const numSegments = 30;  // Number of segments for the Mobius strip
  const radius = 12;       // Radius of the strip's loop
  const content = document.querySelector('.content');

  // Create the Mobius strip's 3D twisted path
  for (let i = 0; i < numSegments; i++) {
    const segment = document.createElement('div');
    segment.classList.add('strip');

    // Calculate the angle for this segment's position
    const angle = (i / numSegments) * 360;
    const z = Math.sin((i / numSegments) * Math.PI) * radius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Set the segment's position and rotation
    segment.style.transform = `translate3d(${x}vmin, ${y}vmin, ${z}vmin) rotateY(${angle}deg)`;

    content.appendChild(segment);
  }

  // Add interaction for zooming and rotating
  let isMouseDown = false;
  let lastX = 0;
  let lastY = 0;

  const container = document.querySelector('.container');

  // Mouse down: Start dragging
  container.addEventListener('mousedown', function(event) {
    isMouseDown = true;
    lastX = event.clientX;
    lastY = event.clientY;
  });

  // Mouse up: Stop dragging
  container.addEventListener('mouseup', function() {
    isMouseDown = false;
  });

  // Mouse move: Rotate the Mobius strip when dragging
  container.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;

      const content = document.querySelector('.content');
      const currentTransform = content.style.transform;
      
      // Extract current rotation values
      const currentRotation = currentTransform.match(/rotateY\((\d+)deg\)/);
      const currentRotationX = currentTransform.match(/rotateX\((\d+)deg\)/);
      
      let rotateY = currentRotation ? parseFloat(currentRotation[1]) : 0;
      let rotateX = currentRotationX ? parseFloat(currentRotationX[1]) : 0;
      
      rotateY += deltaX * 0.2;
      rotateX -= deltaY * 0.2;

      content.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      lastX = event.clientX;
      lastY = event.clientY;
    }
  });

  // Zoom interaction (scaling the Mobius strip)
  container.addEventListener('wheel', function(event) {
    const content = document.querySelector('.content');
    const scale = event.deltaY < 0 ? 1.05 : 0.95;
    const currentScale = content.style.transform.match(/scale\(([\d.]+)\)/);
    const newScale = currentScale ? parseFloat(currentScale[1]) * scale : scale;

    content.style.transform = `scale(${newScale}) rotateY(0deg) rotateX(0deg)`;
  });
});
