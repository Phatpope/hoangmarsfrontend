


const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL1 = "http://127.0.0.1:1337"

export const fetchDataFromApi = async (endpoint) => {
    const options = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + STRAPI_API_TOKEN,
        },
    };


    const res = await fetch(`${API_URL1}${endpoint}`, options);
    const data = await res.json();

    return data;
};

export const makePaymentRequest = async (endpoint, payload) => {
    const res = await fetch(`${API_URL1}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + STRAPI_API_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
};