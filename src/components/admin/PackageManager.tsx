
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

const PackageManager = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingPackage, setEditingPackage] = useState<Partial<Package>>({});
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const savedPackages = localStorage.getItem('packages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      // Initialize with default packages
      const defaultPackages: Package[] = [
        {
          id: '1',
          name: 'الباقة الأساسية',
          nameEn: 'Basic Package',
          nameRu: 'Базовый пакет',
          nameTr: 'Temel Paket',
          nameVi: 'Gói Cơ Bản',
          price: 10,
          originalPrice: 20,
          features: ['ميزة 1', 'ميزة 2'],
          featuresEn: ['Feature 1', 'Feature 2'],
          featuresRu: ['Функция 1', 'Функция 2'],
          featuresTr: ['Özellik 1', 'Özellik 2'],
          featuresVi: ['Tính năng 1', 'Tính năng 2'],
          level: 'basic',
          isActive: true
        }
      ];
      setPackages(defaultPackages);
      localStorage.setItem('packages', JSON.stringify(defaultPackages));
    }
  }, []);

  const savePackages = (updatedPackages: Package[]) => {
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
  };

  const handleAddPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: 'باقة جديدة',
      nameEn: 'New Package',
      nameRu: 'Новый пакет',
      nameTr: 'Yeni Paket',
      nameVi: 'Gói Mới',
      price: 0,
      originalPrice: 0,
      features: [],
      featuresEn: [],
      featuresRu: [],
      featuresTr: [],
      featuresVi: [],
      level: 'basic',
      isActive: true
    };
    savePackages([...packages, newPackage]);
    setIsEditing(newPackage.id);
    setEditingPackage(newPackage);
  };

  const handleEditPackage = (pkg: Package) => {
    setIsEditing(pkg.id);
    setEditingPackage(pkg);
  };

  const handleSavePackage = () => {
    if (!isEditing || !editingPackage) return;
    
    const updatedPackages = packages.map(pkg => 
      pkg.id === isEditing ? { ...pkg, ...editingPackage } : pkg
    );
    savePackages(updatedPackages);
    setIsEditing(null);
    setEditingPackage({});
    toast({
      title: "تم حفظ الباقة بنجاح",
      description: "تم تحديث بيانات الباقة"
    });
  };

  const handleDeletePackage = (id: string) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== id);
    savePackages(updatedPackages);
    toast({
      title: "تم حذف الباقة",
      description: "تم حذف الباقة بنجاح"
    });
  };

  const getPackageName = (pkg: Package) => {
    switch (language) {
      case 'en': return pkg.nameEn;
      case 'ru': return pkg.nameRu;
      case 'tr': return pkg.nameTr;
      case 'vi': return pkg.nameVi;
      default: return pkg.name;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الباقات</h2>
        <Button onClick={handleAddPackage} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة باقة جديدة
        </Button>
      </div>

      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{getPackageName(pkg)}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPackage(pkg)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePackage(pkg.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing === pkg.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الاسم (عربي)</Label>
                      <Input 
                        value={editingPackage.name || ''}
                        onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Name (English)</Label>
                      <Input 
                        value={editingPackage.nameEn || ''}
                        onChange={(e) => setEditingPackage({...editingPackage, nameEn: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>السعر</Label>
                      <Input 
                        type="number"
                        value={editingPackage.price || 0}
                        onChange={(e) => setEditingPackage({...editingPackage, price: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>السعر الأصلي</Label>
                      <Input 
                        type="number"
                        value={editingPackage.originalPrice || 0}
                        onChange={(e) => setEditingPackage({...editingPackage, originalPrice: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePackage}>حفظ</Button>
                    <Button variant="outline" onClick={() => setIsEditing(null)}>إلغاء</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>السعر: ${pkg.price}</p>
                  <p>السعر الأصلي: ${pkg.originalPrice}</p>
                  <p>المستوى: {pkg.level}</p>
                  <p>نشط: {pkg.isActive ? 'نعم' : 'لا'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageManager;
