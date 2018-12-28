import { IAccount } from './account';

export interface IWallet {
    accountdetails: IAccount;
    isValid: boolean;
    name: string;
}
