import { useState, useEffect } from 'react';
import {
  LogOut,
  FileText,
  Settings,
  Download,
  Trash2,
  Calendar,
  User,
  Mail,
  Building2,
  ArrowLeft,
  FileDown,
  BarChart3,
  X,
  CheckCircle2,
  DownloadCloud,
  ToggleLeft,
  ToggleRight,
  HardDrive,
  Send,
  Globe,
  Shield,
  FormInput,
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  Cloud,
  CloudOff,
  Loader2,
} from 'lucide-react';
import { useAdminStore, type StoredBrief } from '../stores/adminStore';
import { isFirebaseConfigured } from '../lib/firebase';
import { Button } from './Button';
import { generateMarkdownPrompt } from '../lib/telegram';
import { ConfirmDialog } from './ConfirmDialog';

type AdminTab = 'dashboard' | 'briefs' | 'settings';

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function downloadMarkdown(brief: StoredBrief) {
  const data = brief.data;
  const negocio = (data.empresa || data.nombre || 'brief').toString().toLowerCase().replace(/\s+/g, '-');
  const dateStr = new Date(brief.timestamp).toISOString().slice(0, 10);
  const filename = `prompt-${negocio}-${dateStr}.md`;
  const mdContent = generateMarkdownPrompt(data as any);
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadJson(brief: StoredBrief) {
  const filename = `brief-${brief.id}.json`;
  const jsonContent = JSON.stringify(brief, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function BriefCard({ brief, onDelete }: { brief: StoredBrief; onDelete: () => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const data = brief.data;

  return (
    <div className="admin-brief-card">
      <div className="admin-brief-header">
        <div className="admin-brief-info">
          <h4 className="admin-brief-name">
            {data.empresa || data.nombre || 'Sin nombre'}
          </h4>
          <div className="admin-brief-meta">
            <span className="admin-brief-meta-item">
              <Calendar size={14} />
              {formatDate(brief.timestamp)}
            </span>
            {data.email && (
              <span className="admin-brief-meta-item">
                <Mail size={14} />
                {data.email}
              </span>
            )}
          </div>
        </div>
        <div className="admin-brief-actions">
          <button
            className="admin-icon-btn"
            title="Descargar .md"
            onClick={() => downloadMarkdown(brief)}
          >
            <FileDown size={18} />
          </button>
          <button
            className="admin-icon-btn"
            title="Descargar JSON"
            onClick={() => downloadJson(brief)}
          >
            <Download size={18} />
          </button>
          <button
            className="admin-icon-btn admin-icon-btn-danger"
            title="Eliminar"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="admin-brief-details">
          <div className="admin-brief-detail-grid">
            {data.nombre && (
              <div className="admin-brief-detail-item">
                <span className="admin-brief-detail-label">
                  <User size={14} /> Nombre
                </span>
                <span className="admin-brief-detail-value">{data.nombre}</span>
              </div>
            )}
            {data.empresa && (
              <div className="admin-brief-detail-item">
                <span className="admin-brief-detail-label">
                  <Building2 size={14} /> Empresa
                </span>
                <span className="admin-brief-detail-value">{data.empresa}</span>
              </div>
            )}
            {data.tipo_sitio && (
              <div className="admin-brief-detail-item">
                <span className="admin-brief-detail-label">Tipo de sitio</span>
                <span className="admin-brief-detail-value">{data.tipo_sitio}</span>
              </div>
            )}
            {data.presupuesto && (
              <div className="admin-brief-detail-item">
                <span className="admin-brief-detail-label">Presupuesto</span>
                <span className="admin-brief-detail-value">{data.presupuesto}</span>
              </div>
            )}
            {data.rubro && (
              <div className="admin-brief-detail-item">
                <span className="admin-brief-detail-label">Rubro</span>
                <span className="admin-brief-detail-value">{data.rubro}</span>
              </div>
            )}
          </div>
          {data.objetivo && (
            <div className="admin-brief-detail-item admin-brief-detail-full">
              <span className="admin-brief-detail-label">Objetivo</span>
              <span className="admin-brief-detail-value">{data.objetivo}</span>
            </div>
          )}
          {data.observaciones && (
            <div className="admin-brief-detail-item admin-brief-detail-full">
              <span className="admin-brief-detail-label">Observaciones</span>
              <span className="admin-brief-detail-value">{data.observaciones}</span>
            </div>
          )}
          <button
            className="admin-toggle-details"
            onClick={() => setShowDetails(false)}
          >
            <X size={16} /> Ocultar detalles
          </button>
        </div>
      )}

      {!showDetails && (
        <button
          className="admin-toggle-details"
          onClick={() => setShowDetails(true)}
        >
          <CheckCircle2 size={16} /> Ver detalles
        </button>
      )}
    </div>
  );
}

function DashboardTab() {
  const briefs = useAdminStore((s) => s.briefs);
  const exportAllBriefs = useAdminStore((s) => s.exportAllBriefs);
  const getStatsByType = useAdminStore((s) => s.getStatsByType);
  const getStatsByBudget = useAdminStore((s) => s.getStatsByBudget);
  const totalBriefs = briefs.length;

  const thisMonth = briefs.filter((b) => {
    const d = new Date(b.timestamp);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const thisWeek = briefs.filter((b) => {
    const d = new Date(b.timestamp);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length;

  const statsByType = getStatsByType();
  const statsByBudget = getStatsByBudget();

  const stats = [
    { label: 'Total de briefs', value: totalBriefs, icon: FileText, color: '#d4a053' },
    { label: 'Este mes', value: thisMonth, icon: Calendar, color: '#4cc38a' },
    { label: 'Esta semana', value: thisWeek, icon: BarChart3, color: '#2563eb' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h3>Resumen</h3>
        {briefs.length > 0 && (
          <Button variant="secondary" onClick={exportAllBriefs}>
            <DownloadCloud size={16} />
            Exportar todos
          </Button>
        )}
      </div>
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{stat.value}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {briefs.length > 0 && (
        <>
          <div className="admin-stats-breakdown">
            <div className="admin-breakdown-card">
              <h4>Tipo de sitio</h4>
              <div className="admin-breakdown-list">
                {Object.entries(statsByType).map(([tipo, count]) => (
                  <div key={tipo} className="admin-breakdown-item">
                    <span className="admin-breakdown-label">{tipo}</span>
                    <span className="admin-breakdown-value">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-breakdown-card">
              <h4>Presupuesto</h4>
              <div className="admin-breakdown-list">
                {Object.entries(statsByBudget).map(([budget, count]) => (
                  <div key={budget} className="admin-breakdown-item">
                    <span className="admin-breakdown-label">{budget}</span>
                    <span className="admin-breakdown-value">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-recent-section">
            <h4>Últimos briefs recibidos</h4>
            <div className="admin-recent-list">
              {briefs.slice(0, 5).map((brief) => (
                <div key={brief.id} className="admin-recent-item">
                  <FileText size={16} />
                  <span className="admin-recent-name">
                    {brief.data.empresa || brief.data.nombre || 'Sin nombre'}
                  </span>
                  <span className="admin-recent-date">{formatDate(brief.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BriefsTab() {
  const briefs = useAdminStore((s) => s.briefs);
  const deleteBrief = useAdminStore((s) => s.deleteBrief);
  const clearAllBriefs = useAdminStore((s) => s.clearAllBriefs);
  const exportAllBriefs = useAdminStore((s) => s.exportAllBriefs);
  const [search, setSearch] = useState('');
  const [showClearDialog, setShowClearDialog] = useState(false);

  const filtered = briefs.filter((b) => {
    const q = search.toLowerCase();
    const name = (b.data.nombre || '').toLowerCase();
    const empresa = (b.data.empresa || '').toLowerCase();
    const email = (b.data.email || '').toLowerCase();
    return name.includes(q) || empresa.includes(q) || email.includes(q);
  });

  return (
    <div className="admin-briefs-tab">
      <ConfirmDialog
        open={showClearDialog}
        title="Eliminar todos los briefs"
        message="¿Estás seguro de que querés eliminar todos los briefs almacenados? Esta acción no se puede deshacer."
        confirmLabel="Eliminar todo"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          clearAllBriefs();
          setShowClearDialog(false);
        }}
        onCancel={() => setShowClearDialog(false)}
      />

      <div className="admin-briefs-header">
        <h3>Briefs enviados ({filtered.length})</h3>
        <div className="admin-briefs-controls">
          <div className="admin-search-wrapper">
            <input
              type="text"
              className="admin-search-input"
              placeholder="Buscar por nombre, empresa o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {briefs.length > 0 && (
            <>
              <Button variant="secondary" onClick={exportAllBriefs}>
                <DownloadCloud size={16} />
                Exportar
              </Button>
              <Button variant="secondary" onClick={() => setShowClearDialog(true)}>
                <Trash2 size={16} />
                Limpiar todo
              </Button>
            </>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty-state">
          <FileText size={48} />
          <h4>No hay briefs {search ? 'que coincidan' : 'aún'}</h4>
          <p>
            {search
              ? 'Probá con otro término de búsqueda.'
              : 'Los briefs enviados aparecerán aquí.'}
          </p>
        </div>
      ) : (
        <div className="admin-briefs-list">
          {filtered.map((brief) => (
            <BriefCard
              key={brief.id}
              brief={brief}
              onDelete={() => deleteBrief(brief.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const settings = useAdminStore((s) => s.settings);
  const togglePage = useAdminStore((s) => s.togglePage);
  const toggleTelegram = useAdminStore((s) => s.toggleTelegram);
  const changeCredentials = useAdminStore((s) => s.changeCredentials);
  const getStorageInfo = useAdminStore((s) => s.getStorageInfo);
  const clearLocalStorage = useAdminStore((s) => s.clearLocalStorage);

  const [newUsername, setNewUsername] = useState(settings.adminUsername);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentialsSaved, setCredentialsSaved] = useState(false);
  const [showClearStorageDialog, setShowClearStorageDialog] = useState(false);

  const storageInfo = getStorageInfo();

  const handleSaveCredentials = async () => {
    if (!newUsername.trim()) return;
    if (newPassword !== confirmPassword) return;
    if (newPassword.length < 4) return;
    await changeCredentials(newUsername.trim(), newPassword);
    setCredentialsSaved(true);
    setTimeout(() => setCredentialsSaved(false), 2000);
    setNewPassword('');
    setConfirmPassword('');
  };

  const pages = [
    { key: 'pagePrices' as const, name: 'Página de precios', desc: 'Muestra los planes y precios de servicios', icon: Globe },
    { key: 'pageForm' as const, name: 'Formulario de brief', desc: 'Formulario principal para recopilar información', icon: FormInput },
    { key: 'pageAdmin' as const, name: 'Panel de administración', desc: 'Acceso protegido con usuario y contraseña', icon: Shield },
  ];

  return (
    <div className="admin-settings-tab">
      <ConfirmDialog
        open={showClearStorageDialog}
        title="Limpiar almacenamiento"
        message="Esto eliminará todos los briefs y datos guardados en el navegador. Las configuraciones de admin se mantendrán. ¿Continuar?"
        confirmLabel="Limpiar todo"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          clearLocalStorage();
          setShowClearStorageDialog(false);
        }}
        onCancel={() => setShowClearStorageDialog(false)}
      />

      <h3>Configuración</h3>

      {/* Pages toggles */}
      <div className="admin-settings-section">
        <h4>Páginas del sitio</h4>
        <div className="admin-settings-list">
          {pages.map((page) => (
            <div key={page.key} className="admin-setting-item">
              <div className="admin-setting-info">
                <span className="admin-setting-name">
                  <page.icon size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  {page.name}
                </span>
                <span className="admin-setting-desc">{page.desc}</span>
              </div>
              <button
                className="admin-toggle-btn"
                onClick={() => togglePage(page.key)}
                title={settings[page.key] ? 'Desactivar' : 'Activar'}
              >
                {settings[page.key] ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Telegram toggle */}
      <div className="admin-settings-section">
        <h4>Envío a Telegram</h4>
        <div className="admin-settings-list">
          <div className="admin-setting-item">
            <div className="admin-setting-info">
              <span className="admin-setting-name">
                <Send size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Enviar briefs a Telegram
              </span>
              <span className="admin-setting-desc">
                {settings.telegramEnabled
                  ? 'Los briefs se envían automáticamente a Telegram'
                  : 'El envío a Telegram está desactivado'}
              </span>
            </div>
            <button
              className="admin-toggle-btn"
              onClick={toggleTelegram}
              title={settings.telegramEnabled ? 'Desactivar' : 'Activar'}
            >
              {settings.telegramEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="admin-settings-section">
        <h4>Credenciales de admin</h4>
        <div className="admin-credentials-form">
          <div className="admin-credentials-row">
            <div className="admin-field">
              <label className="admin-field-label">Nuevo usuario</label>
              <input
                type="text"
                className="admin-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Dejar sin cambiar para mantener el actual"
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Nueva contraseña</label>
              <div className="admin-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="admin-input admin-input-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Confirmar contraseña</label>
              <input
                type="password"
                className="admin-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí la contraseña"
              />
            </div>
          </div>
          <div className="admin-credentials-actions">
            {credentialsSaved && (
              <span className="admin-credentials-saved">
                <CheckCircle2 size={14} /> Credenciales actualizadas
              </span>
            )}
            <Button
              variant="primary"
              onClick={handleSaveCredentials}
              disabled={!newUsername.trim() || !newPassword || newPassword !== confirmPassword}
            >
              <Save size={16} />
              Guardar credenciales
            </Button>
          </div>
        </div>
      </div>

      {/* Storage info */}
      <div className="admin-settings-section">
        <h4>
          <HardDrive size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Almacenamiento local
        </h4>
        <div className="admin-storage-info">
          {storageInfo.length === 0 ? (
            <p className="admin-storage-empty">No hay datos almacenados.</p>
          ) : (
            <>
              <div className="admin-storage-list">
                {storageInfo.map((item) => (
                  <div key={item.key} className="admin-storage-item">
                    <span className="admin-storage-key">{item.key}</span>
                    <span className="admin-storage-meta">
                      {item.size}{item.count > 0 ? ` · ${item.count} items` : ''}
                    </span>
                  </div>
                ))}
              </div>
              <div className="admin-storage-actions">
                <Button
                  variant="secondary"
                  onClick={() => setShowClearStorageDialog(true)}
                >
                  <AlertTriangle size={16} />
                  Limpiar almacenamiento
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminPanel({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const logout = useAdminStore((s) => s.logout);
  const isLoading = useAdminStore((s) => s.isLoading);
  const loadBriefsFromFirebase = useAdminStore((s) => s.loadBriefsFromFirebase);

  // Recargar briefs al cambiar de pestaña
  useEffect(() => {
    if (isFirebaseConfigured) {
      loadBriefsFromFirebase();
    }
  }, [activeTab, loadBriefsFromFirebase]);

  const handleLogout = () => {
    logout();
    onBack();
  };

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'briefs', label: 'Briefs', icon: FileText },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-left">
          <button className="admin-back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <h2>Panel de Administración</h2>
          <div className="admin-firebase-status">
            {isFirebaseConfigured ? (
              <span className="admin-firebase-badge admin-firebase-connected">
                <Cloud size={14} /> Firebase conectado
              </span>
            ) : (
              <span className="admin-firebase-badge admin-firebase-disconnected">
                <CloudOff size={14} /> Firebase no configurado
              </span>
            )}
          </div>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          <LogOut size={16} />
          Cerrar sesión
        </Button>
      </header>

      <nav className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      {isLoading && (
        <div className="admin-loading-overlay">
          <Loader2 size={32} className="spin" />
          <span>Cargando briefs desde Firebase...</span>
        </div>
      )}

      <div className="admin-content">
        {!isFirebaseConfigured && activeTab === 'briefs' && (
          <div className="admin-firebase-warning">
            <AlertTriangle size={20} />
            <div>
              <strong>Firebase no configurado</strong>
              <p>Los briefs se guardan solo en memoria. Configurá <code>src/lib/firebase.ts</code> para guardarlos en la nube.</p>
            </div>
          </div>
        )}
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'briefs' && <BriefsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}
