import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm'

import WorksheetEntry from './worksheetEntry'
import User from './user'

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

    @Column({ nullable: false })
    userId: string

    @Column({ type: 'date', nullable: false })
    date: string

    @OneToMany(() => WorksheetEntry, WorksheetEntry => WorksheetEntry.worksheet)
    worksheetEntries: WorksheetEntry[];

    @ManyToOne(() => User, user => user.Worksheets)
    user: User;

}