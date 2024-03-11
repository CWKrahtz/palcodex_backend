import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Materials{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    material_icon!: string;

    @Column()
    material_name!: string;

    @Column()
    material_amount!: number;

}