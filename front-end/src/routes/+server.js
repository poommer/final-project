
export async function GET({ request }) {
    const profileData = await request.json();
  
    console.log('Received user data:', profileData);
  
    return {
      status: 200,
      body: { message: 'Data received successfully' }
    };
  }