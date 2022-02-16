import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm'

import WorksheetEntry from './worksheetEntry'

@Entity()
export default class Worksheet {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false })
    knownLanguage: string

    @Column({ nullable: false })
    newLanguage: string

    @Column({ type: 'date', nullable: false })
    date: string



    @OneToMany(() => WorksheetEntry, WorksheetEntry => WorksheetEntry.worksheet)
    worksheetEntries: WorksheetEntry[];

}