import type { Category, CategoryInput, CategoryResponse, TransactionInput } from '@/types/expense'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const categoryApi = {
  async getAll(): Promise<CategoryResponse> {
    const response = await fetch(`${API_BASE_URL}/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  },

  async getById(id: number): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`)
    if (!response.ok) throw new Error('Failed to fetch category')
    return response.json()
  },

  async create(category: CategoryInput): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) throw new Error('Failed to create category')
  },

  async update(id: number, category: CategoryInput): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) throw new Error('Failed to update category')
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete category')
  },
}

export const transactionApi = {
  async create(transaction: TransactionInput): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    if (!response.ok) throw new Error('Failed to create transaction')
  },

  async update(id: number, transaction: TransactionInput): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    if (!response.ok) throw new Error('Failed to update transaction')
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete transaction')
  },
}
