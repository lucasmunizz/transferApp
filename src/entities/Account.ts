import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany} from "typeorm";
import { Holder } from "./Holder";
import { Transaction } from "./Transaction";

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberAccount: string;

  @ManyToOne(() => Holder, holder => holder.accounts)
  holder: Holder

  @Column({default: 0})
  balance: number

  @OneToMany(() => Transaction, transaction => transaction.senderAccount)
  sentTransactions: Transaction[]

  @OneToMany(() => Transaction, transaction => transaction.receiverAccount)
  receivedTransactions: Transaction[]
 
}
