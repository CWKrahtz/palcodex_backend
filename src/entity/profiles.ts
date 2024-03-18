import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profiles{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    status!: string

}