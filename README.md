# 🚀 NEXUS DEV — منصة هندسة برمجيات للسوق المصري

<div dir="rtl">

منصة متكاملة لشركة برمجيات مصرية متخصصة في تطوير تطبيقات الويب والجوال وبيع القوالب الجاهزة، مع نظام مصادقة احترافي، محادثة لحظية (WebSocket + SSE)، ولوحة إدارة كاملة.

## ✨ المميزات الرئيسية

### 🌐 الموقع العام (14 صفحة)
- الصفحة الرئيسية (لاندينج مركّز)
- الخدمات (`/services`) — 6 خدمات تفصيلية
- سوق القوالب (`/templates`) + صفحة قالب مفرد (`/templates/[id]`)
- الأعمال (`/portfolio`) — مشاريع مصرية حقيقية
- الباقات (`/pricing`) — بالجنيه المصري
- المدوّنة (`/blog`) + مقال مفرد (`/blog/[slug]`)
- من نحن (`/about`)
- تواصل معنا (`/contact`)
- صفحات قانونية: سياسة الخصوصية، شروط الخدمة، سياسة الاسترجاع
- صفحة 404 مخصّصة

### 🔐 نظام المصادقة
- **NextAuth.js v4** مع Credentials Provider
- **JWT sessions** (30 يوم)
- **bcryptjs** لتشفير كلمات المرور
- **Role-based access control** (user, admin)
- صفحات تسجيل دخول/إنشاء حساب بتصميم احترافي
- حماية صفحات `/admin` على مستوى الـ layout

### 💬 المحادثة اللحظية (WebSocket + SSE)
- **WebSocket** للاتصال ثنائي الاتجاه (typing indicators, presence)
- **SSE (Server-Sent Events)** لدفع الرسائل والإشعارات من الخادم
- ❌ **لا polling** — اعتماد كامل على WebSocket + SSE
- إشعارات لحظية في الـ Navbar و AdminShell
- شارات رسائل غير مقروءة
- typing indicators مع auto-clear
- مؤشر "متصل الآن"
- 3 أنواع محادثات: طلب مشروع، استشارة، دعم فني

### 🛠️ لوحة الإدارة الكاملة (`/admin`)
- **Dashboard**: إحصائيات + أحدث الطلبات والمستخدمين
- **إدارة المحادثات** (`/admin/chats`): ردّ لحظي على العملاء
- **إدارة طلبات التواصل** (`/admin/requests`): تغيير الحالة/الأولوية + بدء محادثة مباشرة
- **إدارة المستخدمين** (`/admin/users`): بحث وفلترة

### 🇪🇬 تخصيص السوق المصري
- العملة: الجنيه المصري (ج.م) بالأرقام العربية
- طرق دفع مصرية: فودافون كاش، إنستاباي، فوري، أمان، PayMob, Fawry
- عنوان القاهرة + هاتف مصري (+20)
- فاتورة ضريبية رسمية + سجل تجاري
- امتثال قانون 151/2020 لحماية البيانات
- شركات شحن مصرية: Bosta, Mylerz
- علم مصر 🇪🇬 في الهوية البصرية
- دعم RTL كامل

## 🛠️ التقنيات المستخدمة

| الفئة | التقنية |
|------|---------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Prisma ORM + SQLite |
| Auth | NextAuth.js v4 + bcryptjs |
| Real-time | Socket.IO (WebSocket) + SSE |
| UI Animation | Framer Motion |
| Icons | Lucide React |
| State | React Query + Zustand |

## 📁 بنية المشروع

