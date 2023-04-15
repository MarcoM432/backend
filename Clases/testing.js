const ManagerUsuarios = require('./managerdeUsuario');

const manager = new ManagerUsuarios();

async function crearYConsultarUsuarios(){
    const nuevoUsuario = {
        Nombre: 'Juan',
        Apellido: 'Perez',
        Edad: 26,
        Curso: Backend
    };

    await manager.CrearUsuario(nuevoUsuario);

    const usuarios = await manager.ConsultarUsuarios();
    console.log(usuarios)
}

crearYConsultarUsuarios()