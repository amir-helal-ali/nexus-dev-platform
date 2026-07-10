import Link from "next/link";
import PageLayout from "@/components/site/page-layout";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import { PROJECTS } from "@/lib/data/content";
import { ArrowUpLeft, Users, Calendar, Building2 } from "lucide-react";

export const metadata = {
  title: "أعمالنا | NEXUS DEV",
  description: "مشاريع حقيقية نفذناها لعملاء في مصر والخليج — تطبيقات ويب وموبايل، منصات تجارة إلكترونية، حلول fintech.",
};

export default function PortfolioPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <PageLayout
      title="أعمالنا المختارة"
      subtitle="نفتخر بكل مشروع أنجزناه. هذه نماذج من منتجات نفذناها لعملاء في مصر ودول الخليج — بأرقام تتحدث عن نفسها، وقصص نجاح حقيقية."
      breadcrumb={[{ label: "أعمالنا" }]}
      background="subtle"
    >
      {/* Featured projects */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-white/10" />
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
              مشاريع مميّزة
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {featured.map((p) => (
              <article
                key={p.id}
                id={p.id}
                className="group relative glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 scroll-mt-32"
              >
                {/* Cover */}
                <div className={`relative h-56 lg:h-64 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <div className="absolute inset-8 glass-strong rounded-2xl p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="h-2 w-20 bg-white/15 rounded" />
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      <div className="col-span-1 space-y-1.5">
                        <div className="h-2 bg-white/15 rounded" />
                        <div className="h-2 bg-white/15 rounded w-3/4" />
                        <div className="h-2 bg-white/15 rounded w-2/3" />
                        <div className="h-2 bg-white/15 rounded w-1/2" />
                      </div>
                      <div className="col-span-3 space-y-1.5">
                        <div className="h-6 bg-primary/30 rounded" />
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="h-10 bg-white/10 rounded" />
                          <div className="h-10 bg-white/10 rounded" />
                          <div className="h-10 bg-white/10 rounded" />
                        </div>
                        <div className="h-2 bg-white/10 rounded w-2/3" />
                        <div className="h-2 bg-white/10 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg">
                    مميّز
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    {p.category}
                  </span>
                  <h2 className="text-2xl font-extrabold mt-1 mb-3">{p.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5 pb-5 border-b border-white/8">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-primary" />
                      {p.client}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {p.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {p.duration}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
                        <m.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-lg font-extrabold">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/8 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="py-12 lg:py-16 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-white/10" />
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground">
              مشاريع أخرى
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((p) => (
              <article
                key={p.id}
                id={p.id}
                className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 scroll-mt-32"
              >
                <div className={`relative h-36 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <div className="absolute inset-4 glass-strong rounded-lg p-2.5 flex flex-col gap-1.5">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-1">
                      <div className="bg-white/10 rounded" />
                      <div className="col-span-2 space-y-1">
                        <div className="h-1.5 bg-white/15 rounded w-full" />
                        <div className="h-1.5 bg-white/15 rounded w-2/3" />
                        <div className="h-3 bg-primary/30 rounded w-1/3 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-2">{p.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </PageLayout>
  );
}