```
nexus-dev/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # الرئيسية
│   │   ├── login/              # تسجيل الدخول
│   │   ├── register/           # إنشاء حساب
│   │   ├── chat/               # محادثة المستخدم
│   │   ├── admin/              # لوحة الإدارة
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── chats/          # إدارة المحادثات
│   │   │   ├── requests/       # طلبات التواصل
│   │   │   └── users/          # المستخدمون
│   │   ├── services/           # الخدمات
│   │   ├── templates/          # القوالب + [id]
│   │   ├── portfolio/          # الأعمال
│   │   ├── pricing/            # الباقات
│   │   ├── about/              # من نحن
│   │   ├── contact/            # تواصل
│   │   ├── blog/               # المدوّنة + [slug]
│   │   ├── privacy/ terms/ refund/
│   │   └── api/                # API Routes
│   │       ├── auth/           # NextAuth + register
│   │       ├── conversations/  # + stream (SSE)
│   │       ├── notifications/  # + stream (SSE)
│   │       ├── contact/
│   │       └── admin/          # stats, requests, users
│   ├── components/
│   │   ├── site/               # navbar, footer, page-layout
│   │   ├── sections/           # hero, services, templates, ...
│   │   ├── admin/              # admin-shell
│   │   ├── providers.tsx       # SessionProvider
│   │   └── ui/                 # shadcn/ui
│   ├── hooks/
│   │   ├── use-chat.ts         # WebSocket + SSE chat hook
│   │   └── use-notifications.ts # SSE notifications hook
│   ├── lib/
│   │   ├── auth.ts             # NextAuth config
│   │   ├── db.ts               # Prisma client
│   │   ├── utils.ts
│   │   └── data/content.ts     # بيانات المنصة المركزية
│   └── app/globals.css
├── prisma/
│   └── schema.prisma           # 8 models
├── mini-services/
│   └── chat-service/           # WebSocket service (port 3003)
├── scripts/
│   └── seed-admin.ts           # إنشاء أدمن تجريبي
├── public/
└── package.json
```

## 🚀 التشغيل المحلي

### المتطلبات
- Node.js 18+ أو Bun
- npm / yarn / pnpm / bun

### الخطوات

```bash
# 1. تثبيت الاعتمادات
bun install
cd mini-services/chat-service && bun install && cd ../..

# 2. إعداد متغيرات البيئة
cp .env.example .env
# عدّل القيم في .env

# 3. إعداد قاعدة البيانات
bun run db:push

# 4. إنشاء أدمن تجريبي
bun run scripts/seed-admin.ts
# admin@nexusdev.eg / Admin@2026

# 5. تشغيل خدمة WebSocket
cd mini-services/chat-service && bun run dev &
cd ../..

# 6. تشغيل المنصة
bun run dev
```

افتح `http://localhost:3000`

## 🔑 حسابات تجريبية

| الدور | البريد | كلمة المرور |
|------|--------|-------------|
| أدمن | `admin@nexusdev.eg` | `Admin@2026` |
| مستخدم | سجّل من `/register` | — |

## 📊 قاعدة البيانات (Prisma)

8 models كاملة:
- **User** — مع role, isActive, lastLoginAt, passwordHash
- **Account, Session, VerificationToken** — NextAuth.js
- **Conversation** — مع type, status, priority, unreadByUser, unreadByAdmin
- **Message** — مع type, isRead, readAt
- **ContactRequest** — مع requestId فريد (NXS-XXXX), status, priority
- **Notification** — إشعارات للرسائل والطلبات

## 🔌 API Routes

### المصادقة
- `POST /api/auth/register` — تسجيل مستخدم جديد
- `GET/POST /api/auth/[...nextauth]` — NextAuth handler

### المحادثات
- `GET/POST /api/conversations` — قائمة + إنشاء
- `GET/PATCH /api/conversations/[id]` — تفاصيل + تحديث
- `POST /api/conversations/[id]/messages` — إرسال رسالة
- `GET /api/conversations/stream` — **SSE stream** للرسائل والتحديثات

### الإشعارات
- `GET /api/notifications/stream` — **SSE stream** للإشعارات

### الأدمن
- `GET /api/admin/stats` — إحصائيات
- `GET /api/admin/requests` — قائمة الطلبات
- `PATCH/DELETE /api/admin/requests/[id]` — تحديث/حذف
- `GET /api/admin/users` — قائمة المستخدمين

### التواصل
- `POST /api/contact` — استقبال طلبات التواصل

## 🎨 التصميم

- **Tech Noir Dark Theme** — احترافي ومركّز
- **Cairo** للعربية + **JetBrains Mono** للأكواد
- **Glass morphism** + Aurora blobs
- دعم RTL كامل
- متجاوب بالكامل (390px → 1920px+)
- Framer Motion animations

## 📝 الترخيص

MIT License — استخدم بحرية

## 🤝 المساهمة

المساهمات مرحّب بها! افتح issue أو pull request.

---

<div align="center">

**صُنع في القاهرة بشغف هندسي 🇪🇬**

</div>

</div>
