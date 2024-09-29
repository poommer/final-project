import axios from 'axios';
export async function load({ params, url }) {
    const id = params.id;
    const status = url.searchParams.get('status'); // ดึงค่า 'status' จาก URL

    const content = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/detail/${id}`);
    const lesson = await axios.get(`https://api-ecproject.poommer.in.th/api/lessons/topic/${id.split('-')[0]}?lev=${id.split('-')[1]}`)

    
    console.log(content);
    
    return {content:content.data, lesson:lesson.data, status};
};