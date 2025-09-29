'use client';

import { useState, useEffect } from 'react';
import { Team } from '@/types/database';
import { Building, Users, Package, MapPin, User } from 'lucide-react';

export default function TimesPage() {
  const [teams, setTeams] = useState<(Team & { user_name: string; members_count: number; items_count: number; locations_count: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error('Erro ao buscar times');
        }
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Building className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-lg text-gray-600">Carregando times...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg text-red-600">Erro ao carregar times: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Times e Equipes
            </h1>
            <p className="text-xl text-emerald-100 font-medium">
              Gerenciamento de equipes e organizações
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-10 pb-12">
        {/* Estatísticas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{teams.length}</h3>
              <p className="text-gray-600">Total de Times</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + (team.members_count || 0), 0)}
              </h3>
              <p className="text-gray-600">Membros Totais</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + (team.items_count || 0), 0)}
              </h3>
              <p className="text-gray-600">Itens Cadastrados</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + (team.locations_count || 0), 0)}
              </h3>
              <p className="text-gray-600">Localizações</p>
            </div>
          </div>
        </div>

        {/* Lista de Times */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lista de Times</h3>
                <p className="text-emerald-100 text-sm">Todas as equipes cadastradas no sistema</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {teams.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum time encontrado.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Os times aparecerão aqui quando houver cadastros.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {teams.map((team, index) => (
                  <div 
                    key={team.id} 
                    className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <Building className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-2xl">{team.name}</h4>
                          <p className="text-sm text-gray-500">ID: {team.id}</p>
                          {team.notes && (
                            <p className="text-sm text-gray-600 mt-1 italic">&ldquo;{team.notes}&rdquo;</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">
                          Criado em: {formatDate(team.created_at)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Atualizado: {formatDate(team.updated_at)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Proprietário
                        </h5>
                        <p className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                          {team.user_name}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-3">Estatísticas</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-50 px-3 py-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-blue-600">{team.members_count || 0}</div>
                            <div className="text-xs text-blue-500">Membros</div>
                          </div>
                          <div className="bg-purple-50 px-3 py-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-purple-600">{team.items_count || 0}</div>
                            <div className="text-xs text-purple-500">Itens</div>
                          </div>
                          <div className="bg-orange-50 px-3 py-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-orange-600">{team.locations_count || 0}</div>
                            <div className="text-xs text-orange-500">Locais</div>
                          </div>
                          <div className="bg-green-50 px-3 py-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">
                              {((team.members_count || 0) + (team.items_count || 0) + (team.locations_count || 0))}
                            </div>
                            <div className="text-xs text-green-500">Total</div>
                          </div>
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
    </div>
  );
}
