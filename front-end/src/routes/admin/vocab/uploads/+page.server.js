import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import axios from 'axios';

export async function load({params}) {
    try{
        
        let n = await axios.get('http://localhost:3000/api/word-list/read');
        let pos = await axios.get('http://localhost:3000/api/pos/read/');

    
        // console.log(n);
        return {wordlist:n.data, pos:pos.data}
    }catch(err){
        console.log(err.message);
    }
    
}


// export const actions = {
// 	upload: async ({cookies, request, params }) => {
// 		try {
//             // TODO log the user in
//         let data = await request.formData()
//         let file = data.get('fileUpload')

//         const fileType = file.name.split('.').pop();
//         const fileName = 'file_'+moment().format('DD-MM-YYYY_hh-mm-ss') + '.' + fileType;

//         const filePath = path.resolve('static/uploads', fileName);
//         const buffer = Buffer.from(await file.arrayBuffer());

//         fs.writeFileSync(filePath, buffer);

//         // fs.writeFileSync(filePath, buffer);

//         // return new Response('File uploaded successfully', { status: 200 });
        
//         // console.log({file, filePath, buffer});

        
//             // const filePath = path.resolve('static/uploads', 'test.txt');
//             // fs.writeFileSync(filePath, 'file');
//             console.log(filePath);
    
//             // return new Response('File written successfully', { status: 200 });
//         } catch (error) {
//             console.error('Error writing file:', error);
//             return new Response('Failed to write file', { status: 500 });
//         }
// 	}
// };
