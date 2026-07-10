// ============================================================
// NEXUS DEV — Central Data Source (Egyptian Market Edition)
// ============================================================
// كل بيانات المنصة في مكان واحد لسهولة الصيانة والتخصيص

import {
  Code2, Smartphone, ShoppingCart, Cloud, Palette, ShieldCheck,
  Rocket, Building2, Sparkles, Search, PenTool, RefreshCw, Server,
  Database, Layers, Atom, GitBranch, Cpu, Boxes, Workflow, Terminal, Zap,
  Star, Download, Check, ArrowUpLeft, Eye, Tag,
  Users, FolderGit2, Award, TrendingUp, Clock, MapPin, Mail, Phone,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// معلومات الشركة
// ============================================================
export const COMPANY = {
  name: "NEXUS DEV",
  nameAr: "نِكسَس ديف",
  tagline: "هندسة برمجيات بمعايير عالمية",
  taglineEn: "SOFTWARE ENGINEERING",
  description:
    "شركة هندسة برمجيات مصرية متخصصة في تطوير تطبيقات الويب والجوال، وتوفير قوالب أكواد جاهزة بمعايير الإنتاج العالمية. نبني البرمجيات التي تُحرّك أعمالك.",
  email: "hello@nexusdev.eg",
  phoneEG: "+20 100 123 4567",
  phoneEGBusiness: "+20 2 2123 4567",
  whatsapp: "+20 100 123 4567",
  address: "القاهرة الجديدة · التجمع الخامس · شارع التسعين · برج النخلة · دور 12",
  addressShort: "القاهرة، مصر",
  taxNumber: "300-123-456",
  commercialRegister: "123456",
  workingHours: "السبت - الخميس · 9 ص - 6 م (توقيت القاهرة)",
  social: {
    github: "#",
    twitter: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
    behance: "#",
  },
};

// ============================================================
// طرق الدفع المصرية
// ============================================================
export const PAYMENT_METHODS = [
  { name: "فودافون كاش", desc: "تحويل فوري عبر المحفظة الإلكترونية", icon: "📱" },
  { name: "إنستاباي", desc: "تحويل بنكي لحظي بين البنوك المصرية", icon: "⚡" },
  { name: "فوري", desc: "دفع نقدي في أي فرع فوري عبر الإنترنت", icon: "🏪" },
  { name: "أمان", desc: "محفظة إلكترونية معتمدة من البنك المركزي", icon: "💳" },
  { name: "فيزا / ماستركارد", desc: "بطاقات ائتمانية محلية ودولية", icon: "💎" },
  { name: "تحويل بنكي", desc: "حساب بنكي تجاري بفاتورة ضريبية", icon: "🏦" },
];

// ============================================================
// روابط التنقل (Next.js routing)
// ============================================================
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "القوالب", href: "/templates" },
  { label: "أعمالنا", href: "/portfolio" },
  { label: "الباقات", href: "/pricing" },
  { label: "المدوّنة", href: "/blog" },
  { label: "من نحن", href: "/about" },
];

