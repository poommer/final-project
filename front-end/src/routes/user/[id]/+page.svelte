<script>
    let items = ["A", "B", "C"]; // รายการขององค์ประกอบ
    let draggingIndex = null;    // เก็บ index ขององค์ประกอบที่กำลังลาก
  
    function handleDragStart(event, index) {
      draggingIndex = index;
  
      // สร้าง Ghost Element
      const ghost = document.createElement("div");
      ghost.style.width = "64px";
      ghost.style.height = "64px";
      ghost.style.backgroundColor = "#3b82f6"; // สีฟ้าเข้ม (ไม่โปร่งแสง)
      ghost.style.border = "3px solid #1e3a8a"; // เส้นขอบสีน้ำเงินเข้ม
      ghost.style.borderRadius = "8px"; // มุมโค้งมน
      ghost.style.display = "flex";
      ghost.style.alignItems = "center";
      ghost.style.justifyContent = "center";
      ghost.style.color = "#fff"; // สีข้อความเป็นสีขาว
      ghost.style.fontWeight = "bold";
      ghost.textContent = items[index]; // ใส่ข้อความของ item
      ghost.style.cursor = "grabbing"
  
      document.body.appendChild(ghost); // เพิ่ม ghost เข้าไปใน body
      event.dataTransfer.setDragImage(ghost, 32, 32); // กำหนด ghost เป็นตัวแทน
  
      // ลบ ghost ออกจาก DOM หลังการตั้งค่า
      setTimeout(() => document.body.removeChild(ghost), 0);
    }
  
    function handleDragOver(event, index) {
      event.preventDefault();
      if (index !== draggingIndex) {
        const updatedItems = [...items];
        const [removed] = updatedItems.splice(draggingIndex, 1);
        updatedItems.splice(index, 0, removed);
        draggingIndex = index;
        items = updatedItems;
      }
    }
  
    function handleDrop() {
      draggingIndex = null; // รีเซ็ตสถานะการลาก
    }
  </script>
  
  <div class="flex space-x-4">
    {#each items as item, index}
      <div
        class="w-16 h-16 flex items-center justify-center bg-gray-800 text-white rounded-lg cursor-pointer "
        draggable="true"
        on:dragstart={(e) => handleDragStart(e, index)}
        on:dragover={(e) => handleDragOver(e, index)}
        on:drop={handleDrop}
      >
        {item}
      </div>
    {/each}
  </div>
  