<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
    let chartCanvas;
  
    export let result;
    let userID
    onMount(()=>{
      userID =  JSON.parse(localStorage.getItem('user')).user_ID
      console.log('chartUser', userID);
    })

    async function fetchData() {
    // ตัวอย่างการดึงข้อมูลจาก API (แทนที่ด้วย API ของคุณ)
    const response = await fetch(`https://api-ecproject.poommer.in.th/api/user/${userID}/statistic`);
    const data = await response.json();
    console.log('data',data.result);
    // อัปเดตค่าข้อมูลที่ใช้ในกราฟ
    result = await {
      listening: data.result[0].listening === null ? 0 : parseFloat(data.result[0].listening),
      speaking:  data.result[0].speaking === null ? 0 :parseFloat(data.result[0].speaking),
      reading:  data.result[0].reading === null ? 0 :parseFloat(data.result[0].reading),
      writing:  data.result[0].writing === null ? 0 :parseFloat(data.result[0].writing),
      vocab:  data.result[0].vocab === null ? 0 :parseFloat(data.result[0].vocab),
      grammar:  data.result[0].grammar === null ? 0 :parseFloat(data.result[0].grammar)
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
              backgroundColor: 'rgb(52 57 70 / 20%)',
              borderColor: '#282C36',
              pointBackgroundColor: '#282C36',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#282C36'
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
                  color: 'rgb(52 57 70 / 20%)', // สีเส้นตาราง
                },
                angleLines: {
                  color: 'rgb(52 57 70 / 20%)' // เส้นที่มาจากจุดศูนย์กลาง
                },
                pointLabels: {
                  color: '#282C36', // สีข้อความที่เป็น label (Listening, Speaking, ...)
                  font: {
        size: 16, // ขนาดตัวอักษรของ label (สามารถปรับขนาดตามต้องการ)
        weight: 'bold', // ความหนาของตัวอักษร (สามารถปรับได้)
      },
                },
                ticks: {
                  backdropColor: 'rgba(0, 0, 0, 0)', // ทำให้พื้นหลังตัวเลขโปร่งใส
                  color: '#282C36' // สีตัวเลข
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
      fetchData(); // สร้างกราฟเมื่อ mount เสร็จ
    });
  </script>
  
  <!-- Canvas สำหรับ Radar Chart -->
   <div class="w-full p-2 flex justify-center items-center ">
       <canvas bind:this={chartCanvas} id="myRadarChart" width="400" height="400"></canvas>
   </div>
  
  <style>
    canvas {
      max-width: 100%;
    }
  </style>
  