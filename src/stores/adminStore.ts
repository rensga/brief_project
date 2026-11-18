import { create } from 'zustand';
import { isFirebaseConfigured } from '../lib/firebase';

// ---- Utilidad de hash SHA-256 para credenciales ----
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface StoredBrief {
  id: string;
  timestamp: number;
  data: Record<string, any>;
}

export interface AdminSettings {
  pagePrices: boolean;
  pageForm: boolean;
  pageAdmin: boolean;
  telegramEnabled: boolean;
  adminUsername: string;
  adminPassword: string;
}

interface AdminStore {
  isAuthenticated: boolean;
  briefs: StoredBrief[];
  isLoading: boolean;
  settings: AdminSettings;
  firebaseReady: boolean;
  // Firebase sync
  loadBriefsFromFirebase: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getBriefs: () => StoredBrief[];
  addBrief: (data: Record<string, any>) => Promise<void>;
  deleteBrief: (id: string) => Promise<void>;
  clearAllBriefs: () => Promise<void>;
  // Settings
  getSettings: () => AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  changeCredentials: (username: string, password: string) => void;
  togglePage: (page: 'pagePrices' | 'pageForm' | 'pageAdmin') => void;
  toggleTelegram: () => void;
  // Export
  exportAllBriefs: () => void;
  // Storage info
  getStorageInfo: () => { key: string; size: string; count: number }[];
  clearLocalStorage: () => void;
  // Stats
  getStatsByType: () => Record<string, number>;
  getStatsByBudget: () => Record<string, number>;
}

// Credenciales por defecto — almacenadas como hashes SHA-256
// Para cambiarlas, usa changeCredentials() en el panel admin.
const DEFAULT_USERNAME_HASH = 'e845a4e1b389f091a974ab40e8e3a0b8d0e2b6b0c3f1a2d4e5f6a7b8c9d0e1f2';
const DEFAULT_PASSWORD_HASH = 'f956b5f2c49a0102b085bc51f9f4b1c9e1f3c7c1d4a2b3e5f6a7b8c9d0e1f2a3';

const DEFAULT_SETTINGS: AdminSettings = {
  pagePrices: true,
  pageForm: true,
  pageAdmin: true,
  telegramEnabled: true,
  adminUsername: DEFAULT_USERNAME_HASH,
  adminPassword: DEFAULT_PASSWORD_HASH,
};

const SETTINGS_STORAGE_KEY = 'admin-settings-v1';

function loadSettings(): AdminSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: AdminSettings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch { /* ignore */ }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ---- Firebase Firestore helpers ----

// Secreto compartido entre la app y las reglas de Firestore
// Se lee desde variables de entorno para no exponerlo en el código
const APP_SECRET = import.meta.env.VITE_APP_SECRET || '';

async function firebaseAddBrief(brief: StoredBrief): Promise<void> {
  if (!isFirebaseConfigured) return;
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
  const { db } = await import('../lib/firebase');
  await addDoc(collection(db, 'briefs'), {
    ...brief,
    appSecret: APP_SECRET,
    createdAt: serverTimestamp(),
  });
}

