import { Column, Entity, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'

import Worksheet from './worksheet'
import User from './user'

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

    @ManyToOne(() => Worksheet, worksheet => worksheet.worksheetEntries)
    worksheet: Worksheet;
}