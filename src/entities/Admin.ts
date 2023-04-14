import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
 
}