// ============================================================
// الخدمات (تفصيلية للصفحة المخصصة)
// ============================================================
export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  desc: string;
  points: string[];
  features: { title: string; desc: string }[];
  deliverables: string[];
  color: string;
  accent: string;
  priceFrom: number;
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    icon: Code2,
    title: "تطوير تطبيقات الويب",
    short: "تطبيقات ويب فائقة الأداء بـ Next.js وReact",
    desc: "نبني تطبيقات ويب فائقة الأداء باستخدام Next.js وReact وTypeScript، مع SSR/ISR وتحسين كامل لمحركات البحث وتجربة مستخدم استثنائية. كل تطبيق مبني ليُحقّق أعلى معدلات التحويل ويُحرّك مبيعاتك فعلياً.",
    points: ["Next.js + App Router", "تحسين SEO كامل", "PWA جاهزة للنشر"],
    features: [
      { title: "Server-Side Rendering", desc: "صفحات تُحمّل فوراً مع تحسين كامل لمحركات البحث (Google, Bing) — مهم جداً للسوق المصري حيث الأغلبية تستخدم الموبايل بإنترنت بطيء." },
      { title: "Progressive Web App", desc: "تطبيقك يعمل بدون إنترنت ويمكن تثبيته على شاشة الرئيسية مثل التطبيق الأصلي — مثالي لمستخدمي أندرويد في مصر." },
      { title: "تحسين Core Web Vitals", desc: "نضمن تقييم 90+ على Lighthouse مع LCP أقل من 1.5 ثانية — Google يحب المواقع السريعة." },
      { title: "دعم RTL/LTR كامل", desc: "تطبيقك يعمل بالعربية والإنجليزية بسلاسة، مع دعم تلقائي للهجة المصرية في النصوص." },
    ],
    deliverables: ["كود مصدري نظيف", "توثيق فني", "نشر على Vercel/Netlify", "30 يوم دعم"],
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
    priceFrom: 25000,
  },
  {
    slug: "mobile-development",
    icon: Smartphone,
    title: "تطوير تطبيقات الجوال",
    short: "تطبيقات iOS و Android بـ React Native",
    desc: "تطبيقات أصلية وهجينة لـ iOS وAndroid بـ React Native وExpo، بأداء قريب من الأصلي وتجربة مستخدم سلسة عبر جميع المنصات. ننشر تطبيقك على متجري Google Play وApp Store بكل الاحترافية.",
    points: ["React Native + Expo", "iOS و Android", "نشر على المتاجر"],
    features: [
      { title: "أداء قريب من الأصلي", desc: "نستخدم Reanimated وSkia للحصول على 60fps — تطبيقك سيبدو سلساً مثل التطبيقات الأصلية على Samsung وiPhone." },
      { title: "إشعارات Push", desc: "إشعارات ذكية بـ Firebase Cloud Messaging — مهمة جداً للتطبيقات المصرية (التوصيل، المطاعم، الصيدليات)." },
      { title: "دمج محافظ الدفع", desc: "PayMob, Fawry, Stripe — نموّل داخل التطبيق بسلاسة مع دعم فودافون كاش وإنستاباي." },
      { title: "تحديثات OTA", desc: "حدّث تطبيقك فورياً دون انتظار مراجعة المتاجر — ميزة قوية لـ Expo." },
    ],
    deliverables: ["تطبيق Android (APK/AAB)", "تطبيق iOS (IPA)", "كود مصدري", "نشر على المتاجر"],
    color: "from-sky-500/20 to-sky-500/5",
    accent: "text-sky-400",
    priceFrom: 45000,
  },
  {
    slug: "ecommerce",
    icon: ShoppingCart,
    title: "منصات التجارة الإلكترونية",
    short: "متاجر إلكترونية ببوابات دفع مصرية",
    desc: "متاجر إلكترونية متكاملة ببوابات دفع آمنة (PayMob, Fawry), إدارة مخزون، تحليلات متقدمة، وتجربة شراء سلسة مهّيأة للتحويل العالي في السوق المصري.",
    points: ["PayMob + Fawry", "لوحة تحكم متقدمة", "تحليلات حية"],
    features: [
      { title: "بوابات دفع مصرية", desc: "PayMob, Fawry, دراية — دعم كامل لفودافون كاش، إنستاباي، والدفع عند الاستلام (COD) الأكثر شيوعاً في مصر." },
      { title: "لوحة تحكم احترافية", desc: "إدارة مخزون، طلبات، عملاء، خصومات، كوبونات، وتقارير مبيعات حية — كل ما تحتاجه لإدارة متجرك." },
      { title: "تكامل شركات الشحن", desc: "Bosta, Aramex, Mylerz — ربط مباشر مع شركات الشحن المصرية لتتبع الشحنات تلقائياً." },
      { title: "تحسين التحويل", desc: "تصميم الـ checkout بـ single-page، خرائط حرارية، وA/B testing لرفع معدل التحويل." },
    ],
    deliverables: ["متجر إلكتروني كامل", "لوحة تحكم", "ربط بوابات دفع", "تدريب 4 ساعات"],
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
    priceFrom: 35000,
  },
  {
    slug: "devops",
    icon: Cloud,
    title: "البنية التحتية و DevOps",
    short: "بنية سحابية قابلة للتوسّع مع CI/CD",
    desc: "تصميم ونشر بنية تحتية سحابية قابلة للتوسّع باستخدام Docker وKubernetes، مع أنابيب CI/CD آلية ومراقبة على مدار الساعة. نضمن عدم توقف خدمتك في أوقات الذروة.",
    points: ["Docker + K8s", "CI/CD آلي", "مراقبة و logs"],
    features: [
      { title: "Containerization", desc: "Dockerize تطبيقك بالكامل — يعمل على أي خادم، أي بيئة، دون مشاكل." },
      { title: "Kubernetes Clusters", desc: "بنية قابلة للتوسّع تلقائياً — تطبيقك يتحمّل مليون مستخدم دون انهيار." },
      { title: "CI/CD Pipelines", desc: "GitHub Actions / GitLab CI — كل push ينشّر نسخة جديدة آلياً مع اختبارات شاملة." },
      { title: "Monitoring 24/7", desc: "Sentry, Grafana, Prometheus — نراقب أداء تطبيقك ونصحح الأخطاء قبل أن يلاحظها عملاؤك." },
    ],
    deliverables: ["بنية تحتية كاملة", "CI/CD pipelines", "لوحة monitoring", "توثيق Ops"],
    color: "from-amber-500/20 to-amber-500/5",
    accent: "text-amber-400",
    priceFrom: 30000,
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "تصميم تجربة المستخدم",
    short: "UI/UX مبني على الأبحاث للسوق المصري",
    desc: "تصميم UI/UX احترافي مبني على الأبحاث، يسبر المستخدم المصري بسهولة ويعكس هوية علامتك التجارية بدقة وذوق رفيع. نصمم ليناسب عادات وتوقعات المستخدم المصري.",
    points: ["Design System كامل", "Figma + Prototyping", "اختبارات قابلية"],
    features: [
      { title: "أبحاث المستخدم", desc: "نفهم عادات المستخدم المصري — كيف يتصفّح، ما الذي يثق به، وما الذي يدفعه للشراء." },
      { title: "Design System", desc: "مكتبة مكونات قابلة لإعادة الاستخدام — كل صفحة جديدة أسرع وأكثر اتساقاً." },
      { title: "Prototyping تفاعلي", desc: "تجربة المنتج كاملاً في Figma قبل كتابة سطر كود واحد." },
      { title: "اختبارات قابلية الاستخدام", desc: "نختبر التصميم على مستخدمين حقيقيين — نصلح المشاكل قبل الإطلاق." },
    ],
    deliverables: ["ملفات Figma", "Design System", "Prototype تفاعلي", "مواصفات تطوير"],
    color: "from-pink-500/20 to-pink-500/5",
    accent: "text-pink-400",
    priceFrom: 18000,
  },
  {
    slug: "security-audit",
    icon: ShieldCheck,
    title: "تدقيق وأمان التطبيقات",
    short: "تدقيق أمني شامل وفق OWASP",
    desc: "تدقيق أمني شامل لتطبيقاتك، اختبارات اختراق، إصلاح الثغرات، وضمان امتثال OWASP ومعايير الأمان العالمية. نحمي بيانات عملاءك المصريين ونتوافق مع قانون حماية البيانات المصري.",
    points: ["OWASP Top 10", "Penetration Testing", "تقارير تفصيلية"],
    features: [
      { title: "OWASP Top 10", desc: "تدقيق كامل لأشهر 10 ثغرات أمنية حسب معايير OWASP العالمية." },
      { title: "اختبارات اختراق", desc: "محاولة اختراق حقيقية لتطبيقك — نجد الثغرات قبل الهاكرز." },
      { title: "امتثال قانون البيانات المصري", desc: "قانون 151 لسنة 2020 لحماية البيانات الشخصية — نضمن امتثالك التام." },
      { title: "تقرير + خطة إصلاح", desc: "تقرير مفصّل بكل ثغرة + خطة إصلاح مرتبة حسب الأولوية." },
    ],
    deliverables: ["تقرير تدقيق", "خطة إصلاح", "إصلاح الثغرات الحرجة", "إعادة اختبار"],
    color: "from-teal-500/20 to-teal-500/5",
    accent: "text-teal-400",
    priceFrom: 22000,
  },
];

// ============================================================
// القوالب الجاهزة
// ============================================================
export interface Template {
  id: string;
  name: string;
  tag: string;
  category: "frontend" | "backend" | "fullstack";
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  rating: number;
  downloads: number;
  stack: string[];
  features: string[];
  description: string;
  gradient: string;
  popular?: boolean;
  license: "Personal" | "Commercial" | "Enterprise";
  lastUpdate: string;
  pages?: number;
}

