import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdvanceCraft {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    craft_name!: string;

    @Column()
    material_req!: string;

    @Column()
    material_amount!: number;

    @Column()
    status_req!: string

}