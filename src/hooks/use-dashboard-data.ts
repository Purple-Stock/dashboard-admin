'use client';

import { useState, useEffect } from 'react';
import { DashboardStats, Item, StockTransaction } from '@/types/database';

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [transactions, setTransactions] = useState<(StockTransaction & { item_name: string; sku: string })[]>([]);
  const [lowStockItems, setLowStockItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, itemsRes, transactionsRes, lowStockRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/items?limit=20'),
          fetch('/api/transactions?limit=10'),
          fetch('/api/low-stock')
        ]);

        if (!statsRes.ok || !itemsRes.ok || !transactionsRes.ok || !lowStockRes.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const [statsData, itemsData, transactionsData, lowStockData] = await Promise.all([
          statsRes.json(),
          itemsRes.json(),
          transactionsRes.json(),
          lowStockRes.json()
        ]);

        setStats(statsData);
        setItems(itemsData);
        setTransactions(transactionsData);
        setLowStockItems(lowStockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    items,
    transactions,
    lowStockItems,
    loading,
    error
  };
}
