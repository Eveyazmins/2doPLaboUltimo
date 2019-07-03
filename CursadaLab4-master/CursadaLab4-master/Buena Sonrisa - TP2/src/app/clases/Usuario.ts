export enum Perfil {
    Cliente = 'Cliente',
    Recepcionista = 'Recepcionista',
    Especialista = 'Especialista',
    Administrador = 'Administrador',
    Profesor = 'Profesor',
    Alumno = 'Alumno',
}

export interface UsuarioInterface {
    Uid:string;
    Nombre:string;
    Email:string;
    Password:string;
    ImagenUrl?:string;
    Perfil?:string;
    Activo?:boolean;
}

export class Usuario {

    public Email:string;
    public Nombre:string;
    public Password:string;
    public Perfil:string;
    
}