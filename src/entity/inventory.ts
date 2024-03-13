import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    profile_id!: number;

    @Column()
    material_icon!: string;

    @Column()
    material_name!: string;

    @Column()
    material_amount!: number;

}