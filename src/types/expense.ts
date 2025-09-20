export interface Category {
  id: number
  name: string
  color: string
  transactions: Transaction[]
  metadata: {
    total: string
    count: number
  }
}

export interface CategoryResponse {
  categories: Category[]
  metadata: {
    total: string
    count: number
  }
}

export interface CategoryInput {
  name: string
  color: string
}

export interface Transaction {
  id: number
  description: string
  price: string
  category: Category
}

export interface TransactionInput {
  description: string
  price: number
  category_id: number
}

export interface TransactionsResponse {
  transactions: Transaction[]
  metadata: {
    total: string
    count: number
  }
}