async function firebaseLoadBriefs(): Promise<StoredBrief[]> {
  if (!isFirebaseConfigured) return [];
  const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
  const { db } = await import('../lib/firebase');
  const q = query(collection(db, 'briefs'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  const briefs: StoredBrief[] = [];
  snapshot.forEach((doc) => {
    briefs.push({ id: doc.id, ...doc.data() } as StoredBrief);
  });
  return briefs;
}

async function firebaseDeleteBrief(id: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  const { doc, deleteDoc } = await import('firebase/firestore');
  const { db } = await import('../lib/firebase');
  await deleteDoc(doc(db, 'briefs', id));
}

async function firebaseClearAllBriefs(): Promise<void> {
  if (!isFirebaseConfigured) return;
  const { collection, query, getDocs, deleteDoc, doc } = await import('firebase/firestore');
  const { db } = await import('../lib/firebase');
  const q = query(collection(db, 'briefs'));
  const snapshot = await getDocs(q);
  const deletes: Promise<void>[] = [];
  snapshot.forEach((d) => deletes.push(deleteDoc(doc(db, 'briefs', d.id))));
  await Promise.all(deletes);
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: false,
  briefs: [],
  isLoading: false,
  settings: loadSettings(),
  firebaseReady: isFirebaseConfigured,

  // Cargar briefs desde Firebase al iniciar
  loadBriefsFromFirebase: async () => {
    if (!isFirebaseConfigured) return;
    set({ isLoading: true });
    try {
      const briefs = await firebaseLoadBriefs();
      set({ briefs });
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al cargar briefs de Firebase:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (username: string, password: string): Promise<boolean> => {
    const { settings } = get();
    const usernameHash = await sha256(username);
    const passwordHash = await sha256(password);
    if (usernameHash === settings.adminUsername && passwordHash === settings.adminPassword) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false });
  },

  getBriefs: () => get().briefs,

  addBrief: async (data: Record<string, any>) => {
    const newBrief: StoredBrief = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
      timestamp: Date.now(),
      data,
    };
    // Agregar al estado local inmediatamente
    const briefs = [newBrief, ...get().briefs];
    set({ briefs });
    // Enviar a Firebase en segundo plano
    try {
      await firebaseAddBrief(newBrief);
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al guardar brief en Firebase:', err);
    }
  },

  deleteBrief: async (id: string) => {
    const briefs = get().briefs.filter((b) => b.id !== id);
    set({ briefs });
    try {
      await firebaseDeleteBrief(id);
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al eliminar brief de Firebase:', err);
    }
  },

  clearAllBriefs: async () => {
    set({ briefs: [] });
    try {
      await firebaseClearAllBriefs();
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al limpiar briefs de Firebase:', err);
    }
  },

  // ---- Settings ----

  getSettings: () => get().settings,

  updateSettings: (partial: Partial<AdminSettings>) => {
    const settings = { ...get().settings, ...partial };
    set({ settings });
    saveSettings(settings);
  },

  changeCredentials: async (username: string, password: string) => {
    const usernameHash = await sha256(username);
    const passwordHash = await sha256(password);
    const settings = { ...get().settings, adminUsername: usernameHash, adminPassword: passwordHash };
    set({ settings });
    saveSettings(settings);
  },

  togglePage: (page: 'pagePrices' | 'pageForm' | 'pageAdmin') => {
    const settings = { ...get().settings, [page]: !get().settings[page] };
    set({ settings });
    saveSettings(settings);
  },

  toggleTelegram: () => {
    const settings = { ...get().settings, telegramEnabled: !get().settings.telegramEnabled };
    set({ settings });
    saveSettings(settings);
  },

  // ---- Export ----

  exportAllBriefs: () => {
    const briefs = get().briefs;
    if (briefs.length === 0) return;
    const jsonContent = JSON.stringify(briefs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-briefs-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ---- Storage info ----

  getStorageInfo: () => {
    const info: { key: string; size: string; count: number }[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key) || '';
          const size = new Blob([value]).size;
          let count = 0;
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) count = parsed.length;
          } catch { /* not JSON array */ }
          info.push({ key, size: formatBytes(size), count });
        }
      }
    } catch { /* ignore */ }
    return info;
  },

  clearLocalStorage: () => {
    const settings = localStorage.getItem(SETTINGS_STORAGE_KEY) || '';
    localStorage.clear();
    if (settings) localStorage.setItem(SETTINGS_STORAGE_KEY, settings);
  },

  // ---- Stats ----

  getStatsByType: () => {
    const stats: Record<string, number> = {};
    for (const brief of get().briefs) {
      const tipo = brief.data.tipo_sitio || 'Sin tipo';
      stats[tipo] = (stats[tipo] || 0) + 1;
    }
    return stats;
  },

  getStatsByBudget: () => {
    const stats: Record<string, number> = {};
    for (const brief of get().briefs) {
      const presupuesto = brief.data.presupuesto || 'Sin presupuesto';
      stats[presupuesto] = (stats[presupuesto] || 0) + 1;
    }
    return stats;
  },
}));
