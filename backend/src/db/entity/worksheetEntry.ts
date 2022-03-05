import {
    Column, Entity, PrimaryColumn, ManyToOne,
} from 'typeorm'
// import ReviewEntry from './reviewEntry'

import Worksheet from './worksheet'

@Entity()
export default class WorksheetEntry {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    knownLanguageText: string

    @Column({ nullable: false })
    newLanguageText: string

    @Column({ nullable: false })
    worksheetId: string

    @Column({ nullable: false })
    audioUrl: string

    @ManyToOne(() => Worksheet, (Worksheet) => Worksheet.worksheetEntries) // eslint-disable-line
    worksheet: Worksheet

    // @OneToMany(() => ReviewEntry, (ReviewEntry) => ReviewEntry.worksheetEntry) // eslint-disable-line
    // worksheetEntries: WorksheetEntry[]
}
