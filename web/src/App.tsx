import { useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  CreditCard,
  Globe2,
  LayoutDashboard,
  Menu,
  PackageCheck,
  PanelLeftClose,
  Search,
  Settings2,
  ShoppingBag,
  Truck,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

type Language = 'en' | 'ar'

type Order = {
  id: string
  customer: string
  initials: string
  date: string
  amount: string
  status: 'Paid' | 'Processing' | 'Pending'
  tone: string
}

const navSections = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', icon: LayoutDashboard },
      { label: 'Products', icon: ShoppingBag },
      { label: 'Categories', icon: Boxes },
      { label: 'Orders', icon: PackageCheck },
      { label: 'Customers', icon: Users },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Wallet & Transactions', icon: WalletCards },
      { label: 'Suppliers', icon: Truck },
      { label: 'QORIX Integration', icon: Zap },
      { label: 'Inventory & Sync', icon: CircleDollarSign },
      { label: 'Payments', icon: CreditCard },
    ],
  },
  {
    label: 'Configure',
    items: [
      { label: 'Profit & Analytics', icon: ArrowUpRight },
      { label: 'Bot Settings', icon: Command },
      { label: 'Admin Settings', icon: Settings2 },
    ],
  },
]

const orders: Order[] = [
  { id: '#NX-2048', customer: 'Maya Robinson', initials: 'MR', date: 'Today, 10:42 AM', amount: '$284.00', status: 'Paid', tone: 'plum' },
  { id: '#NX-2047', customer: 'Omar Hassan', initials: 'OH', date: 'Today, 09:18 AM', amount: '$126.50', status: 'Processing', tone: 'blue' },
  { id: '#NX-2046', customer: 'Lina Haddad', initials: 'LH', date: 'Yesterday, 04:56 PM', amount: '$92.00', status: 'Paid', tone: 'gold' },
  { id: '#NX-2045', customer: 'Noah Williams', initials: 'NW', date: 'Yesterday, 02:11 PM', amount: '$412.75', status: 'Pending', tone: 'mint' },
]

const bestSellers = [
  { name: 'Premium Gift Card', category: 'Digital goods', sales: '318 sold', revenue: '$7,950', progress: '89%', color: 'violet' },
  { name: 'QORIX Pro Subscription', category: 'Subscriptions', sales: '204 sold', revenue: '$5,712', progress: '68%', color: 'cyan' },
  { name: 'Mobile Data Bundle', category: 'Connectivity', sales: '166 sold', revenue: '$3,154', progress: '52%', color: 'amber' },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [activeNav, setActiveNav] = useState('Overview')

  const isArabic = language === 'ar'

  return (
    <div className={isArabic ? 'app-shell rtl' : 'app-shell'} dir={isArabic ? 'rtl' : 'ltr'}>
      <Sidebar open={sidebarOpen} activeNav={activeNav} onSelect={(item) => { setActiveNav(item); setSidebarOpen(false) }} />
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-start">
            <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu /></button>
            <div className="breadcrumb"><span>Nexora</span><ChevronRight /><strong>{activeNav}</strong></div>
          </div>
          <div className="topbar-actions">
            <button className="language-switch" onClick={() => setLanguage(isArabic ? 'en' : 'ar')}><Globe2 /><span>{isArabic ? 'العربية' : 'English'}</span><ChevronDown /></button>
            <div className="topbar-divider" />
            <button className="icon-button" aria-label="Search"><Search /></button>
            <button className="profile-button" aria-label="Open profile"><span className="profile-avatar">FK</span><span className="profile-copy"><strong>Fares Kirouane</strong><small>Administrator</small></span><ChevronDown /></button>
          </div>
        </header>

        <div className="page-wrap">
          <div className="page-heading">
            <div><p className="eyebrow">Tuesday, November 12, 2024</p><h1>{isArabic ? 'نظرة عامة' : 'Good morning, Fares'}</h1><p className="heading-copy">{isArabic ? 'إليك ما يحدث في متجرك اليوم.' : 'Here’s what’s happening across your store today.'}</p></div>
            <div className="heading-actions"><button className="outline-button"><Clock3 />Last 30 days<ChevronDown /></button><button className="primary-button"><ArrowUpRight />Export report</button></div>
          </div>

          <div className="demo-banner"><span className="demo-dot" /><span><strong>Demo workspace</strong> — Preview data only. Connect your FastAPI backend to see live store metrics.</span><button aria-label="Dismiss demo notice"><X /></button></div>

          <section className="metrics-grid" aria-label="Key performance indicators">
            <MetricCard label="Total sales" value="$24,680.40" change="18.2%" positive icon={<CircleDollarSign />} accent="purple" />
            <MetricCard label="Total orders" value="1,284" change="12.5%" positive icon={<ShoppingBag />} accent="blue" />
            <MetricCard label="Total customers" value="842" change="8.1%" positive icon={<Users />} accent="orange" />
            <MetricCard label="Estimated profit" value="$8,920.16" change="6.4%" positive icon={<ArrowUpRight />} accent="green" />
          </section>

          <section className="dashboard-grid">
            <div className="panel sales-panel"><PanelHeader title="Sales overview" subtitle="Revenue performance over time" action="View analytics" /><SalesChart /></div>
            <div className="panel supplier-panel"><PanelHeader title="Supplier connections" subtitle="Service health overview" action="Manage" /><div className="supplier-status"><div className="supplier-logo qorix">Q</div><div className="supplier-detail"><strong>QORIX</strong><span>Digital goods provider</span></div><span className="connected-badge"><i />Connected</span></div><div className="supplier-status"><div className="supplier-logo crypto">₿</div><div className="supplier-detail"><strong>KryptoExpress</strong><span>Payment gateway</span></div><span className="connected-badge"><i />Connected</span></div><div className="supplier-footer"><span>Last sync 8 minutes ago</span><button>Sync now <ArrowUpRight /></button></div></div>
          </section>

          <section className="dashboard-grid lower-grid">
            <div className="panel orders-panel"><PanelHeader title="Recent orders" subtitle="Your latest customer activity" action="View all orders" /><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong className="order-id">{order.id}</strong></td><td><div className="customer-cell"><span className={`customer-avatar ${order.tone}`}>{order.initials}</span><span>{order.customer}</span></div></td><td className="muted-cell">{order.date}</td><td><strong>{order.amount}</strong></td><td><StatusBadge status={order.status} /></td></tr>)}</tbody></table></div></div>
            <div className="panel products-panel"><PanelHeader title="Best-selling products" subtitle="Top performers this period" action="View products" /> <div className="product-list">{bestSellers.map((product, index) => <div className="product-row" key={product.name}><span className="product-rank">0{index + 1}</span><div className="product-meta"><div className="product-name"><strong>{product.name}</strong><span>{product.category}</span></div><div className="product-progress"><div className={`progress-bar ${product.color}`} style={{ width: product.progress }} /></div><span className="product-sales">{product.sales}</span></div><strong className="product-revenue">{product.revenue}</strong></div>)}</div></div>
          </section>

          <section className="alerts-strip"><div className="alert-heading"><div className="alert-icon"><AlertTriangle /></div><div><strong>Inventory needs attention</strong><span>3 products are running low and may affect fulfilment.</span></div></div><button className="text-button">Review inventory <ArrowUpRight /></button></section>
          <p className="footer-note">Nexora dashboard <span>•</span> Data shown is for demonstration purposes</p>
        </div>
      </main>
    </div>
  )
}

