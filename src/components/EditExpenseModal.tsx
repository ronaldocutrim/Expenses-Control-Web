import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AmountField } from '@/components/ui/amount-field'
import type { TransactionInput, Category } from '@/types/expense'

interface EditExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  editForm: TransactionInput
  setEditForm: (form: TransactionInput) => void
  categories: Category[]
  isLoading?: boolean
}

export function EditExpenseModal({
  isOpen,
  onClose,
  onConfirm,
  editForm,
  setEditForm,
  categories,
  isLoading = false,
}: EditExpenseModalProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja atualizar esta despesa com as novas informações?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="edit-description">Descrição</Label>
            <Input
              id="edit-description"
              value={editForm.description}
              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              placeholder="Digite a descrição"
            />
          </div>

          <div>
            <Label htmlFor="edit-price">Valor</Label>
            <AmountField
              id="edit-price"
              value={editForm.price}
              onChange={value => setEditForm({ ...editForm, price: value })}
              placeholder="0,00"
            />
          </div>

          <div>
            <Label htmlFor="edit-category">Categoria</Label>
            <Select
              value={editForm.category_id.toString()}
              onValueChange={value => setEditForm({ ...editForm, category_id: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              isLoading || !editForm.description || !editForm.price || !editForm.category_id
            }
          >
            {isLoading ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
