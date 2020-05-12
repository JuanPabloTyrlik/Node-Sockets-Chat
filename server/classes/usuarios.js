class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersona(id, nombre) {
        this.personas.push({ id, nombre });
        return this.personas;
    }
    getPersona(id) {
        let persona = this.personas.find(elem => elem.id === id);
        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(elem => elem.id !== id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
};