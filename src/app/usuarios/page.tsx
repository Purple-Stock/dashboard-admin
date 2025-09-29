'use client';

import { useState, useEffect } from 'react';
import { User, Team, UserTeam, TeamMember } from '@/types/database';
import { Users, Mail, Calendar, Building, UserCheck, Users2, Package, MapPin, Crown, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        setTeamsLoading(true);
        setTeamsError(null);
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error('Erro ao buscar times');
        }
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setTeamsError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchUsers();
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

  const getRoleName = (role: number) => {
    switch (role) {
      case 0: return 'Membro';
      case 1: return 'Admin';
      case 2: return 'Proprietário';
      default: return 'Membro';
    }
  };

  const getRoleColor = (role: number) => {
    switch (role) {
      case 0: return 'bg-gray-100 text-gray-800 border-gray-200';
      case 1: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 2: return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: number) => {
    switch (role) {
      case 0: return <Users2 className="h-3 w-3" />;
      case 1: return <Shield className="h-3 w-3" />;
      case 2: return <Crown className="h-3 w-3" />;
      default: return <Users2 className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Users className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-lg text-gray-600">Carregando usuários...</p>
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
            <Users className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg text-red-600">Erro ao carregar usuários: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Usuários e Times
            </h1>
            <p className="text-xl text-blue-100 font-medium">
              Gerenciamento de usuários, times e permissões
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
              <p className="text-gray-600">Total de Usuários</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{teams.length}</h3>
              <p className="text-gray-600">Total de Times</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + (team.members_count || 0), 0)}
              </h3>
              <p className="text-gray-600">Membros Ativos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + (team.items_count || 0), 0)}
              </h3>
              <p className="text-gray-600">Itens nos Times</p>
            </div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lista de Usuários</h3>
                <p className="text-blue-100 text-sm">Todos os usuários cadastrados no sistema</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum usuário encontrado.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Os usuários aparecerão aqui quando houver cadastros.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-xl">{user.email}</h4>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Criado em: {formatDate(user.created_at)}</span>
                          </div>
                        </div>
                        
                        {/* Times do usuário */}
                        {user.teams && user.teams.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-4 w-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Times:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {user.teams.map((team) => (
                                <Badge 
                                  key={team.id} 
                                  className={`${getRoleColor(team.role)} flex items-center gap-1`}
                                >
                                  {getRoleIcon(team.role)}
                                  {team.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {user.teams_count || 0} Equipes
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {user.memberships_count || 0} Membros
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          Atualizado: {formatDate(user.updated_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lista de Times */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lista de Times</h3>
                <p className="text-green-100 text-sm">Todos os times cadastrados no sistema</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {teamsLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-gray-400 animate-spin" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Carregando times...
                </p>
              </div>
            ) : teamsError ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-red-600 text-lg font-medium">
                  Erro ao carregar times: {teamsError}
                </p>
              </div>
            ) : teams.length === 0 ? (
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
              <div className="space-y-4">
                {teams.map((team, index) => (
                  <div 
                    key={team.id} 
                    className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {team.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-xl">{team.name}</h4>
                            <p className="text-sm text-gray-500">ID: {team.id}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Criado por: {team.user_name || 'Usuário não encontrado'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Criado em: {formatDate(team.created_at)}</span>
                          </div>
                          {team.notes && (
                            <div className="col-span-2 flex items-start gap-2 text-sm text-gray-600">
                              <span className="font-medium">Notas:</span>
                              <span>{team.notes}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Membros do time */}
                        {team.members && team.members.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Users2 className="h-4 w-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Membros:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {team.members.map((member) => (
                                <Badge 
                                  key={member.id} 
                                  className={`${getRoleColor(member.role)} flex items-center gap-1`}
                                >
                                  {getRoleIcon(member.role)}
                                  {member.user_email}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex gap-2 flex-wrap justify-end">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <Users2 className="h-3 w-3 mr-1" />
                            {team.members_count || 0} Membros
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Package className="h-3 w-3 mr-1" />
                            {team.items_count || 0} Itens
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            <MapPin className="h-3 w-3 mr-1" />
                            {team.locations_count || 0} Locais
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          Atualizado: {formatDate(team.updated_at)}
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
