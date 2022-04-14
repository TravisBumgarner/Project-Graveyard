import {
    Column, Entity, PrimaryColumn, OneToMany, ManyToOne,
} from 'typeorm'
import { TReviewStatus } from '../../types'

import ReviewEntry from './reviewEntry'
import User from './user'
import Worksheet from './worksheet'

@Entity()
export default class Review {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    reviewerId: string

    @Column({ nullable: false })
    worksheetId: string

    @Column({ type: 'date', nullable: false })
    date: string

    @Column({
        type: 'enum',
        enum: TReviewStatus,
        default: TReviewStatus.REVIEW_REQUESTED,
    })
    status: TReviewStatus

    @OneToMany(() => ReviewEntry, (ReviewEntry) => ReviewEntry.review, { onDelete: "CASCADE" }) // eslint-disable-line
    reviewEntries: ReviewEntry[]

    @ManyToOne(() => Worksheet, (Worksheet) => Worksheet.reviews, { onDelete: "CASCADE" }) // eslint-disable-line
    worksheet: Worksheet

    @ManyToOne(() => User, (user) => user.Worksheets)
    reviewer: User
}