export const TEMPLATES: Template[] = [
  {
    id: "nexus-dashboard-pro",
    name: "Nexus Dashboard Pro",
    tag: "لوحة تحكم SaaS متكاملة",
    category: "frontend",
    categoryLabel: "فرونت إند",
    price: 2500,
    oldPrice: 4000,
    rating: 4.9,
    downloads: 1240,
    stack: ["Next.js 16", "shadcn/ui", "Recharts", "TanStack Query"],
    features: ["+45 صفحة جاهزة", "وضع داكن/فاتح", "مصادقة كاملة", "RTL/LTR", "السلة المصرية"],
    description: "لوحة تحكم SaaS احترافية بـ 45 صفحة جاهزة: لوحة معلومات، مستخدمين، فواتير، تقارير، إعدادات. مدعومة بـ RTL كامل ومصممة خصيصاً للسوق المصري.",
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    popular: true,
    license: "Commercial",
    lastUpdate: "ديسمبر 2025",
    pages: 45,
  },
  {
    id: "atlas-commerce",
    name: "Atlas Commerce",
    tag: "متجر إلكتروني عالي التحويل",
    category: "fullstack",
    categoryLabel: "Full Stack",
    price: 4800,
    oldPrice: 7200,
    rating: 5.0,
    downloads: 870,
    stack: ["Next.js", "Prisma", "PayMob", "PostgreSQL"],
    features: ["سلة و checkout", "PayMob + Fawry", "COD جاهز", "لوحة تحكم", "ربط Bosta"],
    description: "متجر إلكتروني مصري متكامل مع بوابات دفع محلية (PayMob, Fawry, فودافون كاش), الدفع عند الاستلام, تكامل شركات شحن مصرية (Bosta, Mylerz), ولوحة تحكم احترافية.",
    gradient: "from-violet-500/30 via-purple-500/20 to-fuchsia-500/30",
    popular: true,
    license: "Commercial",
    lastUpdate: "ديسمبر 2025",
    pages: 32,
  },
  {
    id: "hermes-api-kit",
    name: "Hermes API Kit",
    tag: "هيكل API جاهز للإنتاج",
    category: "backend",
    categoryLabel: "باك إند",
    price: 3200,
    rating: 4.8,
    downloads: 640,
    stack: ["Node.js", "tRPC", "Prisma", "Redis", "Zod"],
    features: ["Auth + JWT", "Rate limiting", "Swagger docs", "Docker ready", "Tests جاهزة"],
    description: "هيكل باك إند كامل بـ Node.js + tRPC مع مصادقة JWT, Rate limiting لحماية الـ API, توثيق Swagger تلقائي, اختبارات شاملة, وجاهز للنشر على Docker.",
    gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/30",
    license: "Commercial",
    lastUpdate: "نوفمبر 2025",
  },
  {
    id: "pulse-mobile-app",
    name: "Pulse Mobile App",
    tag: "تطبيق موبايل OTP + Chat",
    category: "frontend",
    categoryLabel: "فرونت إند",
    price: 3800,
    oldPrice: 5400,
    rating: 4.9,
    downloads: 510,
    stack: ["React Native", "Expo", "AsyncStorage", "Reanimated"],
    features: ["Auth + OTP مصري", "Chat حي", "Push notifications", "iOS + Android"],
    description: "قالب تطبيق موبايل بـ React Native مع مصادقة OTP (يدعم أرقام مصرية +20), دردشة حية بـ Socket.io, إشعارات Push, وأنيميشن سلس بـ Reanimated.",
    gradient: "from-amber-500/30 via-orange-500/20 to-red-500/30",
    license: "Commercial",
    lastUpdate: "ديسمبر 2025",
    pages: 28,
  },
  {
    id: "vault-auth-backend",
    name: "Vault Auth Backend",
    tag: "خدمة مصادقة مستقلة",
    category: "backend",
    categoryLabel: "باك إند",
    price: 2200,
    rating: 4.7,
    downloads: 920,
    stack: ["Fastify", "PostgreSQL", "Redis", "BullMQ"],
    features: ["OAuth2 + SSO", "2FA", "Session/JWT", "Microservice"],
    description: "خدمة مصادقة Microservice مستقلة بـ Fastify, تدعم OAuth2, SSO, 2FA, JWT, Session management — جاهزة للدمج في أي نظام.",
    gradient: "from-rose-500/30 via-pink-500/20 to-purple-500/30",
    license: "Commercial",
    lastUpdate: "أكتوبر 2025",
  },
  {
    id: "orbit-landing-kit",
    name: "Orbit Landing Kit",
    tag: "صفحات هبوط + مواقع شركات",
    category: "frontend",
    categoryLabel: "فرونت إند",
    price: 1500,
    oldPrice: 2800,
    rating: 4.8,
    downloads: 1820,
    stack: ["Next.js", "Framer Motion", "TailwindCSS"],
    features: ["+12 layout جاهز", "أنميشن احترافي", "Blog MDX", "SEO جاهز", "RTL"],
    description: "مجموعة 12 صفحة هبوط + موقع شركة احترافي بأنيميشن Framer Motion, مدونة MDX, تحسين SEO كامل, ودعم RTL/LTR.",
    gradient: "from-teal-500/30 via-emerald-500/20 to-green-500/30",
    license: "Personal",
    lastUpdate: "ديسمبر 2025",
    pages: 12,
  },
  {
    id: "pharma-delivery",
    name: "Pharma Delivery",
    tag: "تطبيق توصيل صيدليات",
    category: "fullstack",
    categoryLabel: "Full Stack",
    price: 5500,
    oldPrice: 8000,
    rating: 5.0,
    downloads: 320,
    stack: ["Next.js", "React Native", "Prisma", "Maps"],
    features: ["تتبع حي", " خرائط Google", "لوحة صيدلي", "دفع متعدد"],
    description: "حل متكامل لتوصيل الأدوية من الصيدليات: تطبيق عميل (ويب + موبايل), لوحة صيدلي, نظام تتبع حي بـ Google Maps, ودعم جميع طرق الدفع المصرية.",
    gradient: "from-cyan-500/30 via-sky-500/20 to-blue-500/30",
    popular: true,
    license: "Enterprise",
    lastUpdate: "ديسمبر 2025",
    pages: 38,
  },
  {
    id: "restaurant-pos",
    name: "Restaurant POS",
    tag: "نظام نقاط بيع للمطاعم",
    category: "fullstack",
    categoryLabel: "Full Stack",
    price: 4200,
    rating: 4.8,
    downloads: 410,
    stack: ["Next.js", "Prisma", "Thermal Printer", "Offline-first"],
    features: ["POS offline-first", "طباعة حرارية", "إدارة طلبات", "تقارير مبيعات"],
    description: "نظام نقاط بيع متكامل للمطاعم المصرية: يعمل بدون إنترنت, يطبع على طابعات حرارية, يدير الطلبات والطاولات, ويصدّر تقارير مبيعات يومية/شهرية.",
    gradient: "from-orange-500/30 via-amber-500/20 to-yellow-500/30",
    license: "Commercial",
    lastUpdate: "نوفمبر 2025",
    pages: 24,
  },
];

// ============================================================
// منهجية العمل
// ============================================================
export const PROCESS_STEPS = [
  {
    n: "01",
    icon: Search,
    title: "اكتشاف وتحليل",
    desc: "نجلس معك، نفهم أهدافك، نحلل السوق المصري والمنافسين، ونرسم خريطة متطلبات دقيقة لوظائف المنتج وتجربة المستخدم.",
    deliverables: ["PRD تفصيلي", "تحليل المنافسين", "خارطة المستخدم"],
  },
  {
    n: "02",
    icon: PenTool,
    title: "تصميم واجهات ونماذج",
    desc: "نصمم تجربة المستخدم بصرياً عبر Figma، مع Design System متكامل ونماذج تفاعلية تتيح لك رؤية المنتج قبل كتابة سطر واحد.",
    deliverables: ["UI/UX في Figma", "Design System", "Prototype تفاعلي"],
  },
  {
    n: "03",
    icon: Code2,
    title: "تطوير واختبار",
    desc: "نكتب الكود بمعايير الإنتاج — Clean Code, TypeScript, اختبارات وحدة وتكامل، مع مراجعة كود ومراحل CI/CD آلية.",
    deliverables: ["Codebase نظيف", "Unit + E2E Tests", "Daily builds"],
  },
  {
    n: "04",
    icon: Rocket,
    title: "إطلاق ونشر",
    desc: "ننشر المنتج على البنية التحتية السحابية المناسبة، نضبط DNS/SSL/CDN، ونضمن جاهزية الإنتاج بأعلى معايير الأمان والأداء.",
    deliverables: ["Deployment كامل", "Domain + SSL", "Performance audit"],
  },
  {
    n: "05",
    icon: RefreshCw,
    title: "صيانة وتطوير مستمر",
    desc: "نراقب الأداء، نصلح الأعطال، نطلق تحسينات دورية، ونضيف ميزات جديدة بناءً على ملاحظات مستخدميك ومؤشرات النمو.",
    deliverables: ["Monitoring 24/7", "تحديثات دورية", "دعم فني مباشر"],
  },
];

