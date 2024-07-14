// import { BASE_API_URL } from '$env/dynamic/private'
export async function load({ url }) {
    try {
        let params = new URLSearchParams(url.search);
        let status = JSON.parse(params.get('status'));
        let response = JSON.parse(params.get('response'));
        let { user_ID, user_name, user_email, user_status } = response;
        return {

            status: status,
            user: { user_ID, user_name, user_email, user_status }
        };



    } catch (err) {
        return { status: err.message }
    }

    ;
}
