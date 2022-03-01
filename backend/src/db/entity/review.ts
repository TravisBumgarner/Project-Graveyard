import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm'

import ReviewEntry from './reviewEntry'
import User from './user'

@Entity()
export default class Review {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    userId: string

    @Column({ type: 'date', nullable: false })
    date: string

    @OneToMany(() => ReviewEntry, ReviewEntry => ReviewEntry.review)
    reviewEntries: ReviewEntry[];

    @ManyToOne(() => User, user => user.Worksheets)
    user: User;

}