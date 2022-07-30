import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import Metric from './Metric'

@Entity()
export default class Entry {
    @PrimaryColumn({ nullable: false })
        id: string

    @Column({ type: 'float', nullable: true })
        value: number

    @Column({ type: 'date', nullable: false })
        date: Date

    @ManyToOne(() => Metric, (Metric) => Metric.entries, { onDelete: "CASCADE" }) // eslint-disable-line
        metric: Metric
}