// ============================================================
// التقنيات
// ============================================================
export const TECH_GROUPS = [
  {
    title: "الفرونت إند",
    icon: Layers,
    color: "text-emerald-400",
    items: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS 4", "shadcn/ui", "Framer Motion"],
  },
  {
    title: "الموبايل",
    icon: Atom,
    color: "text-sky-400",
    items: ["React Native", "Expo", "Reanimated", "Swift / Kotlin", "Notifications", "In-App Purchase"],
  },
  {
    title: "الباك إند",
    icon: Server,
    color: "text-violet-400",
    items: ["Node.js / Bun", "tRPC / GraphQL", "Prisma ORM", "Redis", "BullMQ", "WebSockets"],
  },
  {
    title: "قواعد البيانات",
    icon: Database,
    color: "text-amber-400",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "PlanetScale", "Elasticsearch"],
  },
  {
    title: "DevOps والسحابة",
    icon: Cloud,
    color: "text-pink-400",
    items: ["AWS", "Vercel", "Docker", "Kubernetes", "Cloudflare", "Terraform"],
  },
  {
    title: "الأمان والأداء",
    icon: ShieldCheck,
    color: "text-teal-400",
    items: ["OWASP", "JWT / OAuth2", "Rate Limiting", "CSP", "Sentry", "Lighthouse 100"],
  },
];

export const TECH_EXTRAS = [
  { icon: GitBranch, label: "Git Workflow" },
  { icon: Cpu, label: "Edge Computing" },
  { icon: Boxes, label: "Microservices" },
  { icon: Workflow, label: "CI/CD Pipelines" },
  { icon: Terminal, label: "CLI Tooling" },
  { icon: Zap, label: "Real-time Apps" },
];

// ============================================================
// الإحصائيات
// ============================================================
export const STATS = [
  { icon: Users, value: 87, suffix: "+", label: "عميل في مصر والخليج", color: "text-emerald-400" },
  { icon: FolderGit2, value: 124, suffix: "", label: "مشروع منجز بنجاح", color: "text-sky-400" },
  { icon: Code2, value: 45, suffix: "+", label: "قالب جاهز للبيع", color: "text-violet-400" },
  { icon: Award, value: 99, suffix: "%", label: "نسبة رضا العملاء", color: "text-amber-400" },
];

// ============================================================
// الأعمال (Portfolio)
// ============================================================
export interface Project {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  desc: string;
  metrics: { icon: LucideIcon; value: string; label: string }[];
  gradient: string;
  tags: string[];
  client: string;
  year: string;
  duration: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "finflow-banking",
    name: "FinFlow Banking",
    category: "Fintech / ويب",
    categoryKey: "fintech",
    desc: "منصة مصرفية رقمية متكاملة، محفظة، تحويلات فورية، بطاقات افتراضية، ولوحة تحكم تحليلية — مصممة للسوق المصري مع دعم إنستاباي والتحويلات بين البنوك.",
    metrics: [
      { icon: Users, value: "+250K", label: "مستخدم نشط" },
      { icon: TrendingUp, value: "+340%", label: "نمو الإيرادات" },
      { icon: Clock, value: "1.2s", label: "زمن الاستجابة" },
    ],
    gradient: "from-emerald-500/40 via-teal-500/30 to-cyan-500/40",
    tags: ["Next.js", "Prisma", "PostgreSQL", "إنستاباي"],
    client: "بنك رقمي ناشئ",
    year: "2025",
    duration: "8 أشهر",
    featured: true,
  },
  {
    id: "medbook-care",
    name: "MedBook Care",
    category: "Healthcare / موبايل",
    categoryKey: "healthcare",
    desc: "تطبيق حجز مواعيد عيادات، استشارات فيديو، ملفات طبية إلكترونية، وتذكيرات ذكية للمريض — مع دعم التأمين الصحي المصري.",
    metrics: [
      { icon: Users, value: "+80K", label: "تنزيل" },
      { icon: TrendingUp, value: "4.9★", label: "تقييم المتجر" },
      { icon: Clock, value: "2 أسابيع", label: "للنسخة الأولى" },
    ],
    gradient: "from-sky-500/40 via-blue-500/30 to-indigo-500/40",
    tags: ["React Native", "Expo", "tRPC", "WebRTC"],
    client: "سلسلة عيادات خاصة",
    year: "2025",
    duration: "5 أشهر",
    featured: true,
  },
  {
    id: "shopsphere",
    name: "ShopSphere",
    category: "E-commerce / ويب",
    categoryKey: "ecommerce",
    desc: "سوق متعدد البائعين بأكثر من 12 ألف منتج، نظام ولاء، فيد لا نهائي، وتجربة شراء سلسة — مع PayMob وفودافون كاش والدفع عند الاستلام.",
    metrics: [
      { icon: Users, value: "+500K", label: "زائر شهرياً" },
      { icon: TrendingUp, value: "+187%", label: "معدل التحويل" },
      { icon: Clock, value: "0.8s", label: "LCP" },
    ],
    gradient: "from-violet-500/40 via-purple-500/30 to-fuchsia-500/40",
    tags: ["Next.js", "Redis", "Elasticsearch", "PayMob"],
    client: "منصة تجارة إلكترونية",
    year: "2024",
    duration: "6 أشهر",
    featured: true,
  },
  {
    id: "learnhub-lms",
    name: "LearnHub LMS",
    category: "EdTech / Full Stack",
    categoryKey: "edtech",
    desc: "منصة تعلّم إلكتروني بمئات الكورسات، اختبارات تفاعلية، شهادات مكتملة، وتتبع تقدّم حي — مستخدمة في جامعات مصرية.",
    metrics: [
      { icon: Users, value: "+120K", label: "طالب" },
      { icon: TrendingUp, value: "+95%", label: "إكمال الكورسات" },
      { icon: Clock, value: "5 أيام", label: "MVP" },
    ],
    gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40",
    tags: ["Next.js", "Bun", "PostgreSQL", "Mux"],
    client: "منصة تعليمية",
    year: "2024",
    duration: "4 أشهر",
  },
  {
    id: "bosta-clone",
    name: "TrackFast Logistics",
    category: "Logistics / Full Stack",
    categoryKey: "logistics",
    desc: "نظام تتبع شحنات حي بـ Google Maps، إدارة مندوبين، تحسين مسارات، وتقارير أداء — مشابه لنموذج Bosta وMylerz.",
    metrics: [
      { icon: Users, value: "+15K", label: "مندوب" },
      { icon: TrendingUp, value: "-43%", label: "زمن التوصيل" },
      { icon: Clock, value: "0.5s", label: "تحديث الموقع" },
    ],
    gradient: "from-cyan-500/40 via-sky-500/30 to-blue-500/40",
    tags: ["Next.js", "Socket.io", "Redis", "Google Maps"],
    client: "شركة شحن مصرية",
    year: "2025",
    duration: "7 أشهر",
  },
  {
    id: "restaurant-pos",
    name: "QuickBite POS",
    category: "Restaurant / Full Stack",
    categoryKey: "restaurant",
    desc: "نظام نقاط بيع للمطاعم المصرية: offline-first, طباعة حرارية, إدارة طلبات وطاولات, وتقارير مبيعات يومية.",
    metrics: [
      { icon: Users, value: "+340", label: "مطعم" },
      { icon: TrendingUp, value: "4.8★", label: "رضا العملاء" },
      { icon: Clock, value: "100%", label: "Uptime" },
    ],
    gradient: "from-orange-500/40 via-amber-500/30 to-yellow-500/40",
    tags: ["Next.js", "Prisma", "Thermal Printer", "PWA"],
    client: "سلسلة مطاعم",
    year: "2024",
    duration: "3 أشهر",
  },
];

