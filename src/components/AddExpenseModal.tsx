import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import type { TransactionInput } from '@/types/expense'
import { useCategories, useCreateTransaction } from '@/hooks/useQueries'
import { transactionFormSchema, type TransactionFormData } from '@/lib/validations'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const { data, isLoading: categoriesLoading } = useCategories()
  const createTransactionMutation = useCreateTransaction()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      price: '0',
      categoryId: '',
    },
  })

  const onSubmit = (data: TransactionFormData) => {
    const transaction: TransactionInput = {
      description: data.description,
      price: parseFloat(data.price),
      category_id: parseInt(data.categoryId),
    }

    createTransactionMutation.mutate(transaction, {
      onSuccess: () => {
        reset()
        onClose()
      },
      onError: error => {
        console.error('Error creating transaction:', error)
      },
    })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Despesa</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar uma nova despesa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              {...register('description')}
              placeholder="Digite a descrição da despesa"
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Valor</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <AmountField
                  id="price"
                  value={parseFloat(field.value) || 0}
                  onChange={value => field.onChange(value.toString())}
                  placeholder="0,00"
                />
              )}
            />
            {errors.price && (
              <p className="text-sm text-destructive mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.categories.map(category => (
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
              )}
            />
            {errors.categoryId && (
              <p className="text-sm text-destructive mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createTransactionMutation.isPending || categoriesLoading || !isValid}
              className="bg-black text-white font-semibold"
            >
              {createTransactionMutation.isPending ? 'Adicionando...' : 'Adicionar Despesa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
