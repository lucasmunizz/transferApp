import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Holder } from "./Holder";
import { Account } from "./Account";

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string

  @Column()
  amount: string

  @ManyToOne(() => Account, account => account.sentTransactions)
  senderAccount: Account;

  @ManyToOne(() => Account, account => account.receivedTransactions)
  receiverAccount: Account;


}
