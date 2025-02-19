// import fs from "fs";
// import path from "path";
// import moment from "moment-timezone";
import axios from "axios";

export async function load({ params }) {
  try {
    let { data } = await axios.get(
      `https://api-ecproject.poommer.in.th/api/lessons/topic`
    );

    if (!data || !data.response) {
        throw new Error('Data not found or response is undefined');
      }

       // เรียงลำดับข้อมูลตาม lesson_level (แปลงเป็นตัวเลขก่อนเปรียบเทียบ)
    let sortedData = data.response.sort((a, b) => parseInt(a.lesson_level) - parseInt(b.lesson_level));

      return { lessonData: sortedData };
  } catch (err) {
    console.log('Error:', err.message);
    return { lessonData: [] }; // ส่งข้อมูลว่างในกรณีเกิดข้อผิดพลาด
  }
  }