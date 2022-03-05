import {
 Column, Entity, PrimaryColumn, OneToMany, ManyToOne,
} from 'typeorm';

import ReviewEntry from './reviewEntry';
import User from './user';
import Worksheet from './worksheet';

@Entity()
export default class Review {
    @PrimaryColumn({ nullable: false })
      id: string;

    @Column({ nullable: false })
      userId: string;

    @Column({ nullable: false })
      worksheetId: string;

    @Column({ type: 'date', nullable: false })
      date: string;

    @OneToMany(() => ReviewEntry, (ReviewEntry) => ReviewEntry.review)
      reviewEntries: ReviewEntry[];

    @ManyToOne(() => Worksheet, (Worksheet) => Worksheet.reviews)
      worksheet: Worksheet;

    @ManyToOne(() => User, (user) => user.Worksheets)
      user: User;
}
