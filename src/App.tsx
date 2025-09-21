import { ExpensesByCategory } from '@/components/ExpensesByCategory'
import { CategoryManager } from '@/components/CategoryManager'
import { Statistics } from '@/components/Statistics'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, Settings, BarChart3 } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Wallet className="h-6 w-6" />
              Expense Control
            </CardTitle>
          </CardHeader>
        </Card>

        <Tabs defaultValue="expenses" className="w-full">
          <div className="mb-6">
            <TabsList className="gap-2">
              <TabsTrigger value="expenses" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Expenses
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="expenses">
            <ExpensesByCategory />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="stats">
            <Statistics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
