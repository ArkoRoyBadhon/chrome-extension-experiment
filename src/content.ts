function createSelectionOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "screenshot-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999999"; 
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);
  
    const selectionBox = document.createElement("div");
    selectionBox.id = "selection-box";
    selectionBox.style.position = "absolute";
    selectionBox.style.border = "2px dashed #fff";
    // selectionBox.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    selectionBox.style.zIndex = "1001"; 
    document.body.appendChild(selectionBox);
  
    let startX: number, startY: number, endX, endY;
    let isSelecting = false;
  
    overlay.addEventListener("mousedown", (e) => {
      startX = e.clientX;
      startY = e.clientY;
      isSelecting = true;
      selectionBox.style.left = `${startX}px`;
      selectionBox.style.top = `${startY}px`;
      selectionBox.style.width = "0px";
      selectionBox.style.height = "0px";


    });
  
    overlay.addEventListener("mousemove", (e) => {
      if (!isSelecting) return;
  
      endX = e.clientX;
      endY = e.clientY;
  
      const rect = {
        x: Math.min(startX, endX),
        y: Math.min(startY, endY),
        width: Math.abs(startX - endX),
        height: Math.abs(startY - endY),
      };
  
      selectionBox.style.left = `${rect.x}px`;
      selectionBox.style.top = `${rect.y}px`;
      selectionBox.style.width = `${rect.width}px`;
      selectionBox.style.height = `${rect.height}px`;


    });
  
    overlay.addEventListener("mouseup", () => {
      isSelecting = false;
  
      const rect = selectionBox.getBoundingClientRect();
      chrome.runtime.sendMessage(
        {
          action: "takeScreenshot",
          data: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
        },
        (screenshotUrl) => {
          const link = document.createElement("a");
          link.href = screenshotUrl;
          link.download = "comment-screenshot.png";
          link.click();
        }
      );
      
  
      document.body.removeChild(overlay);
      document.body.removeChild(selectionBox);
    });
  }
  
  createSelectionOverlay();
  