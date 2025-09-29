'use client';

import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Item } from '@/types/database';

interface LowStockTableProps {
  items: Item[];
}

export function LowStockTable({ items }: LowStockTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Itens com Estoque Baixo</h3>
            <p className="text-red-100 text-sm">Atenção necessária</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                Nenhum item com estoque baixo encontrado.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Todos os itens estão com estoque adequado!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {item.sku}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 font-medium">
                          {item.brand} • {item.item_type}
                        </p>
                        <p className="text-sm text-gray-500">
                          📍 {item.location_name || 'Localização não definida'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                        Estoque: {item.current_stock}
                      </div>
                      <div className="text-sm text-gray-600">
                        Mínimo: {item.minimum_stock}
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(item.cost)}
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
