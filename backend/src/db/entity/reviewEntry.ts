import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'

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

    @ManyToOne(() => Review, review => review.reviewEntries)
    review: Review;

    @ManyToOne(() => WorksheetEntry, worksheet => worksheet.worksheetEntries)
    worksheetEntry: WorksheetEntry;
}