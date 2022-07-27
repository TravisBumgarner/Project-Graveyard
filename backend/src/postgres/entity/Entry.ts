import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import Metric from './Metric'

@Entity()
export default class Entry {
    @PrimaryColumn({ nullable: false })
        id: string

    @Column({ type: 'float', nullable: false })
        value: string

    @Column({ type: 'date', nullable: false })
        date: string

    @ManyToOne(() => Metric, (Metric) => Metric.entries, { onDelete: "CASCADE" }) // eslint-disable-line
        metric: Metric
}
