import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

//use the table called "users"
@Entity("users")
export class User{ //user is reserved for postgress
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string = "placeholder";

    @Column()
    email: string = "email@email.com";

    @Column()
    password!: string;

    @Column()
    status!: string;

    @Column()
    isAdmin: boolean = false

    //Before runs this code when evre calling getRepository.save()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    //npm i bcrypt
    //npm i --save-dev @tpypes/bcrypt

}