// import { BASE_API_URL } from '$env/dynamic/private'
export async function load({ url }) {
    let params = new URLSearchParams(url.search);
    let status = JSON.parse(params.get('status'));

    if(status === 200){
        let response = JSON.parse(params.get('response'));
        let { user_ID, user_name, user_email, user_status } = response;

    console.log('Received user data:', { user_ID, user_name, user_email, user_status });

    return {

            status:status,
            user: { user_ID, user_name, user_email, user_status }
    };
    }

    else{
        return {

            status:status
        }
    }
    

    ;
}
