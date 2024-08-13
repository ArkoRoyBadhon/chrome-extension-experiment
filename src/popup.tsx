// import ReactDOM from 'react-dom';

// const Popup = () => {
//   const handleTakeScreenshot = () => {
//     // Send a message to the background script to open the screenshot modal
//     chrome.runtime.sendMessage({ action: 'openScreenshotModal' });
//   };

//   const handleCopyText = () => {
//     // Send a message to the background script to copy comment text
//     chrome.runtime.sendMessage({ action: 'copyCommentText' });
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>YouTube Review Collector</h1>
//       <button style={styles.button} onClick={handleTakeScreenshot}>Take Screenshot</button>
//       <button style={styles.button} onClick={handleCopyText}>Copy Comment Text</button>
//     </div>
//   );
// };

// // Define styles with the correct type
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '10px',
//     width: '300px',
//     height: '200px',
//   },
//   header: {
//     fontSize: '18px',
//     marginBottom: '10px',
//   },
//   button: {
//     margin: '5px',
//     padding: '10px',
//     fontSize: '14px',
//     cursor: 'pointer',
//   },
// };

// ReactDOM.render(<Popup />, document.getElementById('root'));
