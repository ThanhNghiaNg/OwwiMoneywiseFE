import { TransactionEntity } from '../../types/entities/transaction.entity';

function TransactionItem(transaction: TransactionEntity) {
    return (
        <div>
            <p>{transaction.type}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
            <p>{transaction.date}</p>
            <p>{transaction.description}</p>
        </div>
    );
}

export default TransactionItem;