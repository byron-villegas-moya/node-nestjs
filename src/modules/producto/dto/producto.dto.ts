import { ApiProperty } from "@nestjs/swagger";
import { CaracteristicaDTO } from "./caracteristica.dto";

export class ProductoDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    sku: number;
    @ApiProperty()
    imagen: string;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty({ type: CaracteristicaDTO, isArray: true})
    caracteristicas: CaracteristicaDTO[];
    @ApiProperty()
    marca: string;
    @ApiProperty()
    precio: number;

    constructor(id: number, sku: number, imagen: string, nombre: string, descripcion: string, caracteristicas: CaracteristicaDTO[], marca: string, precio: number) {
        this.id = id;
        this.sku = sku;
        this.imagen = imagen;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.caracteristicas = caracteristicas;
        this.marca = marca;
        this.precio = precio;
    }
}