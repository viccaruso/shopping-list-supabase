const SUPABASE_URL = 'https://iddyxpegdpnmmnebvghi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwOTAyMSwiZXhwIjoxOTU1MDg1MDIxfQ.v4B-VNkc9Xc9bIM4ig0BrZcgdU2bqx3VGiJiMMYNcis';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getItems() {
    const response = await client
        .from('shopping_list')
        .select()
        .order('purchased');
    
    return checkError(response);
}


export async function createItem(qty, item) {
    const response = await client
        .from('shopping_list')
        .insert([
            {
                qty: qty,
                item: item,
                purchased: false
            }
        ]);
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('shopping_list')
        .update({ purchased: true })
        .match({ id: id });
    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('shopping_list')
        .delete();
    return checkError(response);
}


// ################################################################################################################################
// ###
// #
export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
// #
// ###
// ################################################################################################################################