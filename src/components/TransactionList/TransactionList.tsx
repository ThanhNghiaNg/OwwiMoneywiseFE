import React from 'react'
import { TransactionEntity } from '../../types/entities/transaction.entity'

type Props = {data: TransactionEntity[]}

export default function TransactionList({data}: Props) {
  return (
    <div>TransactionList</div>
  )
}