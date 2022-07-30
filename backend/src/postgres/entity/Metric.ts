import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import Entry from './Entry'

@Entity()
export default class Metric {
    @PrimaryColumn({ nullable: false })
        id: string

    @Column({ nullable: false })
        title: string

    @OneToMany(() => Entry, (Entry) => Entry.metric, { onDelete: 'CASCADE' }) // eslint-disable-line
        entries: Entry[]
}
