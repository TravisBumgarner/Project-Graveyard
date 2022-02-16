import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm'

import Worksheet from './worksheet'

@Entity()
export default class WorksheetEntry {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    text: string

    @Column({ nullable: false })
    worksheetId: string

    @ManyToOne(() => Worksheet, worksheet => worksheet.worksheetEntries)
    worksheet: Worksheet;
}