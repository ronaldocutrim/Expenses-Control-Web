import { z } from 'zod'

export const transactionFormSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be less than 100 characters'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine(val => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    }, 'Price must be a positive number'),
  categoryId: z.string().min(1, 'Category is required'),
})

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(50, 'Category name must be less than 50 characters'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
})

export type TransactionFormData = z.infer<typeof transactionFormSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
