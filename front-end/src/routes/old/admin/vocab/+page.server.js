import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import axios from 'axios';

export async function load({url}) {
    try{
        const page = parseInt(url.searchParams.get('page')) || 1;
        let result = await axios.get(`https://api-ecproject.poommer.in.th/api/content/vocab?page=${page}`);

    
        console.log(page);
        let resultNew = {
            ...result.data,
            currangePage:page
        }
        return {result:resultNew}
    }catch(err){
        console.log(err.message);
    }
    
}