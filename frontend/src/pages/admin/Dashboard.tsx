import React, { useEffect, useState } from 'react';
import { Users, Calendar, UserCheck, FileText, TrendingUp, Award } from 'lucide-react';
import axios from 'axios';

interface Stats {
  teams: number;
  events: number;
  staff: number;
  applications: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    teams: 0,
    events: 0,
    staff: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [teamsRes, eventsRes, staffRes, applicationsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/teams', { headers }),
        axios.get('http://localhost:5000/api/events', { headers }),
        axios.get('http://localhost:5000/api/staff', { headers }),
        axios.get('http://localhost:5000/api/applications', { headers })
      ]);

      setStats({
        teams: teamsRes.data.length,
        events: eventsRes.data.length,
        staff: staffRes.data.length,
        applications: applicationsRes.data.length
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Teams',
      value: stats.teams,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      title: 'Events',
      value: stats.events,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      title: 'Staff Members',
      value: stats.staff,
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      title: 'Applications',
      value: stats.applications,
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
        <h1 className="text-3xl font-bold text-accent-500 mb-2">Admin Dashboard</h1>
        <p className="text-accent-400">Welcome to the JSK Esports management panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-dark-900 rounded-lg p-6 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-400 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-accent-500 mt-2">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
          <h3 className="text-xl font-bold text-accent-500 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-primary-500 mr-2" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-accent-400 hover:text-primary-400 transition-all duration-300">
              Create New Team
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-accent-400 hover:text-primary-400 transition-all duration-300">
              Add Event
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-accent-400 hover:text-primary-400 transition-all duration-300">
              Manage Staff
            </button>
          </div>
        </div>

        <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
          <h3 className="text-xl font-bold text-accent-500 mb-4 flex items-center">
            <Award className="h-5 w-5 text-primary-500 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-dark-800 border border-primary-500/10">
              <p className="text-accent-400 text-sm">System initialized successfully</p>
              <p className="text-accent-500 text-xs mt-1">Just now</p>
            </div>
            <div className="p-3 rounded-lg bg-dark-800 border border-primary-500/10">
              <p className="text-accent-400 text-sm">Database connected</p>
              <p className="text-accent-500 text-xs mt-1">2 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;