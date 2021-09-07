import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Transaction } from '../lib/blockchain-node';

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
  disabled: boolean;
}

const defaultFormValue = {
  recipient: '',
  sender: '',
  amount: 0
};

const TransactionForm: React.FC<TransactionFormProps> = ({onAddTransaction, disabled}) => {
  const [formValue, setFormValue] = useState<Transaction>(defaultFormValue);
  const isValid = formValue.sender && formValue.recipient && formValue.amount > 0;

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>): void => {
    setFormValue({
      ...formValue,
      [target.name]: target.value
    });
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTransaction(formValue);
    setFormValue(defaultFormValue);
  }

  return (
    <>
      <h2>New Transaction</h2>
      <form className="add-transaction-form" onSubmit={handleFormSubmit}>
        <input type="text" name="sender" placeholder="Sender" autoComplete="off"
        disabled={disabled} value={formValue.sender} onChange={handleInputChange}/>
        <span className="hidden-xs">{`->`}</span>
        <input type="text" name="recipient" placeholder="Recipient" autoComplete="off"
        disabled={disabled} value={formValue.recipient} onChange={handleInputChange}/>
        <input type="number" name="amount" placeholder="Amount"
        disabled={disabled} value={formValue.amount} onChange={handleInputChange}/>
        <button type="submit" disabled={!isValid || disabled} className="ripple">
          ADD TRANSACTION
        </button>
      </form>
    </>
  );
}

export default TransactionForm;