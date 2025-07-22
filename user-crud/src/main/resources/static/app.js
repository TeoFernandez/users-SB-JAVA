const API_URL = 'http://localhost:8080/api/users';
const userForm = document.getElementById('userForm');
const usersTableBody = document.getElementById('usersTableBody');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userIdInput = document.getElementById('userId');

// Cargar usuarios al iniciar
window.onload = loadUsers;

// Manejar el envío del formulario
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = userIdInput.value;
    const userData = {
        name: nameInput.value,
        email: emailInput.value
    };

    try {
        if (userId) {
            // Actualizar usuario
            await updateUser(userId, userData);
            submitButton.textContent = 'Crear Usuario';
            cancelButton.style.display = 'none';
            userIdInput.value = '';
        } else {
            // Crear usuario
            await createUser(userData);
        }
        userForm.reset();
        loadUsers();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Manejar el botón de cancelar
cancelButton.addEventListener('click', () => {
    userForm.reset();
    submitButton.textContent = 'Crear Usuario';
    cancelButton.style.display = 'none';
    userIdInput.value = '';
});

// Crear usuario
async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error('No se pudo crear el usuario');
    }
}

// Actualizar usuario
async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error('No se pudo actualizar el usuario');
    }
}

// Eliminar usuario
async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
    }
    loadUsers();
}

// Cargar usuarios
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('No se pudo cargar la lista de usuarios');
        }
        const users = await response.json();
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
                    <button class="delete" onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Preparar formulario para editar usuario
function editUser(id, name, email) {
    userIdInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
    submitButton.textContent = 'Actualizar Usuario';
    cancelButton.style.display = 'inline';
}