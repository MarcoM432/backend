const fs  = require('fs');

class ManagerUsuarios {
    async CrearUsuario(usuario){
        const contenido = await fs.promises.readFile('./usuarios.json', 'utf-8');

        const usuarios = JSON.parse(contenido)

        usuarios.push(usuario);

        await fs.promises.writeFile('./usuarios.json', JSON.stringify(usuarios));
    }

    async ConsultarUsuarios(){
        const contenido = await fs.promises.readFile('./usuarios.json', 'utf-8');

        const usuarios = JSON.parse(contenido);

        return usuarios;
    }
}

module.exports = ManagerUsuarios;
