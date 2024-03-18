import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CraftInv {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    profile_id!: number;

    @Column()
    craft_name!: string;

    @Column()
    craft_amount!: number;
}