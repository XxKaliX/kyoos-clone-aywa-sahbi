
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageManager from '@/components/admin/PackageManager';
import UserManager from '@/components/admin/UserManager';
import SupportChat from '@/components/admin/SupportChat';
import ProductManager from '@/components/admin/ProductManager';
import SupportConversations from '@/components/admin/SupportConversations';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user || !['admin', 'superadmin', 'owner', 'support'].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  const canAccessUsers = user.role === 'owner' || user.role === 'superadmin';
  const canAccessPackages = user.role === 'owner' || user.role === 'superadmin' || user.role === 'admin';
  const canAccessProducts = user.role === 'owner' || user.role === 'superadmin' || user.role === 'admin';
  const canAccessSupport = true; // All admin roles can access support

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin_dashboard')}</h1>
          <div className="text-sm text-gray-400">
            {t('welcome')}, {user.name} ({user.role})
          </div>
        </div>

        <Tabs defaultValue="support" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800">
            <TabsTrigger value="support">{t('support_chat')}</TabsTrigger>
            <TabsTrigger value="conversations">{t('conversations')}</TabsTrigger>
            {canAccessPackages && <TabsTrigger value="packages">{t('packages')}</TabsTrigger>}
            {canAccessProducts && <TabsTrigger value="products">{t('products')}</TabsTrigger>}
            {canAccessUsers && <TabsTrigger value="users">{t('users')}</TabsTrigger>}
          </TabsList>

          <TabsContent value="support">
            <SupportChat />
          </TabsContent>

          <TabsContent value="conversations">
            <SupportConversations />
          </TabsContent>

          {canAccessPackages && (
            <TabsContent value="packages">
              <PackageManager />
            </TabsContent>
          )}

          {canAccessProducts && (
            <TabsContent value="products">
              <ProductManager />
            </TabsContent>
          )}

          {canAccessUsers && (
            <TabsContent value="users">
              <UserManager />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
