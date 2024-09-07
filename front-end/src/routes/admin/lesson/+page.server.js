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

    let countLesson;

    let lessonData = [];

    let newData = data.response;

    let cur_unit = 0;

    let cur_index = -1;

    let exp = newData.forEach((item) => {
      let u = item.unit_No;
      if (cur_unit !== parseInt(item.unit_No)) {
        cur_unit += 1;
        cur_index += 1;
        lessonData[cur_index] = {}; 
        lessonData[cur_index].heading = {};
        lessonData[cur_index].lesson = [];
      } 
      if(item.lesson_level === '0'){
          lessonData[cur_index].heading = {
            name:item.lesson_title,
            description:item.lesson_description
          };
      }else{
        lessonData[cur_index].lesson.push(item)
      }
    });
    console.log(lessonData);
    return {lessonData}
  } catch (err) {
    console.log('Error:', err.message);
    return { lessonData: [] }; // ส่งข้อมูลว่างในกรณีเกิดข้อผิดพลาด
  }
  }