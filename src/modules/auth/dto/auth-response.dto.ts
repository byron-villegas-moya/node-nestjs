import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombres: string;
    @ApiProperty()
    apellidos: string;
    @ApiProperty()
    accessToken: string;

    constructor(id: number, nombres: string, apellidos: string, accessToken: string) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.accessToken = accessToken;
    }
}