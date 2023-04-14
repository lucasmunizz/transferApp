import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, BeforeInsert, OneToMany } from "typeorm";
import { Account } from "./Account";

@Entity('holders')
export class Holder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: String;

  @OneToMany(() => Account, account => account.holder)
  accounts: Account[];

 }
