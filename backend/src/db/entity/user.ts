import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm'
import Worksheet from './worksheet';

@Entity()
export default class User {
    @PrimaryColumn({ nullable: false })
    id: string

    @PrimaryColumn({ nullable: false })
    userName: string

    @Column({ nullable: false })
    firebaseId: string

    @OneToMany(() => Worksheet, Worksheet => Worksheet.user)
    Worksheets: Worksheet[];
}