export class UsuarioModel{

    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    tel: number;
    pass: string;
    confirmPass: string;
    fn: Date;
    genero: string;
    diasLabor: string;
    encargado: boolean;

    constructor() {
    }
}
