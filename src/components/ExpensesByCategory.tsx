import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDeleteTransaction, useUpdateTransaction, useCategories } from '@/hooks/useQueries'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { EditExpenseModal } from '@/components/EditExpenseModal'
import { AddExpenseModal } from '@/components/AddExpenseModal'
import { Trash2, Edit2, Plus } from 'lucide-react'
import type { Transaction, TransactionInput, Category } from '@/types/expense'

export function ExpensesByCategory() {
  const { data, isLoading } = useCategories()
  const deleteTransactionMutation = useDeleteTransaction()
  const updateTransactionMutation = useUpdateTransaction()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<TransactionInput>({
    description: '',
    price: 0,
    category_id: 0,
  })

  const handleDeleteClick = (id: number) => {
    setTransactionToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      deleteTransactionMutation.mutate(transactionToDelete, {
        onError: error => {
          console.error('Error deleting transaction:', error)
        },
        onSettled: () => {
          setTransactionToDelete(null)
          setDeleteModalOpen(false)
        },
      })
    }
  }

  const handleCloseModal = () => {
    setDeleteModalOpen(false)
    setTransactionToDelete(null)
  }

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setEditForm({
      description: transaction.description,
      price: parsePrice(transaction.price),
      category_id: transaction.category.id,
    })
    setUpdateModalOpen(true)
  }

  const handleConfirmUpdate = () => {
    if (editingTransaction) {
      updateTransactionMutation.mutate(
        { id: editingTransaction.id, transaction: editForm },
        {
          onError: error => {
            console.error('Error updating transaction:', error)
          },
          onSettled: () => {
            setEditingTransaction(null)
            setUpdateModalOpen(false)
          },
        }
      )
    }
  }

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false)
    setEditingTransaction(null)
  }

  const parsePrice = (priceString: string | number): number => {
    if (typeof priceString === 'number') return priceString
    return parseFloat(priceString.replace(/R\$\s?/, '').replace(',', '.')) || 0
  }

  const getAllTransactionsCard = () => {
    if (!data?.categories) return null

    const allTransactions = data.categories.flatMap(category => category.transactions)

    const allTransactionsCategory: Category = {
      id: 0,
      name: '',
      color: '',
      transactions: allTransactions,
      metadata: data.metadata,
    }

    return renderExpenseList(allTransactionsCategory)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading expenses...</div>
        </CardContent>
      </Card>
    )
  }

  const renderExpenseList = (category: Category, categoryName?: string) => {
    const transactions = category.transactions || []
    const metadata = category.metadata || { total: 'R$ 0,00', count: 0 }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{categoryName ? `${categoryName} Expenses` : 'All Expenses'}</span>
            <Badge variant="secondary" className="text-lg">
              Total: {metadata.total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metadata.count === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {categoryName
                ? `No expenses in ${categoryName} category yet.`
                : 'No expenses recorded yet.'}
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: transaction.category.color }}
                    />
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.category.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{transaction.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(transaction)}
                      className="cursor-pointer text-blue-600 border-blue-600 bg-blue-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(transaction.id)}
                      className="cursor-pointer text-red-600 border-red-600 bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-between gap-4 mb-6">
          <div className="flex gap-1 min-w-fit">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:border-gray-400 data-[state=active]:border-dashed data-[state=active]:border-2"
            >
              Todas
            </TabsTrigger>
            {data?.categories.map(category => (
              <TabsTrigger key={category.id} value={category.id.toString()}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name} ({category.metadata.count})
                </div>
              </TabsTrigger>
            ))}
          </div>
          <Button
            onClick={() => setAddModalOpen(true)}
            className="bg-black text-white font-semibold flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar Despesa
          </Button>
        </TabsList>

        <TabsContent value="all">{getAllTransactionsCard()}</TabsContent>

        {data?.categories.map(category => (
          <TabsContent key={category.id} value={category.id.toString()}>
            {renderExpenseList(category, category.name)}
          </TabsContent>
        ))}
      </Tabs>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Deletar Despesa"
        description="Tem certeza que deseja deletar esta despesa? Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={deleteTransactionMutation.isPending}
      />
      {data?.categories && (
        <EditExpenseModal
          isOpen={updateModalOpen}
          onClose={handleCloseUpdateModal}
          onConfirm={handleConfirmUpdate}
          editForm={editForm}
          setEditForm={setEditForm}
          categories={data?.categories}
          isLoading={updateTransactionMutation.isPending}
        />
      )}

      <AddExpenseModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </>
  )
}
