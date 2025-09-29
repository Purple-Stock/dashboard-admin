'use client';

import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { Item } from '@/types/database';

interface ItemsTableProps {
  items: Item[];
}

export function ItemsTable({ items }: ItemsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) {
      return { label: 'Baixo', color: 'bg-red-100 text-red-800' };
    } else if (current <= minimum * 1.5) {
      return { label: 'Atenção', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { label: 'Normal', color: 'bg-green-100 text-green-800' };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Itens do Estoque</h3>
            <p className="text-emerald-100 text-sm">Inventário completo</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                Nenhum item encontrado.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Os itens do estoque aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => {
                const stockStatus = getStockStatus(item.current_stock, item.minimum_stock);
                return (
                  <div 
                    key={item.id} 
                    className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            stockStatus.label === 'Baixo' ? 'bg-red-500 animate-pulse' :
                            stockStatus.label === 'Atenção' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                            {item.sku}
                          </Badge>
                          <Badge className={stockStatus.color}>
                            {stockStatus.label}
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
                        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                          Estoque: {item.current_stock}
                        </div>
                        <div className="text-sm text-gray-600">
                          Mínimo: {item.minimum_stock}
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          Custo: {formatCurrency(item.cost)}
                        </div>
                        <div className="text-sm font-bold text-emerald-600">
                          Preço: {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
