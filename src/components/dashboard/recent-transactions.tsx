'use client';

import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';
import { StockTransaction } from '@/types/database';

interface RecentTransactionsProps {
  transactions: (StockTransaction & { item_name: string; sku: string })[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'stock_in':
        return 'bg-green-100 text-green-800';
      case 'stock_out':
        return 'bg-red-100 text-red-800';
      case 'adjust':
        return 'bg-blue-100 text-blue-800';
      case 'move':
        return 'bg-yellow-100 text-yellow-800';
      case 'count':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'stock_in':
        return 'Entrada';
      case 'stock_out':
        return 'Saída';
      case 'adjust':
        return 'Ajuste';
      case 'move':
        return 'Movimentação';
      case 'count':
        return 'Contagem';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <History className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Transações Recentes</h3>
            <p className="text-purple-100 text-sm">Últimas movimentações</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                Nenhuma transação encontrada.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                As transações aparecerão aqui quando houver movimentações.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h4 className="font-semibold text-gray-900 text-lg">{transaction.item_name}</h4>
                        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                          {transaction.sku}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          {transaction.notes || 'Sem observações'}
                        </p>
                        <p className="text-sm text-gray-500">
                          🕒 {formatDate(transaction.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getTransactionTypeColor(transaction.transaction_type)}>
                        {getTransactionTypeLabel(transaction.transaction_type)}
                      </Badge>
                      <div className="text-sm font-bold text-gray-900">
                        Qtd: {transaction.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
