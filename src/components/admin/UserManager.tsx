
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, UserPlus } from 'lucide-react';

interface ProfileData {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
}

interface UserRoleData {
  user_id: string;
  role: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      console.log('Loading users...');
      
      // Load profiles first
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      console.log('Loaded profiles:', profiles);

      // Load user roles separately
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Roles error:', rolesError);
        throw rolesError;
      }

      console.log('Loaded roles:', userRoles);

      // Combine the data
      const userList: User[] = (profiles as ProfileData[])?.map(profile => {
        const roleData = (userRoles as UserRoleData[])?.find(
          role => role.user_id === profile.id
        );
        
        // Type guard to ensure role is valid
        const mapRole = (dbRole: string | undefined): User['role'] => {
          switch (dbRole) {
            case 'owner': return 'owner';
            case 'superadmin': return 'superadmin';
            case 'admin': return 'admin';
            case 'support': return 'support';
            case 'user': return 'user';
            default: return 'user';
          }
        };

        return {
          id: profile.id,
          email: profile.email || '',
          name: profile.full_name || 'مستخدم',
          role: mapRole(roleData?.role),
          isVerified: true,
          subscriptionLevel: null,
          subscriptionExpiry: null,
          createdAt: profile.created_at,
          permissions: []
        };
      }) || [];

      console.log('Final user list:', userList);
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المستخدمين",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setIsEditing(user.id);
    setEditingUser(user);
  };

  const handleSaveUser = async () => {
    if (!isEditing || !editingUser) return;
    
    try {
      console.log('Saving user:', editingUser);
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: editingUser.name,
          email: editingUser.email
        })
        .eq('id', isEditing);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      // Update role
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role: editingUser.role })
        .eq('user_id', isEditing);

      if (roleError) {
        console.error('Role update error:', roleError);
        throw roleError;
      }

      await loadUsers();
      setIsEditing(null);
      setEditingUser({});
      
      toast({
        title: "تم حفظ المستخدم بنجاح",
        description: "تم تحديث بيانات المستخدم"
      });
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ المستخدم",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (id === currentUser?.id) {
      toast({
        title: "خطأ",
        description: "لا يمكنك حذف حسابك الخاص",
        variant: "destructive"
      });
      return;
    }
    
    try {
      console.log('Deleting user:', id);
      
      // Delete user role first
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', id);

      // Delete profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadUsers();
      
      toast({
        title: "تم حذف المستخدم",
        description: "تم حذف المستخدم بنجاح"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المستخدم",
        variant: "destructive"
      });
    }
  };

  const handleAddAdmin = async () => {
    try {
      const newAdminId = crypto.randomUUID();
      
      console.log('Adding new admin:', newAdminId);
      
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: newAdminId,
          email: 'admin@example.com',
          full_name: 'مدير جديد'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      // Create role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: newAdminId,
          role: 'admin'
        });

      if (roleError) {
        console.error('Role creation error:', roleError);
        throw roleError;
      }

      await loadUsers();
      setIsEditing(newAdminId);
      setEditingUser({
        id: newAdminId,
        email: 'admin@example.com',
        name: 'مدير جديد',
        role: 'admin'
      });

      toast({
        title: "تم إضافة المدير",
        description: "تم إضافة مدير جديد بنجاح"
      });
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المدير",
        variant: "destructive"
      });
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner': return 'المالك';
      case 'superadmin': return 'مدير عام';
      case 'admin': return 'مدير';
      case 'support': return 'دعم فني';
      case 'user': return 'مستخدم';
      default: return role;
    }
  };

  const canEditUser = (userToEdit: User) => {
    if (currentUser?.role === 'owner') return true;
    if (currentUser?.role === 'superadmin' && userToEdit.role !== 'owner') return true;
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">جاري تحميل المستخدمين...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
        {currentUser?.role === 'owner' && (
          <Button onClick={handleAddAdmin} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            إضافة مدير جديد
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {users.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center text-gray-400">
              لا توجد مستخدمين
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div>
                    <span>{user.name}</span>
                    <span className="text-sm text-gray-400 ml-2">({getRoleText(user.role)})</span>
                  </div>
                  {canEditUser(user) && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.role !== 'owner' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing === user.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>الاسم</Label>
                        <Input 
                          value={editingUser.name || ''}
                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>البريد الإلكتروني</Label>
                        <Input 
                          type="email"
                          value={editingUser.email || ''}
                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>الدور</Label>
                        <Select 
                          value={editingUser.role || 'user'}
                          onValueChange={(value) => setEditingUser({...editingUser, role: value as User['role']})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">مستخدم</SelectItem>
                            <SelectItem value="support">دعم فني</SelectItem>
                            <SelectItem value="admin">مدير</SelectItem>
                            {currentUser?.role === 'owner' && <SelectItem value="superadmin">مدير عام</SelectItem>}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>مستوى الاشتراك</Label>
                        <Select 
                          value={editingUser.subscriptionLevel || 'null'}
                          onValueChange={(value) => setEditingUser({...editingUser, subscriptionLevel: value === 'null' ? null : value as User['subscriptionLevel']})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="null">بدون اشتراك</SelectItem>
                            <SelectItem value="basic">أساسي</SelectItem>
                            <SelectItem value="gold">ذهبي</SelectItem>
                            <SelectItem value="diamond">الماسي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>تاريخ انتهاء الاشتراك</Label>
                      <Input 
                        type="date"
                        value={editingUser.subscriptionExpiry?.split('T')[0] || ''}
                        onChange={(e) => setEditingUser({...editingUser, subscriptionExpiry: e.target.value ? new Date(e.target.value).toISOString() : null})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveUser}>حفظ</Button>
                      <Button variant="outline" onClick={() => setIsEditing(null)}>إلغاء</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>البريد الإلكتروني: {user.email}</p>
                    <p>ID: {user.id}</p>
                    <p>تاريخ الإنشاء: {new Date(user.createdAt).toLocaleDateString('ar')}</p>
                    <p>مفعل: {user.isVerified ? 'نعم' : 'لا'}</p>
                    <p>الاشتراك: {user.subscriptionLevel || 'بدون اشتراك'}</p>
                    {user.subscriptionExpiry && (
                      <p>ينتهي في: {new Date(user.subscriptionExpiry).toLocaleDateString('ar')}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManager;
