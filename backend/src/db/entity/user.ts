import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import Worksheet from './worksheet'

@Entity()
export default class User {
    @PrimaryColumn({ nullable: false })
    id: string

    @PrimaryColumn({ nullable: false })
    username: string

    @Column({ nullable: false })
    firebaseId: string

    @OneToMany(() => Worksheet, (Worksheet) => Worksheet.user) // eslint-disable-line
    Worksheets: Worksheet[]

    @ManyToMany(() => User, (user) => user.following, { onDelete: 'CASCADE' })
    @JoinTable()
    followers: User[] // eslint-disable-line no-use-before-define

    @ManyToMany(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    following: User[] // eslint-disable-line no-use-before-define
}
