import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import axios from 'axios';

export async function load({params}) {
    try{
        
        let result = await axios.get('http://localhost:3000/api/vocab');

    
        // console.log(n);
        return {result:result.data}
    }catch(err){
        console.log(err.message);
    }
    
}