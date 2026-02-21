const API_URL = "http://localhost:9093";

async function cargarUsuarios() {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();

    const ul = document.getElementById('users');
    
    ul.innerHTML = '';

    data.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.nombre} - ${user.email}`;
        ul.appendChild(li);
    });
}

async function crearUsuario() {
    console.log("Creando usuario...");

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    console.log(nombre, email);

    await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email })
    });

    //cargarUsuarios();
}


// Primera inicializacion
cargarUsuarios();