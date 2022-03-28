const BASE = "/api";
export async function fetchAPI(endpoint: string, options = {}){
    const response = await fetch(BASE + endpoint, options);
    return response;
}