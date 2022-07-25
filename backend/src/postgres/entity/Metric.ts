import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Metric {
    @PrimaryColumn({ nullable: false })
        id: string

    @Column({ nullable: false })
        title: string
}
