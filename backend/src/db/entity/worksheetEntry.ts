import {
 Column, Entity, PrimaryColumn, ManyToOne, OneToMany,
} from 'typeorm';
import ReviewEntry from './reviewEntry';

import Worksheet from './worksheet';

@Entity()
export default class WorksheetEntry {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: false })
  knownLanguageText: string;

  @Column({ nullable: false })
  newLanguageText: string;

  @Column({ nullable: false })
  worksheetId: string;

  @Column({ nullable: false })
  audioUrl: string;

  @ManyToOne(() => Worksheet, (worksheet) => worksheet.worksheetEntries)
  worksheet: Worksheet;

  @OneToMany(() => ReviewEntry, (ReviewEntry) => ReviewEntry.worksheetEntry)
  worksheetEntries: WorksheetEntry[];
}
