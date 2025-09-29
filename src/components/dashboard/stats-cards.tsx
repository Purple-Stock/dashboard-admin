'use client';

import { Package, MapPin, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalItems: number;
    totalLocations: number;
    totalTransactions: number;
    lowStockItems: number;
    totalValue: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: "Total de Itens",
      value: stats.totalItems,
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-900"
    },
    {
      title: "Localizações",
      value: stats.totalLocations,
      icon: MapPin,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-900"
    },
    {
      title: "Transações",
      value: stats.totalTransactions,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-900"
    },
    {
      title: "Estoque Baixo",
      value: stats.lowStockItems,
      icon: AlertTriangle,
      gradient: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      textColor: "text-red-900"
    },
    {
      title: "Valor Total",
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      gradient: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      textColor: "text-amber-900"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className={`${card.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-lift border border-white/20 backdrop-blur-sm`}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                <IconComponent className={`h-6 w-6 text-white`} />
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${card.textColor} opacity-80`}>
                  {card.title}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
              <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min(100, (index + 1) * 20)}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
