'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { LowStockTable } from '@/components/dashboard/low-stock-table';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { ItemsTable } from '@/components/dashboard/items-table';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { Package } from 'lucide-react';

export default function Home() {
  const { stats, items, transactions, lowStockItems, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <p className="text-lg text-red-600">Erro ao carregar dados: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Dashboard de Estoque
            </h1>
            <p className="text-xl text-blue-100 font-medium">
              Visão geral do seu sistema de gerenciamento de estoque
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-10 pb-12">
        {stats && <div className="animate-fade-in-up"><StatsCards stats={stats} /></div>}

        <div className="grid gap-8 mt-12 lg:grid-cols-2">
          <div className="animate-slide-in-right">
            <LowStockTable items={lowStockItems} />
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
            <RecentTransactions transactions={transactions} />
          </div>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <ItemsTable items={items} />
        </div>
      </div>
    </div>
  );
}