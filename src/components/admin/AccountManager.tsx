
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  description: string;
  price: number;
  video_url: string;
  is_active: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

const AccountManager = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingAccount, setEditingAccount] = useState<Partial<Account>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل الحسابات: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSaveAccount = async () => {
    if (!editingAccount.name || !editingAccount.price) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('accounts')
          .update({
            name: editingAccount.name,
            description: editingAccount.description,
            price: editingAccount.price,
            video_url: editingAccount.video_url,
            is_active: editingAccount.is_active,
            category: editingAccount.category,
            updated_at: new Date().toISOString()
          })
          .eq('id', isEditing);

        if (error) throw error;

        toast({
          title: "تم بنجاح",
          description: "تم تحديث الحساب بنجاح"
        });
      } else {
        const { error } = await supabase
          .from('accounts')
          .insert({
            name: editingAccount.name,
            description: editingAccount.description,
            price: editingAccount.price,
            video_url: editingAccount.video_url,
            is_active: editingAccount.is_active ?? true,
            category: editingAccount.category
          });

        if (error) throw error;

        toast({
          title: "تم بنجاح",
          description: "تم إضافة الحساب بنجاح"
        });
      }

      setIsEditing(null);
      setIsAdding(false);
      setEditingAccount({});
      fetchAccounts();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ الحساب: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الحساب؟')) return;

    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف الحساب بنجاح"
      });
      fetchAccounts();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "فشل في حذف الحساب: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: `تم ${!currentStatus ? 'تفعيل' : 'إلغاء تفعيل'} الحساب`
      });
      fetchAccounts();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "فشل في تغيير حالة الحساب: " + error.message,
        variant: "destructive"
      });
    }
  };

  const startEditing = (account: Account) => {
    setIsEditing(account.id);
    setEditingAccount(account);
    setIsAdding(false);
  };

  const startAdding = () => {
    setIsAdding(true);
    setIsEditing(null);
    setEditingAccount({
      name: '',
      description: '',
      price: 0,
      video_url: '',
      is_active: true,
      category: ''
    });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditingAccount({});
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الحسابات</h2>
        <Button onClick={startAdding} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة حساب جديد
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>{isAdding ? 'إضافة حساب جديد' : 'تعديل الحساب'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>اسم الحساب *</Label>
                <Input 
                  value={editingAccount.name || ''}
                  onChange={(e) => setEditingAccount({...editingAccount, name: e.target.value})}
                  placeholder="اسم الحساب"
                />
              </div>
              <div>
                <Label>السعر *</Label>
                <Input 
                  type="number"
                  step="0.01"
                  value={editingAccount.price || ''}
                  onChange={(e) => setEditingAccount({...editingAccount, price: parseFloat(e.target.value)})}
                  placeholder="السعر"
                />
              </div>
            </div>
            
            <div>
              <Label>الوصف</Label>
              <Textarea 
                value={editingAccount.description || ''}
                onChange={(e) => setEditingAccount({...editingAccount, description: e.target.value})}
                placeholder="وصف الحساب"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>رابط الفيديو</Label>
                <Input 
                  value={editingAccount.video_url || ''}
                  onChange={(e) => setEditingAccount({...editingAccount, video_url: e.target.value})}
                  placeholder="رابط الفيديو التوضيحي"
                />
              </div>
              <div>
                <Label>الفئة</Label>
                <Input 
                  value={editingAccount.category || ''}
                  onChange={(e) => setEditingAccount({...editingAccount, category: e.target.value})}
                  placeholder="فئة الحساب"
                />
              </div>
            </div>

            <div>
              <Label>الحالة</Label>
              <Select 
                value={editingAccount.is_active ? 'true' : 'false'}
                onValueChange={(value) => setEditingAccount({...editingAccount, is_active: value === 'true'})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">مفعل</SelectItem>
                  <SelectItem value="false">غير مفعل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveAccount}>
                {isAdding ? 'إضافة' : 'حفظ'}
              </Button>
              <Button variant="outline" onClick={cancelEditing}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>{account.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    account.is_active ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {account.is_active ? 'مفعل' : 'غير مفعل'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleActive(account.id, account.is_active)}
                  >
                    {account.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEditing(account)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteAccount(account.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>السعر:</strong> ${account.price}
                </div>
                <div>
                  <strong>الفئة:</strong> {account.category || 'غير محدد'}
                </div>
                <div className="col-span-2">
                  <strong>الوصف:</strong> {account.description || 'لا يوجد وصف'}
                </div>
                {account.video_url && (
                  <div className="col-span-2">
                    <strong>رابط الفيديو:</strong> 
                    <a href={account.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-2">
                      عرض الفيديو
                    </a>
                  </div>
                )}
                <div>
                  <strong>تاريخ الإنشاء:</strong> {new Date(account.created_at).toLocaleDateString('ar')}
                </div>
                <div>
                  <strong>آخر تحديث:</strong> {new Date(account.updated_at).toLocaleDateString('ar')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">لا توجد حسابات متاحة</p>
          <Button onClick={startAdding} className="mt-4">
            إضافة أول حساب
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
