// src/routes/receive-data.js
export async function load({ url }) {
    let params = new URLSearchParams(url.search);
    let response = JSON.parse(params.get('response'));

    let { user_ID, user_name, user_email } = response;

    console.log('Received user data:', { user_ID, user_name, user_email });

    return {
        props: {
            user: { user_ID, user_name, user_email }
        }
    };

    ;
}