// ============================================================
// آراء العملاء (مصرية)
// ============================================================
export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  color: string;
  text: string;
  rating: number;
  city?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "أحمد الراشد",
    role: "الرئيس التنفيذي · FinFlow",
    avatar: "أ",
    color: "bg-emerald-500/20 text-emerald-400",
    text: "فريق نكسوس ديف لم يبنِ لنا تطبيقاً فقط، بل شريكاً استراتيجياً. البنك الرقمي الذي أطلقناه حقق نمواً 340% في 8 أشهر. احترافية نادرة واهتمام بأدق التفاصيل.",
    rating: 5,
    city: "القاهرة",
  },
  {
    name: "Sarah Mitchell",
    role: "CTO · ShopSphere",
    avatar: "S",
    color: "bg-violet-500/20 text-violet-400",
    text: "ما أدهشني هو الجمع بين السرعة والجودة. أطلقنا MVP خلال 5 أسابيع بكود نظيف وقابل للتوسع. بعد عام، مازلنا نبني على نفس البنية دون إعادة كتابة.",
    rating: 5,
    city: "الجيزة",
  },
  {
    name: "د. منى العتيبي",
    role: "مؤسِّسة · MedBook Care",
    avatar: "م",
    color: "bg-sky-500/20 text-sky-400",
    text: "كممارس طبي، كنت أبحث عن فريق يفهم حساسية القطاع الصحي. التزامهم بالأمان والخصوصية فاق توقعاتي. التطبيق حصل على تقييم 4.9 نجوم في أقل من شهرين.",
    rating: 5,
    city: "الإسكندرية",
  },
  {
    name: "م. كريم حسن",
    role: "Product Lead · LearnHub",
    avatar: "ك",
    color: "bg-amber-500/20 text-amber-400",
    text: "اشترينا قالب Atlas Commerce ووفّرنا 3 أشهر تطوير. التوثيق احترافي، الكود نظيف، والدعم بعد البيع ممتاز. تجربة شراء قوالب تستحق كل جنيه.",
    rating: 5,
    city: "القاهرة",
  },
  {
    name: "م. خالد المطيري",
    role: "مدير تقني · RetailX",
    avatar: "خ",
    color: "bg-pink-500/20 text-pink-400",
    text: "التعامل معهم مختلف. يجلسون معك، يفهمون تحدياتك، ثم يقترحون حلولاً لم تفكر فيها. انتهينا من مشروع ERP داخلي بأنظف بنية رأيتها في حياتي المهنية.",
    rating: 5,
    city: "الجيزة",
  },
  {
    name: "Elena Rodriguez",
    role: "Founder · PulseFit",
    avatar: "E",
    color: "bg-teal-500/20 text-teal-400",
    text: "تطبيق الموبايل الذي طوروه فاق المنافسين في الأداء. Reanimated animations سلسة، Push notifications موثوقة، وحجم التطبيق صغير. فريق يستحق كل ثقة.",
    rating: 5,
    city: "القاهرة الجديدة",
  },
];

// ============================================================
// الباقات
// ============================================================
export interface Plan {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  price: number;
  priceUSD: number;
  period: string;
  color: string;
  accent: string;
  border: string;
  popular?: boolean;
  features: string[];
  excluded: string[];
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    icon: Rocket,
    name: "Starter",
    tagline: "للمشاريع الناشئة وMVP",
    price: 60000,
    priceUSD: 1900,
    period: "/ مشروع",
    color: "from-sky-500/15 to-sky-500/5",
    accent: "text-sky-400",
    border: "border-white/10",
    features: [
      "تطبيق ويب حتى 8 صفحات",
      "تصميم UI/UX احترافي",
      "Backend + قاعدة بيانات",
      "مصادقة + لوحة تحكم",
      "نشر على Vercel/Netlify",
      "30 يوم دعم فني",
      "كود مصدري كامل",
      "فاتورة ضريبية رسمية",
    ],
    excluded: ["تطبيق موبايل", "DevOps مخصص", "صيانة شهرية"],
  },
  {
    id: "growth",
    icon: Building2,
    name: "Growth",
    tagline: "الأكثر اختياراً للشركات",
    price: 155000,
    priceUSD: 4900,
    period: "/ مشروع",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    border: "border-primary/40",
    popular: true,
    features: [
      "تطبيق ويب كامل + API",
      "تطبيق موبايل (iOS/Android)",
      "تصميم UX متقدم + Design System",
      "Backend متعدد الخدمات",
      "PayMob + Fawry + COD",
      "نشر سحابي + CI/CD",
      "اختبارات E2E شاملة",
      "90 يوم دعم فني",
      "توثيق كامل + تدريب",
      "ربط شركات شحن مصرية",
    ],
    excluded: ["بنية K8s مخصصة"],
  },
  {
    id: "enterprise",
    icon: Sparkles,
    name: "Enterprise",
    tagline: "للحلول الكبيرة والمعقدة",
    price: 0, // "حسب الطلب"
    priceUSD: 0,
    period: "",
    color: "from-violet-500/15 to-violet-500/5",
    accent: "text-violet-400",
    border: "border-white/10",
    features: [
      "حلول مخصصة بالكامل",
      "بنية Microservices + K8s",
      "تكامل أنظمة Legacy",
      "أمان + OWASP Audit",
      "SLA 99.99% uptime",
      "فريق مخصص",
      "صيانة شهرية مستمرة",
      "استشارات استراتيجية",
      "دعم 24/7 أولوية",
      "امتثال قانون البيانات",
    ],
    excluded: [],
  },
];

