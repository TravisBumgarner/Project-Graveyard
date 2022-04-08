import {
    Column, Entity, PrimaryColumn, ManyToOne,
} from 'typeorm'

import Review from './review'
import WorksheetEntry from './worksheetEntry'

@Entity()
export default class ReviewEntry {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    reviewId: string

    @Column({ nullable: false })
    worksheetEntryId: string

    @Column({ nullable: false })
    writtenFeedback: string

    @Column({ nullable: false })
    oralFeedback: string

    @ManyToOne(() => Review, (review) => review.reviewEntries, { onDelete: 'CASCADE' })
    review: Review

    @ManyToOne(() => WorksheetEntry, (worksheet) => worksheet.worksheetEntries, { onDelete: 'CASCADE' })
    worksheetEntry: WorksheetEntry
}
