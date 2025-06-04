
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'superadmin' | 'owner' | 'support';
  isVerified: boolean;
  subscriptionLevel: 'basic' | 'gold' | 'diamond' | null;
  subscriptionExpiry: string | null;
  createdAt: string;
  permissions?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User }>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Package {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  nameTr: string;
  nameVi: string;
  price: number;
  originalPrice: number;
  features: string[];
  featuresEn: string[];
  featuresRu: string[];
  featuresTr: string[];
  featuresVi: string[];
  level: 'basic' | 'gold' | 'diamond';
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  requiredLevel: 'basic' | 'gold' | 'diamond';
  isActive: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
  isRead?: boolean;
  conversationId: string;
}

export interface SupportConversation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'open' | 'closed';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
