class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersona(id, nombre, sala) {
        this.personas.push({ id, nombre, sala });
        return this.getPersonasPorSala(sala);
    }
    getPersona(id) {
        let persona = this.personas.find(elem => elem.id === id);
        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    getPersonasPorSala(sala) {
        return this.personas.filter(elem => elem.sala === sala);
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