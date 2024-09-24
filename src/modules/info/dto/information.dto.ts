import { ApiProperty } from "@nestjs/swagger";

export class InformationDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    version: string;

    constructor(name: string, description: string, version: string) {
        this.name = name;
        this.description = description;
        this.version = version;
    }
}