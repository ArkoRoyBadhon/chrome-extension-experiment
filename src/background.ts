/* eslint-disable @typescript-eslint/no-explicit-any */
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'collectWholeComment',
      title: 'Take Screenshot for specific area',
      contexts: ['all'],
    });
  
    chrome.contextMenus.create({
      id: 'copyCommentText',
      title: 'Copy comment text',
      contexts: ['selection'],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info:any, tab) => {
    if (!tab?.id) return;
  
    if (info.menuItemId === 'collectWholeComment') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } else if (info.menuItemId === 'copyCommentText') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyCommentText,
        args: [info.selectionText],
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === 'takeScreenshot') {
      chrome.tabs.captureVisibleTab(message.tabId, { format: 'png' }, (screenshotUrl) => {
        console.log("url ======", screenshotUrl);
        
        sendResponse(screenshotUrl);
      });
      return true;
    }
  });

  // chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  //   if (message.action === 'takeScreenshot') {
  //     chrome.tabs.captureVisibleTab(message.tabId, { format: 'png' }, (screenshotUrl) => {
  //       if (chrome.runtime.lastError) {
  //         console.error("Error capturing tab: ", chrome.runtime.lastError);
  //         sendResponse({ error: "Failed to capture tab" });
  //         return;
  //       }
  
  //       const img = new Image();
  //       img.src = screenshotUrl;
  
  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         const ctx:any = canvas.getContext('2d');
  
  //         // Use the selection area dimensions provided by the content script
  //         const { top, left, width, height } = message.data;
  
  //         // Set the canvas size to the dimensions of the selection
  //         canvas.width = width;
  //         canvas.height = height;
  
  //         // Draw the selected area of the screenshot onto the canvas
  //         ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
  
  //         // Convert the canvas content to a base64 URL
  //         const croppedImageUrl = canvas.toDataURL('image/png');
  
  //         // Send the cropped image URL as the response
  //         sendResponse(croppedImageUrl);
  //       };
  
  //       img.onerror = (err) => {
  //         console.error("Error loading image: ", err);
  //         sendResponse({ error: "Failed to load image" });
  //       };
  //     });
  
  //     return true; // keep the message channel open for sendResponse
  //   }
  // });


  function copyCommentText(selectedText: string) {
    navigator.clipboard.writeText(selectedText).then(() => {
      console.log('Comment text copied to clipboard:', selectedText);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
  