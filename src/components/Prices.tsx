import { Button } from './Button';
import { useThemeStore } from '../stores/themeStore';
import { Sun, Moon, ArrowLeft, Check } from 'lucide-react';

interface PriceTier {
  name: string;
  icon: string;
  price: string;
  priceFrom: boolean;
  description: string;
  features: string[];
  notInclude: string[];
  popular?: boolean;
  delivery: string;
}

const priceTiers: PriceTier[] = [
  {
    name: 'Landing Page',
    icon: '',
    price: '$150 - $400',
    priceFrom: true,
    description: 'Una página única y atractiva para presentar tu negocio, producto o servicio. Ideal para captar leads o promocionar algo específico.',
    features: [
      'Diseño responsive (móvil y escritorio)',
      'Sección hero con llamada a la acción',
      'Sección de servicios o beneficios',
      'Testimonios o clientes',
      'Formulario de contacto o botón WhatsApp',
      'Optimización SEO básica',
      'Entrega en 3-7 días',
    ],
    notInclude: [
      'Panel de administración',
      'Tienda online',
      'Base de datos',
    ],
    delivery: '3-7 días',
  },
  {
    name: 'Sitio Corporativo',
    icon: '',
    price: '$500 - $1,500',
    priceFrom: true,
    description: 'Un sitio web completo para tu empresa con múltiples secciones, blog y todo lo necesario para proyectar profesionalismo.',
    features: [
      'Hasta 5-7 páginas/secciones',
      'Diseño personalizado y responsive',
      'Blog o sección de noticias',
      'Formulario de contacto avanzado',
      'Integración con redes sociales',
      'Google Analytics',
      'SEO optimizado',
      'Panel de administración básico',
      'Entrega en 1-3 semanas',
    ],
    notInclude: [
      'Tienda online con pagos',
      'Sistema de usuarios complejo',
    ],
    popular: true,
    delivery: '1-3 semanas',
  },
  {
    name: 'Tienda Online',
    icon: '',
    price: '$1,000 - $3,000',
    priceFrom: true,
    description: 'Una tienda completa para vender tus productos online con carrito de compras, pasarela de pagos y gestión de inventario.',
    features: [
      'Catálogo de productos con filtros',
      'Carrito de compras',
      'Pasarela de pagos (Stripe, PayPal)',
      'Gestión de inventario',
      'Panel de administración completo',
      'Gestión de pedidos',
      'Emails automáticos de confirmación',
      'SEO para productos',
      'Entrega en 2-6 semanas',
    ],
    notInclude: [
      'App móvil nativa',
      'Sistema de suscripciones recurrentes (extra)',
    ],
    delivery: '2-6 semanas',
  },
  {
    name: 'Sistema / App Web',
    icon: '',
    price: '$2,000 - $5,000+',
    priceFrom: true,
    description: 'Aplicaciones web personalizadas con funcionalidades complejas: reservas, gestión, dashboards, sistemas de usuarios, etc.',
    features: [
      'Diseño y desarrollo a medida',
      'Sistema de autenticación de usuarios',
      'Base de datos personalizada',
      'Panel de administración avanzado',
      'APIs y integraciones',
      'Reportes y dashboards',
      'Notificaciones en tiempo real',
      'Entrega en 4-12 semanas',
    ],
    notInclude: [
      'App móvil nativa (iOS/Android)',
      'Servidores y hosting (se cotiza aparte)',
    ],
    delivery: '4-12 semanas',
  },
];

const extraServices = [
  { name: 'Diseño de logo', price: '$50 - $200', description: 'Logo profesional con manual de marca básico' },
  { name: 'SEO avanzado', price: '$100 - $300/mes', description: 'Optimización continua, keywords, backlinks' },
  { name: 'Mantenimiento mensual', price: '$50 - $150/mes', description: 'Actualizaciones, backups, soporte técnico' },
  { name: 'Redacción de contenido', price: '$50 - $200', description: 'Textos profesionales para tu sitio' },
  { name: 'Fotografía profesional', price: '$100 - $500', description: 'Sesión fotográfica para productos o negocio' },
  { name: 'Dominio + Hosting (1 año)', price: '$50 - $150', description: 'Registro de dominio y alojamiento web' },
];

export function Prices() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="app">
      <header className="top">
        <div className="header-inner">
          <div>
            <h1>Precios de Servicios Web</h1>
            <p>Estimados aproximados en dólares (USD). Cada proyecto es único y el precio final se define después del brief.</p>
          </div>
          <Button variant="ghost" onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      {/* Price Tiers */}
      <div className="pricing-grid">
        {priceTiers.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card ${tier.popular ? 'pricing-card-popular' : ''}`}
          >
            {tier.popular && (
              <div className="pricing-badge">
                Más popular
              </div>
            )}
            <h3>{tier.name}</h3>
            <div className="pricing-amount">
              <span className="pricing-currency">$</span>
              <span className="pricing-value">{tier.price.replace('$', '').replace('+', '+')}</span>
            </div>
            <p className="pricing-description">{tier.description}</p>
            <div className="pricing-delivery">Entrega: {tier.delivery}</div>
            <ul className="pricing-features">
              {tier.features.map((feature, i) => (
                <li key={i}>
                  <Check size={16} className="pricing-check" />
                  {feature}
                </li>
              ))}
            </ul>
            {tier.notInclude.length > 0 && (
              <div className="pricing-not-include">
                <small>No incluye: {tier.notInclude.join(', ')}</small>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Extra Services */}
      <section className="card pricing-extras">
        <h2>Servicios adicionales</h2>
        <p className="hint">Complementos que puedes añadir a cualquier proyecto.</p>
        <div className="extras-grid">
          {extraServices.map((extra) => (
            <div key={extra.name} className="extra-item">
              <div className="extra-info">
                <h4>{extra.name}</h4>
                <p>{extra.description}</p>
              </div>
              <div className="extra-price">{extra.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="card pricing-cta">
        <h2>¿Listo para empezar?</h2>
        <p>Completá el brief y te preparo una propuesta personalizada basada en tus necesidades exactas.</p>
        <a href="/" className="btn btn-primary pricing-cta-btn">
          <ArrowLeft size={18} />
          Ir al formulario
        </a>
      </section>

      {/* Disclaimer */}
      <p className="pricing-disclaimer">
        * Los precios son estimados y pueden variar según la complejidad del proyecto. El precio final se determina después de analizar el brief completado.
      </p>
    </div>
  );
}
