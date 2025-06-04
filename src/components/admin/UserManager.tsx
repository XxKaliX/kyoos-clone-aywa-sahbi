
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, UserPlus } from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEditUser = (user: User) => {
    setIsEditing(user.id);
    setEditingUser(user);
  };

  const handleSaveUser = () => {
    if (!isEditing || !editingUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === isEditing ? { ...user, ...editingUser } : user
    );
    saveUsers(updatedUsers);
    setIsEditing(null);
    setEditingUser({});
    toast({
      title: "تم حفظ المستخدم بنجاح",
      description: "تم تحديث بيانات المستخدم"
    });
  };

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsers(updatedUsers);
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح"
    });
  };

  const handleAddAdmin = () => {
    const newAdmin: User = {
      id: Date.now().toString(),
      email: 'admin@example.com',
      name: 'مدير جديد',
      role: 'admin',
      isVerified: true,
      subscriptionLevel: null,
      createdAt: new Date().toISOString(),
      permissions: []
    };
    saveUsers([...users, newAdmin]);
    setIsEditing(newAdmin.id);
    setEditingUser(newAdmin);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
        <Button onClick={handleAddAdmin} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          إضافة مدير جديد
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  <span>{user.name}</span>
                  <span className="text-sm text-gray-400 ml-2">({user.role})</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
                        onValueChange={(value) => setEditingUser({...editingUser, role: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">مستخدم</SelectItem>
                          <SelectItem value="admin">مدير</SelectItem>
                          <SelectItem value="superadmin">مدير عام</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>مستوى الاشتراك</Label>
                      <Select 
                        value={editingUser.subscriptionLevel || 'null'}
                        onValueChange={(value) => setEditingUser({...editingUser, subscriptionLevel: value === 'null' ? null : value as any})}
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
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
