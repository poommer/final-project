import axios from 'axios';
export async function load({ params, url }) {
    const id = params.id;

    const content = await axios.get(`https://api-ecproject.poommer.in.th/api/quiz/${id}`);

    
    return {content:content.data};
};