// import axios from 'axios';
// import moment from 'moment-timezone';

// import { BASE_API_URL } from '$env/static/private'


// export const actions = {
//     register: async ({cookies, request, props }) => {
//         try {
//         const data = await request.formData()

//         const username = data.get('username')
//         const gender = data.get('gender')
//         const birthDay = data.get('birthDay')

//         return {
//             props: {
//               userlocal: {}  // ตั้งค่าเริ่มต้นเป็นวัตถุว่างหากไม่มีข้อมูลส่งมาจาก client-side
//             }
//           };
//  // ถ้ามี user ใน localStorage ให้ดึงข้อมูล user_ID มาใช้
// //  const user = JSON.parse(localStorage.getItem('user'));
// //  if (user && user.user_ID) {
// //    const response = await axios.put(`${BASE_API_URL}/auth/register`, {
// //      id: user.user_ID,
// //      name: username,
// //      birthday: birthDay,
// //      gender: gender
// //    })
// // }
    
//  } catch (err) {
//         console.log(err);
//     }
// }

// }

