import { AppDataSource } from '../data-source'
import { Holder } from '../entities/Holder'

export const holderRepository = AppDataSource.getRepository(Holder);