// ============================================================
// الأسئلة الشائعة
// ============================================================
export const FAQS = [
  {
    q: "كم يستغرق إنجاز مشروع متكامل؟",
    a: "يعتمد ذلك على نطاق المشروع وتعقيده. بشكل عام: MVP في 4-6 أسابيع، تطبيق ويب متكامل في 8-12 أسبوع، ومنصة كبيرة متعددة الخدمات في 4-6 أشهر. نزوّدك بجدول زمني مفصّل بعد جلسة الاكتشاف الأولى مع مواعيد واضحة لكل مرحلة.",
  },
  {
    q: "هل أحصل على كود المصدر الكامل؟",
    a: "نعم، بالتأكيد. جميع مشاريعنا تشمل كود المصدر الكامل بمستودع Git خاص بك، التوثيق الفني، تعليقات على الكود، وحقوق ملكية فكرية كاملة. لا نحبسك معنا — الكود ملكك من اليوم الأول.",
  },
  {
    q: "هل توفّرون فاتورة ضريبية رسمية؟",
    a: "نعم، نحن شركة مصرية مسجّلة رسمياً بالضرائب، ونوفّر فاتورة ضريبية إلكترونية معتمدة لكل مشروع. هذا مهم للشركات المصرية التي تحتاج لخصم الضريبة. الرقم الضريبي لدينا: 300-123-456.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نوفّر جميع طرق الدفع المصرية: فودافون كاش، إنستاباي، فوري، أمان، فيزا/ماستركارد، وتحويل بنكي بحساب تجاري. للمشاريع الكبيرة، نقسّم الدفع على مراحل: 30% دفعة أولى، 40% عند منتصف المشروع، 30% عند التسليم.",
  },
  {
    q: "هل تتعاملون مع المشاريع الحكومية؟",
    a: "نعم، لدينا خبرة في التعامل مع الجهات الحكومية المصرية ونتوافق مع متطلبات الأمان الحكومية ومعايير ITIDA. كما نوفّر المستندات القانونية المطلوبة (سجل تجاري، بطاقة ضريبية، تعهّد رسمي).",
  },
  {
    q: "كيف تتعاملون مع خصوصية وأمان البيانات؟",
    a: "الأمان أولوية قصوى. نتبع معايير OWASP Top 10، نطبّق تشفير البيانات، نستخدم مصادقة قوية (2FA, OAuth2)، ونجري اختبارات اختراق دورية. نلتزم بقانون حماية البيانات الشخصية المصري (قانون 151 لسنة 2020)، ونوقّع NDA قبل بدء أي مشروع.",
  },
  {
    q: "هل القوالب الجاهزة تدعم التخصيص؟",
    a: "بالتأكيد. كل قالب مبني ليكون مرناً: متغيرات ألوان وخطوط، مكونات قابلة للتركيب، بنية مجلدات واضحة، وتوثيق شامل. إذا احتجت تخصيصاً أعمق، فريقنا متاح لتنفيذه مقابل رسوم منفصلة.",
  },
  {
    q: "هل تعملون مع عملاء خارج مصر؟",
    a: "نعم، عملاؤنا من مصر ودول الخليج (السعودية، الإمارات، الكويت). فريقنا متعدد اللغات (عربي، إنجليزي)، نتعامل بالتوقيتات التي تناسبك، ونتقيد باتفاقيات قانونية واضحة. لدينا خبرة في التعامل مع متطلبات الأسواق الخليجية.",
  },
];

// ============================================================
// قيم الشركة
// ============================================================
export const COMPANY_VALUES = [
  {
    icon: ShieldCheck,
    title: "الشفافية المطلقة",
    desc: "لا مفاجآت في الأسعار أو المواعيد. كل شيء موثّق في عقد واضح، وكل مرحلة تمر بمراجعتك قبل الانتقال.",
    color: "text-emerald-400",
  },
  {
    icon: Cpu,
    title: "التقنية المتقدمة",
    desc: "نستخدم أحدث التقنيات العالمية مع تكييفها للسوق المصري — لا حلول قديمة ولا قوالب جامدة.",
    color: "text-sky-400",
  },
  {
    icon: Users,
    title: "شراكة لا علاقة",
    desc: "لا نتعامل معك كعميل بل كشريك. نجاحك هو نجاحنا، ونحرص على علاقة طويلة الأمد.",
    color: "text-violet-400",
  },
  {
    icon: Zap,
    title: "السرعة المسؤولة",
    desc: "ننفّذ بسرعة دون التضحية بالجودة. منهجية Agile تضمن رؤية تقدّم أسبوعي ونتائج سريعة.",
    color: "text-amber-400",
  },
];

// ============================================================
// فريق العمل (موجز)
// ============================================================
export const TEAM = [
  { name: "م. أحمد سمير", role: "المؤسس · رئيس تنفيذي", avatar: "أ", bio: "15+ سنة في هندسة البرمجيات, عمل سابقاً في Google وAmazon", color: "bg-emerald-500/20 text-emerald-400" },
  { name: "م. سارة منصور", role: "نائب الرئيس · الهندسة", avatar: "س", bio: "خبيرة React وNext.js, متحدثة في مؤتمرات JavaScript", color: "bg-sky-500/20 text-sky-400" },
  { name: "م. عمر خالد", role: "مدير قسم الموبايل", avatar: "ع", bio: "خبير React Native, أصدر 30+ تطبيق على المتاجر", color: "bg-violet-500/20 text-violet-400" },
  { name: "أ. ندى يوسف", role: "مديرة التصميم", avatar: "ن", bio: "خبيرة UX Research, ماجستير من AUC", color: "bg-pink-500/20 text-pink-400" },
];

