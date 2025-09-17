import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Plus } from 'lucide-react';
import FinancialCard from './FinancialCard';
import ExpenseCard from './ExpenseCard';
import TransactionsTable from './TransactionsTable';
import { 
  getFinancialOverview, 
  getMonthlyData, 
  getCurrentMonthExpenses, 
  getRecentTransactions 
} from '../data/mockData';

const FinanceDashboard = () => {
  const [financialData, setFinancialData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenses, setExpenses] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls to various components
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls to different components
        const [financial, monthly, currentExpenses, recentTransactions] = await Promise.all([
          Promise.resolve(getFinancialOverview()),
          Promise.resolve(getMonthlyData()),
          Promise.resolve(getCurrentMonthExpenses()),
          Promise.resolve(getRecentTransactions())
        ]);

        setFinancialData(financial);
        setMonthlyData(monthly);
        setExpenses(currentExpenses);
        setTransactions(recentTransactions);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading finance dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                💰 Finance & Accounting Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor revenue, expenses, and financial reports in real-time
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FinancialCard
            title="Total Revenue"
            amount={financialData?.totalRevenue || 0}
            change={8.2}
            changeType="positive"
            icon={<DollarSign size={24} />}
            color="yellow"
          />
          <FinancialCard
            title="Total Expenses"
            amount={financialData?.totalExpenses || 0}
            change={-3.1}
            changeType="negative"
            icon={<TrendingDown size={24} />}
            color="blue"
          />
          <FinancialCard
            title="Net Profit"
            amount={financialData?.profit || 0}
            change={12.5}
            changeType="positive"
            icon={<TrendingUp size={24} />}
            color="green"
          />
        </div>

        {/* Bottom Section - Expenses and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Expenses */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expenses Breakdown</h3>
            <div className="space-y-4">
              <ExpenseCard
                title="Milk Purchase"
                amount={expenses?.milkPurchase || 0}
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2C8.897 2 8 2.897 8 4v1H6a2 2 0 00-2 2v9a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4c0-1.103-.897-2-2-2zM10 4h2v1h-2V4zm4 12H6V7h8v9z"/>
                </svg>}
                description="Raw milk procurement from local farms"
              />
              <ExpenseCard
                title="Employee Salaries"
                amount={expenses?.salaries || 0}
                icon={<Users size={20} />}
                description="Employee wages including overtime"
              />
              <ExpenseCard
                title="Additional Expenses"
                amount={expenses?.additionalExpenses || 0}
                icon={<Plus size={20} />}
                description="Utilities, maintenance, and other costs"
              />
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <TransactionsTable transactions={transactions} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {monthlyData.filter(m => m.revenue > 0).length}
            </div>
            <div className="text-gray-600 text-sm font-medium">Active Months</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {transactions.length}
            </div>
            <div className="text-gray-600 text-sm font-medium">Recent Transactions</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {((financialData?.profit / financialData?.totalRevenue) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-600 text-sm font-medium">Profit Margin</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Real-time
            </div>
            <div className="text-gray-600 text-sm font-medium">Data Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;