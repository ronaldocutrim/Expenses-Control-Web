import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { BarChart3, DollarSign } from 'lucide-react'
import { useCategories } from '@/hooks/useQueries'
import { useMemo } from 'react'

const CHART_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
  '#8dd1e1',
  '#d084d0',
  '#ffb347',
  '#87d68d',
  '#ffa07a',
  '#98d8c8',
]

export function Statistics() {
  const { data: categoriesData, isLoading, error } = useCategories()

  const chartData = useMemo(() => {
    if (!categoriesData?.categories) return []

    return categoriesData.categories
      .map((category, index) => {
        const totalValue = category.metadata?.total || '0'

        // Parse BRL format correctly preserving decimals
        let numericValue = totalValue.toString()
        // Remove currency symbols but keep numbers, dots and commas
        numericValue = numericValue.replace(/[^\d.,]/g, '')

        // Convert Brazilian format (1.234,56) to US format (1234.56)
        if (numericValue.includes(',')) {
          // Has decimal comma
          const parts = numericValue.split(',')
          if (parts.length === 2) {
            // Remove dots from the integer part and add decimal point
            const integerPart = parts[0].replace(/\./g, '')
            const decimalPart = parts[1]
            numericValue = `${integerPart}.${decimalPart}`
          }
        } else {
          // No decimal comma, just remove dots (thousand separators)
          numericValue = numericValue.replace(/\./g, '')
        }

        const parsedValue = parseFloat(numericValue)
        const safeValue = isNaN(parsedValue) ? 0 : parsedValue

        return {
          name: category.name,
          value: safeValue,
          count: category.metadata?.count || 0,
          color: CHART_COLORS[index % CHART_COLORS.length],
          categoryColor: category.color,
        }
      })
      .sort((a, b) => b.value - a.value)
  }, [categoriesData])

  const totalExpenses = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0)
  }, [chartData])

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="text-center text-muted-foreground py-8">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-6">
        <div className="text-center text-destructive py-8">
          Error loading statistics. Please try again.
        </div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="grid gap-6">
        <div className="text-center text-muted-foreground py-8">
          No expense data available. Add some transactions to see statistics.
        </div>
      </div>
    )
  }

  // Debug: Log data to console
  console.log('Chart Data:', chartData)

  return (
    <div className="grid gap-6">
      {/* Summary Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <DollarSign className="h-6 w-6" />
            Total Expenses: R$ {(totalExpenses || 0).toFixed(2)}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Expenses by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => {
                    return new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }}
                />
                <Tooltip
                  formatter={value => {
                    const percentage =
                      totalExpenses > 0 ? ((Number(value) / totalExpenses) * 100).toFixed(1) : '0.0'
                    const formattedValue = new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(value))
                    return [`${formattedValue} (${percentage}%)`, 'Valor']
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.categoryColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
