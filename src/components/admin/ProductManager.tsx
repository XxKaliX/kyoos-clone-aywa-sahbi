
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, Upload } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = () => {
    setIsAdding(true);
    setEditingProduct({
      name: '',
      description: '',
      fileUrl: '',
      requiredLevel: 'basic',
      isActive: true
    });
  };

  const handleSaveProduct = () => {
    if (!editingProduct.name || !editingProduct.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (isAdding) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: editingProduct.name!,
        description: editingProduct.description!,
        fileUrl: editingProduct.fileUrl || '',
        requiredLevel: editingProduct.requiredLevel || 'basic',
        isActive: editingProduct.isActive ?? true,
        createdAt: new Date().toISOString()
      };
      saveProducts([...products, newProduct]);
      setIsAdding(false);
    } else if (isEditing) {
      const updatedProducts = products.map(product => 
        product.id === isEditing ? { ...product, ...editingProduct } : product
      );
      saveProducts(updatedProducts);
      setIsEditing(null);
    }
    
    setEditingProduct({});
    toast({
      title: "تم الحفظ بنجاح",
      description: isAdding ? "تم إضافة المنتج" : "تم تحديث المنتج"
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج بنجاح"
    });
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(product.id);
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditingProduct({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة منتج جديد
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>{isAdding ? 'إضافة منتج جديد' : 'تعديل المنتج'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>اسم المنتج</Label>
                <Input 
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  placeholder="اسم المنتج"
                />
              </div>
              <div>
                <Label>المستوى المطلوب</Label>
                <Select 
                  value={editingProduct.requiredLevel || 'basic'}
                  onValueChange={(value) => setEditingProduct({...editingProduct, requiredLevel: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">أساسي</SelectItem>
                    <SelectItem value="gold">ذهبي</SelectItem>
                    <SelectItem value="diamond">الماسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea 
                value={editingProduct.description || ''}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                placeholder="وصف المنتج"
                rows={3}
              />
            </div>
            <div>
              <Label>رابط الملف</Label>
              <Input 
                value={editingProduct.fileUrl || ''}
                onChange={(e) => setEditingProduct({...editingProduct, fileUrl: e.target.value})}
                placeholder="رابط تحميل الملف"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveProduct}>حفظ</Button>
              <Button variant="outline" onClick={handleCancel}>إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-400 ml-2">({product.requiredLevel})</span>
                  {!product.isActive && <span className="text-red-400 text-sm ml-2">(غير نشط)</span>}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-2">{product.description}</p>
              <p className="text-sm text-gray-400">تاريخ الإنشاء: {new Date(product.createdAt).toLocaleDateString('ar')}</p>
              {product.fileUrl && (
                <p className="text-sm text-blue-400">رابط الملف: {product.fileUrl}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
