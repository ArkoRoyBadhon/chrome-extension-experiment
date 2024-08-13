// import React, { useEffect } from 'react';
// import html2canvas from 'html2canvas';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.min.css';

// const ScreenshotCapture: React.FC = () => {
//   useEffect(() => {
//     // Function to handle cropping functionality
//     const handleCropping = (imageUrl: string) => {
//       const modal = document.createElement('div');
//       modal.id = 'screenshot-modal';
//       modal.style.position = 'fixed';
//       modal.style.top = '50%';
//       modal.style.left = '50%';
//       modal.style.transform = 'translate(-50%, -50%)';
//       modal.style.backgroundColor = '#fff';
//       modal.style.padding = '20px';
//       modal.style.border = '1px solid #ccc';
//       modal.style.zIndex = '9999';

//       const img = document.createElement('img');
//       img.src = imageUrl;
//       img.style.maxWidth = '100%';
//       img.style.maxHeight = '80vh';

//       modal.appendChild(img);

//       // Initialize CropperJS on the image
//       const cropper = new Cropper(img, {
//         aspectRatio: NaN,
//         viewMode: 1,
//         responsive: true,
//       });

//       // Add a save button
//       const saveButton = document.createElement('button');
//       saveButton.textContent = 'Save';
//       saveButton.onclick = () => {
//         cropper.getCroppedCanvas().toBlob((blob) => {
//           if (blob) {
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = 'screenshot.png';
//             link.click();
//           }
//         });
//       };
//       modal.appendChild(saveButton);

//       // Add a close button
//       const closeButton = document.createElement('button');
//       closeButton.textContent = 'Close';
//       closeButton.onclick = () => {
//         document.body.removeChild(modal);
//       };
//       modal.appendChild(closeButton);

//       document.body.appendChild(modal);
//     };

//     // Function to initialize selection and capture
//     const initializeCropper = () => {
//       const selectionDiv = document.createElement('div');
//       selectionDiv.id = 'cropper-selection';
//       selectionDiv.style.position = 'absolute';
//       selectionDiv.style.border = '2px dashed red';
//       selectionDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
//       document.body.appendChild(selectionDiv);

//       let startX: number;
//       let startY: number;

//       const onMouseMove = (event: MouseEvent) => {
//         const x = Math.min(event.pageX, startX);
//         const y = Math.min(event.pageY, startY);
//         const width = Math.abs(event.pageX - startX);
//         const height = Math.abs(event.pageY - startY);

//         selectionDiv.style.left = `${x}px`;
//         selectionDiv.style.top = `${y}px`;
//         selectionDiv.style.width = `${width}px`;
//         selectionDiv.style.height = `${height}px`;
//       };

//       const onMouseUp = () => {
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);

//         const { top, left, width, height } = selectionDiv.getBoundingClientRect();
//         html2canvas(document.body, {
//           x: left,
//           y: top,
//           width: width,
//           height: height,
//         }).then(canvas => {
//           const screenshotUrl = canvas.toDataURL();
//           document.body.removeChild(selectionDiv);
//           handleCropping(screenshotUrl);
//         }).catch(error => {
//           console.error('Error capturing screenshot:', error);
//           document.body.removeChild(selectionDiv);
//         });
//       };

//       document.addEventListener('mousedown', (event: MouseEvent) => {
//         startX = event.pageX;
//         startY = event.pageY;

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//       });
//     };

//     initializeCropper();
//   }, []);

//   return <div />;
// };

// export default ScreenshotCapture;
