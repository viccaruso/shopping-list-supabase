import { checkAuth, logout, getItems, createItem, buyItem, deleteAllItems } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const itemForm = document.querySelector('#item-form');
const addItemButton = document.querySelector('#add-button');
const deleteAllButton = document.querySelector('#delete-button');
const qtyInputEl = document.querySelector('#qty');
const itemInputEl = document.querySelector('#item-name');
const listContainerEl = document.querySelector('#list-container');

window.addEventListener('load', async() => {
    displayShoppingListItems();
});

addItemButton.addEventListener('click', async(e) => {
    e.preventDefault();

    const data = new FormData(itemForm);
    const qty = data.get('qty');
    const item = data.get('item-name');

    await createItem(qty, item);

    displayShoppingListItems();
});

deleteAllButton.addEventListener('click', async() => {
    await deleteAllItems();
    displayShoppingListItems();
});

async function displayShoppingListItems() {
    const list = await getItems();

    while (listContainerEl.firstChild) {
        listContainerEl.firstChild.remove();
    }
    for (let item of list) {
        const itemEl = renderItem(item);
        itemEl.addEventListener('click', async() => {
            await buyItem(item.id);
            displayShoppingListItems();
        });
        listContainerEl.append(itemEl);
    }
}

function renderItem(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = `${item.qty} ${item.item}`;
    div.append(p);

    if (item.purchased) {
        div.classList.add('purchased');
    } else {
        div.classList.remove('purchased');
        div.classList.add('not-purchased');
    }

    return div;
}

logoutButton.addEventListener('click', async() => {
    await logout();
});