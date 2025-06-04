
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageManager from '@/components/admin/PackageManager';
import UserManager from '@/components/admin/UserManager';
import SupportChat from '@/components/admin/SupportChat';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin_dashboard')}</h1>
          <div className="text-sm text-gray-400">
            مرحباً، {user.name} ({user.role})
          </div>
        </div>

        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="packages">{t('packages')}</TabsTrigger>
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="support">{t('support_chat')}</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <PackageManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          <TabsContent value="support">
            <SupportChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
