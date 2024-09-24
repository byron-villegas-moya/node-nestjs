import { Caracteristica } from "./caracteristica"

export interface Producto {
    id: number,
    sku: number,
    imagen: string,
    nombre: string,
    descripcion: string,
    caracteristicas: Caracteristica[],
    marca: string,
    precio: number
}