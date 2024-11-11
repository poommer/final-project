<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
    let chartCanvas;
  
    export let result;

    async function fetchData() {
    // ตัวอย่างการดึงข้อมูลจาก API (แทนที่ด้วย API ของคุณ)
    const response = await fetch(`http://localhost:3000/user/111520423022737516816/statistic`);
    const data = await response.json();

    // อัปเดตค่าข้อมูลที่ใช้ในกราฟ
    result = {
      listening: parseFloat(data.result[0].listening),
      speaking: parseFloat(data.result[0].speaking),
      reading: parseFloat(data.result[0].reading),
      writing: parseFloat(data.result[0].writing),
      vocab: parseFloat(data.result[0].vocab),
      grammar: parseFloat(data.result[0].grammar)
    };

    // อัปเดตกราฟหลังจากดึงข้อมูลแล้ว
    updateChart();
  }
  
    // ฟังก์ชันสร้างกราฟ
    function updateChart() {
      if (chart) {
        chart.destroy(); // ทำลายกราฟเก่าถ้ามีอยู่แล้ว
      }
  
      const ctx = chartCanvas?.getContext('2d'); // ตรวจสอบว่า chartCanvas พร้อมหรือไม่
  
      if (ctx) { // ตรวจสอบว่า context พร้อมใช้งาน
        chart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Listening', 'Speaking', 'Reading', 'Writing', 'Vocabulary', 'Grammar'],
            datasets: [{
              label: 'Skill Performance',
              data: [result.listening, result.speaking, result.reading, result.writing, result.vocab, result.grammar],
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              pointBackgroundColor: 'rgb(75, 192, 192)',
            //   pointBorderColor: '#fff',
            //   pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
              r: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.2)', // สีเส้นตาราง
                },
                angleLines: {
                  color: 'rgba(255, 255, 255, 0.3)' // เส้นที่มาจากจุดศูนย์กลาง
                },
                pointLabels: {
                  color: 'white', // สีข้อความที่เป็น label (Listening, Speaking, ...)
                },
                ticks: {
                  backdropColor: 'rgba(0, 0, 0, 0)', // ทำให้พื้นหลังตัวเลขโปร่งใส
                  color: 'white' // สีตัวเลข
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        });
      } else {
        console.error("ไม่สามารถดึง context ของ canvas ได้");
      }
    }
  
    onMount(() => {
      updateChart(); // สร้างกราฟเมื่อ mount เสร็จ
    });
  </script>
  
  <!-- Canvas สำหรับ Radar Chart -->
   <div class="w-[30rem] p-2 flex justify-center items-center">
       <canvas bind:this={chartCanvas} id="myRadarChart" width="400" height="400"></canvas>
   </div>
  
  <style>
    canvas {
      max-width: 100%;
    }
  </style>
  