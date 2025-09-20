import { useForm } from 'react-hook-form'
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
import { useCreateCategory } from '@/hooks/useQueries'
import { categorySchema, type CategoryFormData } from '@/lib/validations'
import { Plus } from 'lucide-react'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const createCategoryMutation = useCreateCategory()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#3b82f6',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: CategoryFormData) => {
    createCategoryMutation.mutate(data, {
      onSuccess: () => {
        reset()
        onClose()
      },
      onError: error => {
        console.error('Error creating category:', error)
      },
    })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const defaultColors = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#84cc16',
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova categoria para suas despesas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Nome da Categoria</Label>
            <Input
              id="categoryName"
              {...register('name')}
              placeholder="Digite o nome da categoria"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="categoryColor">Cor</Label>
            <div className="flex gap-2 mt-2">
              {defaultColors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    watch('color') === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setValue('color', color)}
                />
              ))}
            </div>
            <Input
              id="categoryColor"
              type="color"
              {...register('color')}
              className="mt-2 w-20 h-10"
            />
            {errors.color && (
              <p className="text-sm text-destructive mt-1">{errors.color.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createCategoryMutation.isPending || !isValid}
              className="bg-black text-white font-semibold flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {createCategoryMutation.isPending ? 'Adicionando...' : 'Adicionar Categoria'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}