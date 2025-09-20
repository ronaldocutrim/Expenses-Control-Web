import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { AddCategoryModal } from '@/components/AddCategoryModal'
import { EditCategoryModal } from '@/components/EditCategoryModal'
import type { Category } from '@/types/expense'
import { useCategories, useDeleteCategory } from '@/hooks/useQueries'
import { Plus, Trash2, Edit2 } from 'lucide-react'

export function CategoryManager() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  const { data, isLoading } = useCategories()
  const deleteCategoryMutation = useDeleteCategory()

  const startEdit = (category: Category) => {
    setEditingCategory(category)
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditingCategory(null)
    setEditModalOpen(false)
  }

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategoryMutation.mutate(categoryToDelete, {
        onError: error => {
          console.error('Error deleting category:', error)
        },
        onSettled: () => {
          setCategoryToDelete(null)
          setDeleteModalOpen(false)
        },
      })
    }
  }

  const handleCloseModal = () => {
    setDeleteModalOpen(false)
    setCategoryToDelete(null)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gerenciar Categorias</CardTitle>
          <Button
            onClick={() => setAddModalOpen(true)}
            className="bg-black text-white font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories List */}
        <div className="space-y-2">
          <h3 className="font-semibold">Categorias Existentes</h3>
          {isLoading ? (
            <div className="text-center text-muted-foreground py-4">Carregando categorias...</div>
          ) : data?.metadata.count === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              Nenhuma categoria ainda. Crie sua primeira categoria acima.
            </div>
          ) : (
            <div className="grid gap-2">
              {data?.categories.map(category => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(category)}
                      className="text-blue-600 border-blue-600 bg-blue-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(category.id)}
                      className="text-red-600 border-red-600 bg-red-50 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Deletar Categoria"
        description="Tem certeza que deseja deletar esta categoria? Esta ação não pode ser desfeita e todas as despesas associadas a esta categoria serão afetadas."
        confirmText="Deletar"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={deleteCategoryMutation.isPending}
      />
      <AddCategoryModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />

      <EditCategoryModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        category={editingCategory}
      />
    </Card>
  )
}
