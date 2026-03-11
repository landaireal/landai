import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, 
  Search, Filter, BarChart3, Settings, LogOut, Eye, Save, X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { propertyStorage, userStorage, StoredProperty, StoredUser } from '../services/storage';
import PropertyFormModal from '../components/PropertyFormModal';
import UserFormModal from '../components/UserFormModal';

export default function AdminDashboard() {
  const { isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'properties' | 'users' | 'analytics' | 'settings'>('properties');

  // Redirect if not admin
  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const stats = [
    { icon: Home, label: 'Total Properties', value: '1,247', change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Active Users', value: '15,420', change: '+8%', color: 'from-purple-500 to-pink-500' },
    { icon: DollarSign, label: 'Total Revenue', value: '$2.8B', change: '+23%', color: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, label: 'Growth Rate', value: '23%', change: '+5%', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <>
      <SEO title="Admin Dashboard - Land AI" description="Admin dashboard for managing properties and users" />
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {language === 'ar' ? 'لوحة تحكم المسؤول' : 'Admin Dashboard'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {language === 'ar' ? `مرحبا، ${user?.name}` : `Welcome back, ${user?.name}`}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-800">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'properties', label: language === 'ar' ? 'العقارات' : 'Properties', icon: Home },
                  { id: 'users', label: language === 'ar' ? 'المستخدمين' : 'Users', icon: Users },
                  { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: BarChart3 },
                  { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'properties' && <PropertiesTab />}
              {activeTab === 'users' && <UsersTab />}
              {activeTab === 'analytics' && <AnalyticsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PropertiesTab() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<StoredProperty[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<StoredProperty | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    setProperties(propertyStorage.getAll());
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العقار?' : 'Are you sure you want to delete this property?')) {
      propertyStorage.delete(id);
      loadProperties();
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث عن العقارات...' : 'Search properties...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة عقار' : 'Add Property'}
        </button>
      </div>

      {/* Properties Table - Responsive */}
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'العقار' : 'Property'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'السعر' : 'Price'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'المشاهدات' : 'Views'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'لا توجد عقارات' : 'No properties found'}
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={property.image} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{property.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{property.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
                          ${property.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          property.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                        {property.views}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex gap-1 justify-end">
                          <button 
                            onClick={() => setEditingProperty(property)}
                            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg transition-colors"
                            title={language === 'ar' ? 'تعديل' : 'Edit'}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                            title={language === 'ar' ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProperty) && (
        <PropertyFormModal
          property={editingProperty}
          onClose={() => {
            setShowAddModal(false);
            setEditingProperty(null);
          }}
          onSave={() => {
            loadProperties();
            setShowAddModal(false);
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
}

function UsersTab() {
  const { language } = useLanguage();
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(userStorage.getAll());
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم?' : 'Are you sure you want to delete this user?')) {
      userStorage.delete(id);
      loadUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
        </h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة مستخدم' : 'Add User'}
        </button>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الدور' : 'Role'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'لا يوجد مستخدمين' : 'No users found'}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} className="w-10 h-10 rounded-full" />
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex gap-1 justify-end">
                          <button 
                            onClick={() => setEditingUser(user)}
                            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg transition-colors"
                            title={language === 'ar' ? 'تعديل' : 'Edit'}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                            title={language === 'ar' ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingUser) && (
        <UserFormModal
          user={editingUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingUser(null);
          }}
          onSave={() => {
            loadUsers();
            setShowAddModal(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

function AnalyticsTab() {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {language === 'ar' ? 'التحليلات والتقارير' : 'Analytics & Reports'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            {language === 'ar' ? 'المشاهدات الشهرية' : 'Monthly Views'}
          </h3>
          <div className="text-4xl font-bold text-blue-600 dark:text-cyan-400 mb-2">127,543</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? '+12% عن الشهر الماضي' : '+12% from last month'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
          </h3>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">8.4%</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? '+2.1% عن الشهر الماضي' : '+2.1% from last month'}
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {language === 'ar' ? 'الإعدادات' : 'Settings'}
      </h2>
      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            {language === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? 'إدارة الإعدادات العامة للموقع' : 'Manage general site settings'}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            {language === 'ar' ? 'إعدادات البريد الإلكتروني' : 'Email Settings'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? 'تكوين إعدادات البريد الإلكتروني والإشعارات' : 'Configure email and notification settings'}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? 'إدارة إعدادات الأمان والصلاحيات' : 'Manage security and permissions settings'}
          </p>
        </div>
      </div>
    </div>
  );
}