function Sidebar({ open, activeNav, onSelect }: { open: boolean; activeNav: string; onSelect: (item: string) => void }) {
  return <aside className={open ? 'sidebar open' : 'sidebar'}><div className="brand-row"><div className="brand-mark">N</div><div className="brand-name">NEXORA<span>COMMERCE OS</span></div><button className="sidebar-close icon-button" aria-label="Close navigation"><PanelLeftClose /></button></div><div className="workspace-switcher"><span className="workspace-icon"><Command /></span><span><strong>Primary workspace</strong><small>nexora.store</small></span><ChevronDown /></div><nav>{navSections.map((section) => <div className="nav-section" key={section.label}><span className="nav-label">{section.label}</span>{section.items.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => onSelect(label)}><Icon /><span>{label}</span>{label === 'Inventory & Sync' && <i className="nav-alert">3</i>}</button>)}</div>)}</nav><div className="sidebar-bottom"><div className="plan-card"><div className="plan-icon"><Zap /></div><div><strong>QORIX Pro plan</strong><span>72% of monthly volume</span></div><ArrowUpRight /></div><div className="sidebar-user"><span className="profile-avatar">FK</span><span><strong>Fares Kirouane</strong><small>View account</small></span><Settings2 /></div></div></aside>
}

function MetricCard({ label, value, change, icon, accent, positive }: { label: string; value: string; change: string; icon: ReactNode; accent: string; positive: boolean }) {
  return <article className="metric-card"><div className={`metric-icon ${accent}`}>{icon}</div><div className="metric-text"><span>{label}</span><strong>{value}</strong><small className={positive ? 'positive' : 'negative'}>{positive ? <ArrowUpRight /> : <ArrowDownRight />}{change} <em>vs last month</em></small></div><div className="metric-spark"><span /><span /><span /><span /><span /><span /><span /></div></article>
}

function PanelHeader({ title, subtitle, action }: { title: string; subtitle: string; action: string }) {
  return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="panel-action">{action} <ArrowUpRight /></button></div>
}

function SalesChart() {
  return <div className="chart-wrap"><div className="chart-legend"><span><i className="legend-dot revenue" />Revenue</span><span><i className="legend-dot orders" />Orders</span><strong>$24,680 <small>+18.2%</small></strong></div><div className="chart"><div className="y-axis"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 680 220" preserveAspectRatio="none" aria-label="Revenue chart"><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7666f5" stopOpacity=".24" /><stop offset="100%" stopColor="#7666f5" stopOpacity="0" /></linearGradient></defs><path d="M0 178 C42 165, 50 171, 84 147 S128 150, 157 135 S191 144, 223 118 S262 123, 292 132 S332 112, 356 94 S396 103, 426 76 S466 97, 496 66 S534 75, 562 49 S620 42, 680 20 L680 220 L0 220Z" fill="url(#revenueFill)" /><path d="M0 178 C42 165, 50 171, 84 147 S128 150, 157 135 S191 144, 223 118 S262 123, 292 132 S332 112, 356 94 S396 103, 426 76 S466 97, 496 66 S534 75, 562 49 S620 42, 680 20" fill="none" stroke="#7666f5" strokeWidth="3" vectorEffect="non-scaling-stroke" /><path d="M0 199 C44 196, 52 190, 84 183 S132 191, 157 174 S201 181, 223 164 S264 170, 292 157 S335 160, 356 142 S396 153, 426 137 S464 145, 496 121 S536 139, 562 111 S620 105, 680 84" fill="none" stroke="#8ddfd8" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" /></svg><div className="x-axis"><span>Jun 01</span><span>Jun 06</span><span>Jun 11</span><span>Jun 16</span><span>Jun 21</span><span>Jun 26</span><span>Jun 30</span></div></div></div></div>
}

function StatusBadge({ status }: { status: Order['status'] }) {
  return <span className={`status-badge ${status.toLowerCase()}`}><i />{status}</span>
}

export default App
