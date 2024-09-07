import axios from 'axios';
export async function load({ params }) {
    const id = params.id;

    const content = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/detail/${id}`);
    console.log(content.data);
    
    
    const lesson = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/topic/${id.split('-')[0]}?lev=${id.split('-')[1]}`)
    console.log(lesson.data);
    
    
    return {content:content.data, lesson:lesson.data};
};