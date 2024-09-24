import { ApiProperty } from "@nestjs/swagger";

export class CaracteristicaDTO {
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    valor: string;

    constructor(titulo: string, valor: string) {
        this.titulo = titulo;
        this.valor = valor;
    }
}