// ============================================================
// التحقق من السعر - تنسيق العملة المصرية
// ============================================================
export function formatEGP(price: number): string {
  if (price === 0) return "حسب الطلب";
  return new Intl.NumberFormat("ar-EG", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
}

// ============================================================
// المدوّنة التقنية (مقالات للسوق المصري)
// ============================================================
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "web" | "mobile" | "business" | "trends" | "tutorials";
  categoryLabel: string;
  author: string;
  date: string;
  readingTime: number;
  tags: string[];
  gradient: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nextjs-16-egypt-market",
    title: "لماذا Next.js 16 هو المستقبل لتطبيقات الويب في مصر؟",
    excerpt: "دليل شامل لأهم ميزات Next.js 16 وكيف تُساعد الشركات المصرية على بناء تطبيقات أسرع وأكثر موثوقية مع تكلفة أقل.",
    category: "trends",
    categoryLabel: "اتجاهات",
    author: "م. أحمد سمير",
    date: "2026-01-15",
    readingTime: 8,
    tags: ["Next.js", "React", "أداء", "SEO"],
    gradient: "from-emerald-500/40 via-teal-500/30 to-cyan-500/40",
    featured: true,
    content: `
Next.js 16 ليس مجرد تحديث — بل قفزة نوعية في طريقة بناء تطبيقات الويب. للمطورين والشركات في مصر، هذا الإصدار يقدّم فرصاً حقيقية لتقليل التكلفة وزيادة الأداء.

## أهم الميزات الجديدة

### 1. Turbopack المستقر
أخيراً Turbopack أصبح مستقراً للإنتاج. سرعة build أسرع بـ 10x من Webpack — هذا يعني توفير ساعات أسبوعياً في فريق التطوير.

### 2. App Router محسّن
App Router أصبح أكثر نضجاً مع تحسينات في Server Components وStreaming. للشركات المصرية، هذا يعني تطبيقات أسرع وتجربة مستخدم أفضل.

### 3. تحسين Core Web Vitals
الإصدار 16 يأتي بتحسينات تلقائية في Core Web Vitals — مهم جداً لأن Google يفضّل المواقع السريعة في نتائج البحث.

## لماذا هذا مهم للسوق المصري؟

السوق المصري له خصائص فريدة:
- **أغلبية تستخدم الموبايل** (75%+ من حركة المرور)
- **إنترنت بطيء في مناطق كثيرة** — الأداء ليس رفاهية
- **تكلفة البيانات مرتفعة** — التطبيقات الأخف أفضل
- **منافسة شديدة في SEO** — الترتيب في Google حاسم

Next.js 16 يلبي كل هذه التحديات بفعالية.

## كيف نطبّقه في نكسوس ديف؟

نحن نستخدم Next.js 16 في كل مشاريعنا الجديدة منذ إطلاقه. النتائج مبهرة:
- متوسط تحسين LCP من 2.8s إلى 1.1s
- تقليل حجم JavaScript بنسبة 40%
- تحسين معدل التحويل بنسبة 23% في متاجر التجارة الإلكترونية

## خلاصة

إذا كنت تفكر في بناء تطبيق ويب جديد في مصر، Next.js 16 هو الخيار الأمثل. تواصل معنا لمعرفة كيف يمكننا مساعدتك.
    `,
  },
  {
    slug: "vodafone-cash-integration-guide",
    title: "دمج فودافون كاش في متجرك الإلكتروني: دليل كامل",
    excerpt: "شرح خطوة بخطوة لدمج فودافون كاش عبر PayMob في متجرك الإلكتروني مع أمثلة كود حقيقية.",
    category: "tutorials",
    categoryLabel: "شروحات",
    author: "م. سارة منصور",
    date: "2026-01-10",
    readingTime: 12,
    tags: ["PayMob", "فودافون كاش", "تجارة إلكترونية", "دفع"],
    gradient: "from-red-500/40 via-orange-500/30 to-amber-500/40",
    featured: true,
    content: `
فودافون كاش هو أكثر وسيلة دفع إلكترونية شعبية في مصر مع أكثر من 30 مليون مستخدم. دمجه في متجرك يزيد معدل التحويل بشكل كبير.

## لماذا فودافون كاش؟

- **30+ مليون مستخدم** في مصر
- **انتشار واسع** خاصة في المناطق التي لا تغطيها البنوك
- **سرعة المعاملات** — فورية
- **ثقة المستخدمين** — مفهوم ومألوف

## المتطلبات

1. حساب تجاري على PayMob
2. مستندات الشركة (سجل تجاري + بطاقة ضريبية)
3. رقم فودافون كاش مرتبط بحسابك البنكي

## خطوات الدمج

### 1. الحصول على API Keys
سجّل في PayMob واحصل على:
- API Key
- Integration ID لفودافون كاش

### 2. تثبيت SDK
\`\`\`bash
npm install @paymob/accept-sdk-node
\`\`\`

### 3. كود الدمج
سننشئ endpoint لبدء عملية الدفع:

\`\`\`typescript
// app/api/payment/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { amount, items, customer } = await req.json();

  // مصادقة مع PayMob
  const authResponse = await fetch('https://accept.paymob.com/api/auth/tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
  });
  const { token } = await authResponse.json();

  // إنشاء الطلب
  // ... باقي الكود
}
\`\`\`

## أفضل الممارسات

- اعرض فودافون كاش كخيار أول — المستخدمون يثقون به
- استخدم webhook للتأكد من نجاح الدفع
- اعرض رسالة واضحة بالعربية أثناء عملية الدفع
- اختبر في sandbox قبل النشر

## خلاصة

دمج فودافون كاش ليس معقّداً مع PayMob. الفوائد تستحق الجهد — سترى زيادة فورية في معدل التحويل.
    `,
  },
  {
    slug: "react-native-vs-flutter-egypt",
    title: "React Native أم Flutter؟ أيهما أفضل لمشروعك في مصر؟",
    excerpt: "مقارنة شاملة بين React Native وFlutter من منظور السوق المصري — الأداء، التكلفة، التوظيف، والمستقبل.",
    category: "mobile",
    categoryLabel: "تطبيقات",
    author: "م. عمر خالد",
    date: "2026-01-05",
    readingTime: 10,
    tags: ["React Native", "Flutter", "موبايل", "مقارنة"],
    gradient: "from-sky-500/40 via-blue-500/30 to-indigo-500/40",
    content: `
سؤال يتكرر من كل عميل: هل نبني تطبيق الموبايل بـ React Native أم Flutter؟ الإجابة تعتمد على عوامل كثيرة، خاصة في السوق المصري.

## المعايير الأساسية

### الأداء
- **Flutter**: أداء ممتاز بفضل Dart وrendering engine خاص
- **React Native**: أداء جيد مع إمكانية استخدام مكونات أصلية

### تجربة المطور
- **Flutter**: Hot reload ممتاز، أدوات قوية
- **React Native**: Hot reload جيد، أكبر مجتمع

## السوق المصري تحديداً

### 1. توفر المطورين
في مصر، مطوّرو React/JavaScript أكثر بكثير من مطوّري Dart/Flutter. هذا يعني:
- **أسهل في التوظيف** React Native
- **تكلفة أقل** للفريق
- **استبدال أسرع** لأي عضو يغادر

### 2. التكلفة
React Native أرخص في مصر بسبب توفر المطورين. Flutter يتطلب تدريباً إضافياً.

### 3. المشاريع الحكومية
بعض الجهات المصرية تفضّل Flutter — لكن هذا يتغيّر تدريجياً.

## متى تختار React Native؟

✅ لديك فريق ويب React
✅ تريد مشاركة كود بين الويب والموبايل
✅ تحتاج توظيف سريع
✅ ميزانية محدودة

## متى تختار Flutter؟

✅ تطبيق بأداء عالٍ جداً (ألعاب بسيطة، رسوم متحركة معقّدة)
✅ فريق جديد بلا خبرة سابقة في React
✅ تحتاج UI مخصّص جداً

## خلاصة

لأغلب الشركات المصرية، React Native هو الخيار الأفضل — خصوصاً إذا كان لديك وجود ويب. تواصل معنا لاختيار التقنية المناسبة لمشروعك.
    `,
  },
  {
    slug: "seo-egypt-google-ranking",
    title: "SEO في مصر: كيف تتصدّر نتائج Google في 2026؟",
    excerpt: "استراتيجيات SEO عملية ومُختبرة للسوق المصري — من الكلمات المفتاحية إلى Core Web Vitals.",
    category: "business",
    categoryLabel: "أعمال",
    author: "أ. ندى يوسف",
    date: "2025-12-28",
    readingTime: 9,
    tags: ["SEO", "Google", "تسويق", "أعمال"],
    gradient: "from-violet-500/40 via-purple-500/30 to-fuchsia-500/40",
    content: `
SEO ليس خياراً في مصر — بل ضرورة. مع منافسة متزايدة كل عام، الظهور في الصفحة الأولى من Google يفرّق بين نجاح وفشل الأعمال.

## الوضع الحالي للـ SEO في مصر

- **75% من المصريين** يبحثون في Google قبل الشراء
- **92% لا يتجاوزون** الصفحة الأولى
- **الكلمات العربية** منافسة أقل من الإنجليزية
- **المحتوى المحلي** نادر — فرصة كبيرة

## ركائز SEO الأساسية

### 1. الكلمات المفتاحية المحلية
ابحث عن كلمات مصرية حقيقية:
- "أفضل شركة برمجة في مصر" (منافسة متوسطة)
- "تطبيق توصيل أدوية" (منافسة منخفضة)
- "متجر إلكتروني فودافون كاش" (فرصة)

استخدم Google Keyword Planner أو Ubersuggest.

### 2. Core Web Vitals
Google يهتم بسرعة موقعك:
- **LCP** < 2.5 ثانية
- **FID** < 100 مللي ثانية
- **CLS** < 0.1

استخدم Next.js لتحقيق هذه الأرقام تلقائياً.

### 3. المحتوى العربي
- اكتب بالفصحى مع لمسة لهجة مصرية
- استخدم Long-form content (1500+ كلمة)
- حدّث المحتوى دورياً

## استراتيجيات متقدمة

### Schema Markup
أضف Structured Data لمساعدة Google على فهم موقعك:
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NEXUS DEV",
  "address": {...},
  "telephone": "+20-100-123-4567"
}
\`\`\`

### Google My Business
سجّل شركتك على Google My Business — مهم جداً للبحث المحلي في مصر.

### Backlinks محلية
احصل على روابط من مواقع مصرية موثوقة:
- مدونات تقنية مصرية
- غرف تجارية
- مؤتمرات محلية

## خلاصة

SEO استثمار طويل الأمد. ابدأ الآن وستجني النتائج بعد 3-6 أشهر. تواصل معنا للحصول على استشارة SEO مجانية.
    `,
  },
  {
    slug: "startup-mvp-egypt-guide",
    title: "بناء MVP ناجح في مصر: من الفكرة للإطلاق في 6 أسابيع",
    excerpt: "دليل عملي لرواد الأعمال المصريين — كيف تبني MVP بتكلفة معقولة وتختبر فكرتك في السوق بسرعة.",
    category: "business",
    categoryLabel: "أعمال",
    author: "م. أحمد سمير",
    date: "2025-12-20",
    readingTime: 11,
    tags: ["MVP", "Startups", "ريادة أعمال", "أعمال"],
    gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40",
    content: `
MVP (Minimum Viable Product) هو نسخة مبسّطة من منتجك تحمل الميزات الأساسية فقط. للرواد المصريين، MVP هو الطريق الأسرع لاختبار الفكرة دون إفلاس.

## لماذا MVP مهم في مصر؟

- **ميزانية محدودة** لمعظم الرواد
- **مخاطر عالية** — السوق متقلّب
- **منافسة شديدة** — السرعة حاسمة
- **مستثمرون حذرون** — يريدون إثباتات

## خطوات بناء MVP في 6 أسابيع

### الأسبوع 1-2: التخطيط
- حدّد المشكلة بدقة
- ابحث عن المنافسين
- حدّد الميزات الأساسية (5-7 ميزات كحد أقصى)
- ارسم wireframes بسيطة

### الأسبوع 3-4: التصميم والتطوير
- صمّم UI بسيط في Figma
- استخدم قالب جاهز لتوفير الوقت
- ركّز على الوظائف الأساسية فقط
- لا تتعمّق في التحسينات

### الأسبوع 5: الاختبار
- اختبر مع 10-20 مستخدم حقيقي
- اجمع feedback منظّم
- أصلح الأخطاء الحرجة فقط

### الأسبوع 6: الإطلاق
- انشر على Vercel/Netlify
- أعلن في مجتمعاتك
- تابع المقاييس الأساسية

## التكلفة المتوقّعة

| البند | التكلفة (ج.م) |
|------|-------------|
| التصميم | 8,000 - 15,000 |
| التطوير | 25,000 - 45,000 |
| النشر والاستضافة | 2,000 - 5,000 |
| التسويق الأولي | 5,000 - 10,000 |
| **الإجمالي** | **40,000 - 75,000** |

## الأخطاء الشائعة

❌ **الإفراط في الميزات** — أضف فقط ما تحتاجه فعلاً
❌ **تجاهل الـ feedback** — استمع لعملائك
❌ **الانتظار للكمال** — الإطلاق بأقل من المثالي
❌ **التجاهل التقني** — استخدم تقنيات حديثة

## مقاييس النجاح

ركّز على هذه المقاييس:
- **MAU** (Monthly Active Users)
- **Retention Rate** (بعد 7 و30 يوم)
- **CAC** (Customer Acquisition Cost)
- **NPS** (Net Promoter Score)

## خلاصة

MVP ليس منتجاً ناقصاً — بل أداة تعلّم. ابنيه بسرعة، اختبره، ثم طوّره. تواصل معنا لبدء MVPك.
    `,
  },
  {
    slug: "egypt-data-protection-law",
    title: "قانون حماية البيانات المصري (151/2020): ما يجب على مطوّري الويب معرفته",
    excerpt: "شرح مبسّط لقانون حماية البيانات الشخصية المصري وكيفية الامتثال له في تطبيقاتك.",
    category: "business",
    categoryLabel: "أعمال",
    author: "م. أحمد سمير",
    date: "2025-12-15",
    readingTime: 7,
    tags: ["قانون", "خصوصية", "أمان", "امتثال"],
    gradient: "from-teal-500/40 via-emerald-500/30 to-green-500/40",
    content: `
قانون 151 لسنة 2020 لحماية البيانات الشخصية أصبح واقعاً في مصر. كل شركة تطوير ويب يجب أن تفهمه وتلتزم به.

## ما هو القانون؟

يهدف القانون إلى حماية البيانات الشخصية للأفراد في مصر، مشابه لـ GDPR الأوروبي لكن بخصوصيات مصرية.

## من يشمله؟

- **أي شركة** تجمع بيانات شخصية لمصريين
- **المواقع الإلكترونية** حتى الأجنبية التي تستهدف مصريين
- **التطبيقات** على المتاجر

## الالتزامات الأساسية

### 1. الموافقة الصريحة
- الحصول على موافقة واضحة قبل جمع البيانات
- شرح كيف ستُستخدم البيانات
- إمكانية سحب الموافقة

### 2. سياسة الخصوصية
- صفحة واضحة بسياسة الخصوصية
- باللغة العربية
- تشرح ما收集 ومتى ولماذا

### 3. حقوق الأفراد
- حق الوصول للبيانات
- حق التعديل
- حق الحذف
- حق نقل البيانات

### 4. الأمان
- تشفير البيانات الحساسة
- حماية من الاختراق
- إبلاغ في حالة خرق البيانات

## كيف نمتثل في نكسوس ديف؟

1. **سياسة خصوصية واضحة** بالعربية
2. **موافقة صريحة** قبل جمع أي بيانات
3. **تشفير كامل** للبيانات الحساسة
4. **نسخ احتياطية** آمنة
5. **تدريب الفريق** على القانون
6. **مراجعة دورية** للامتثال

## العقوبات

عدم الامتثال قد يؤدي إلى:
- غرامات مالية كبيرة
- إيقاف الخدمة
- مسؤولية جنائية في حالات معيّنة

## خلاصة

القانون ليس عبئاً — بل فرصة لبناء ثقة مع عملائك. الامتثال يحمي شركتك ويعزّز سمعتها.
    `,
  },
];

// ============================================================
// لماذا تختارنا (مميزات تنافسية)
// ============================================================
export const WHY_US = [
  {
    icon: MapPin,
    title: "مقرّنا في القاهرة",
    desc: "نعمل في نفس توقيتك، نفهم سوقك، ونلتقي بك وجهاً لوجه عند الحاجة.",
    color: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    title: "فاتورة ضريبية رسمية",
    desc: "شركة مسجّلة رسمياً — كل مدفوعاتك موثّقة بفاتورة ضريبية معتمدة.",
    color: "text-sky-400",
  },
  {
    icon: Zap,
    title: "ردّ خلال 24 ساعة",
    desc: "نحترم وقتك — نردّ على كل استفسار خلال يوم عمل واحد كحد أقصى.",
    color: "text-violet-400",
  },
  {
    icon: Users,
    title: "فريق عربي أصيل",
    desc: "مهندسون مصريون يفهمون اللهجة والثقافة — لا حواجز لغوية أو ثقافية.",
    color: "text-amber-400",
  },
];

// ============================================================
// روابط مفيدة
// ============================================================
export const LEGAL_LINKS = [
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "شروط الخدمة", href: "/terms" },
  { label: "سياسة الاسترجاع", href: "/refund" },
];

