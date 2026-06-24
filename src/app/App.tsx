import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import joaoFoto from "./assets/foto_joao.jpeg";
import nayaraFoto from "./assets/NayaraFoto.jpeg";
import heroBg from "./assets/Korefudoverde.jpg";
const GREEN = "#177c1f";
const BLUE = "#013e58";

// Reusable animated section reveal
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Marquee scrolling text
function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const items = Array(8).fill(text);
  return (
    <div className="overflow-hidden py-6 border-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-5xl tracking-widest flex items-center gap-12" style={{ fontFamily: "'Anton', sans-serif" }}>
            {t}
            <span style={{ color: GREEN }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Stagger children wrapper
function StaggerContainer({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Big text split animation
function SplitText({ text, className = "", style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <motion.p
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
//----- TIME_________________________________
const TEAM = [
  {
    id: 1,
    name: "Nayara Almeida",
    role: "Direção Criativa e Estratégia Digital",
    img: nayaraFoto,
    short: "Responsável por transformar ideias em conexões reais, unindo criatividade e estratégia para fortalecer marcas no ambiente digital",
    full: "Responsável por transformar ideias em conexões reais, unindo criatividade e estratégia para fortalecer marcas no ambiente digital. Atua no planejamento, desenvolvimento de conteúdo e construção de experiências que refletem a essência de cada projeto de forma autêntica e relevante.",
    accentColor: GREEN,
  },
  {
    id: 2,
    name: "João Vitor Rosado",
    role: "Analista de Tecnologia e Soluções Digitais",
    img: joaoFoto,
    short: "Formado em Sistemas de Informação e profissional da área de tecnologia, com experiência em análise de dados e desenvolvimento web",
    full: "Sou formado em Sistemas de Informação e possuo experiência profissional na área de tecnologia, com atuação em análise de dados e desenvolvimento de soluções digitais. Tenho experiência em desenvolvimento full stack, criação de landing pages, análise de dados, banco de dados e ferramentas de Business Intelligence. Busco unir design, tecnologia e estratégia para desenvolver páginas profissionais, rápidas e eficientes. Meu objetivo é transformar ideias em soluções digitais que transmitam credibilidade, fortaleçam a presença online de empresas e proporcionem uma excelente experiência aos usuários.",
    accentColor: BLUE,
  },
];

function TeamModal({ person, onClose }: { person: typeof TEAM[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="relative z-10 w-full max-w-2xl overflow-hidden"
          style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="h-1 w-full" style={{ background: person.accentColor }} />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(245,245,240,0.6)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = person.accentColor; e.currentTarget.style.color = person.accentColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(245,245,240,0.6)"; }}
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-56 shrink-0" style={{ aspectRatio: "3/4", maxHeight: "320px" }}>
              <img src={person.img} alt={person.name} className="w-full h-full object-cover" style={{ maxHeight: "320px" }} />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest block mb-3" style={{ fontFamily: "'DM Mono', monospace", color: person.accentColor, letterSpacing: "0.2em" }}>
                {person.role}
              </span>
              <h3 className="font-display uppercase mb-5" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1, color: "#f5f5f0" }}>
                {person.name}
              </h3>
              <p className="leading-relaxed" style={{ color: "rgba(245,245,240,0.65)", fontSize: "0.95rem" }}>
                {person.full}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TeamSection() {
  const [selected, setSelected] = useState<typeof TEAM[0] | null>(null);

  return (
    <>
      <section className="py-28 px-6 md:px-16 max-w-screen-xl mx-auto">
        <Reveal>
          <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
            — Equipe
          </span>
        </Reveal>
        <Reveal>
          <h2 className="font-display uppercase mb-16" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1, color: "#f5f5f0" }}>
            Quem Somos Nós
          </h2>
        </Reveal>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.08)" } as React.CSSProperties}>
          {TEAM.map((person) => (
            <StaggerItem key={person.id}>
              <motion.div
                className="group cursor-pointer overflow-hidden"
                style={{ background: "#0d0d0d" }}
                onClick={() => setSelected(person)}
                whileHover="hover"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <motion.img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover object-center"
                    variants={{ hover: { scale: 1.05 } }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(5,5,5,0.55)" }}
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="px-6 py-3 text-xs uppercase tracking-widest font-bold"
                      style={{ fontFamily: "'DM Mono', monospace", background: person.accentColor, color: person.accentColor === GREEN ? "#050505" : "#f5f5f0", letterSpacing: "0.2em" }}
                    >
                      Ver mais →
                    </span>
                  </motion.div>
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: person.accentColor }} />
                </div>
                <div className="p-8">
                  <span className="text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "'DM Mono', monospace", color: person.accentColor, letterSpacing: "0.2em" }}>
                    {person.role}
                  </span>
                  <h3 className="font-display uppercase mb-4" style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1, color: "#f5f5f0" }}>
                    {person.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,240,0.55)" }}>
                    {person.short}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      {selected && <TeamModal person={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── Hero configuração da tela inicial do site────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <img
          src={heroBg}
          alt="Estúdio de design criativo"
          className="w-full h-full object-cover"
        />
       // Depois
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(5,5,5,0) 10%, rgba(5,5,5,0.95) 80%)" }} />
      </motion.div>

      {/* Logo & headline */}
      <motion.div className="relative z-10 text-center px-6" style={{ opacity }}>
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-8 flex justify-center"
        >
          <div className="w-28 h-28 border-2 flex items-center justify-center" style={{ background: BLUE }}>
            <span className="font-display text-5xl" style={{ fontFamily: "'Anton', sans-serif", color: "#f5f5f0" }}>K</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-display uppercase tracking-tight"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.9, color: "#f5f5f0" }}
        >
          KORE<span style={{ color: GREEN }}>.</span>
          <br />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 tracking-widest uppercase text-sm"
          style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.55)", letterSpacing: "0.25em" }}
        >
          Landing Pages · Identidade Visual · Presença Digital
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#contato"
            className="inline-block px-10 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: BLUE,
              color: "#f5f5f0",
              letterSpacing: "0.2em",
            }}
          >
            Começar agora
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.4)", letterSpacing: "0.2em" }}>
          role
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: BLUE }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ─── Manifesto ───────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="py-36 px-6 md:px-16 max-w-screen-xl mx-auto">
      <Reveal direction="left">
        <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
          — Manifesto
        </span>
      </Reveal>

      <SplitText
        text="Sua marca não pode ser invisível. Cada pixel conta. Cada scroll importa."
        className="font-display uppercase"
        style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(1.0rem, 2vw, 2rem)", lineHeight: 1, color: "#f5f5f0" } as React.CSSProperties}
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
        <Reveal delay={0.1}>
          <p className="leading-relaxed" style={{ color: "rgba(245,245,240,0.6)", fontSize: "1.1rem" }}>
            Construímos landing pages que convertem e identidades visuais que grudam na memória. Sem template genérico. Sem meio-termo.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="leading-relaxed" style={{ color: "rgba(245,245,240,0.6)", fontSize: "1.1rem" }}>
            Do briefing ao ar, entregamos uma presença digital que faz o cliente parar, olhar, e tomar uma decisão.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      num: "01",
      title: "Landing Pages",
      desc: "Páginas focadas em conversão, com copy estratégico, designe performance rápida. Feitas para transformar visitante em cliente.",
      items: ["Design responsivo", "Copy estratégico", "SEO on-page", "Integração com CRM", "Entrega em 7 dias"],
    },
    {
      num: "02",
      title: "Identidade Visual",
      desc: "Logo, paleta, tipografia, aplicações. Tudo que você precisa para existir com consistência em qualquer superfície, digital ou física.",
      items: ["Logo + variações", "Manual de marca", "Paleta cromática", "Tipografia", "Assets digitais"],
    },
    {
      num: "03",
      title: "Presença Completa",
      desc: "O combo que traz coerência total: identidade visual + landing page + materiais de divulgação. Uma marca do zero ao ar.",
      items: ["Tudo dos pacotes 01 e 02", "Posts para redes sociais", "Stories templates", "Prioridade de atendimento"],
    },
  ];

  return (
    <section className="py-28 px-6 md:px-16 max-w-screen-xl mx-auto">
      <Reveal>
        <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
          — O que fazemos
        </span>
      </Reveal>

      <Reveal>
        <h2
          className="font-display uppercase mb-20"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1, color: "#f5f5f0" }}
        >
          Serviços
        </h2>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" } as React.CSSProperties}>
        {services.map((s) => (
          <StaggerItem key={s.num}>
            <motion.div
              className="p-10 h-full group cursor-default"
              style={{ background: "#0d0d0d" }}
              whileHover={{ background: "#111" }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <span className="font-mono-label text-xs" style={{ fontFamily: "'DM Mono', monospace", color: GREEN }}>
                  {s.num}
                </span>
              </div>
              <h3
                className="font-display uppercase mb-6"
                style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1, color: "#f5f5f0" }}
              >
                {s.title}
              </h3>
              <p className="mb-8 leading-relaxed" style={{ color: "rgba(245,245,240,0.55)", fontSize: "0.95rem" }}>
                {s.desc}
              </p>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(245,245,240,0.7)" }}>
                    <span style={{ color: GREEN, fontSize: "0.5rem" }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ─── Big Number Stats ─────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { num: "120+", label: "Projetos entregues" },
    { num: "98%", label: "Clientes satisfeitos" },
    { num: "7d", label: "Tempo médio de entrega" },
    { num: "3x", label: "Média de aumento em conversão" },
  ];

  return (
    <section className="py-24" style={{ background: BLUE }}>
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/20">
        {stats.map((s) => (
          <StaggerItem key={s.num}>
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <span
                className="font-display"
                style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1, color: "#f5f5f0" }}
              >
                {s.num}
              </span>
              <span className="mt-3 text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace", color: "#f5f5f0", letterSpacing: "0.15em" }}>
                {s.label}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ─── Work Grid ───────────────────────────────────────────────────────────────
function Work() {
  const projects = [
    {
      img: "https://images.unsplash.com/photo-1645658043538-fc2bb1702cfe?w=800&h=600&fit=crop&auto=format",
      category: "Identidade Visual",
      title: "Marca Editorial",
      year: "2024",
    },
    {
      img: "https://images.unsplash.com/photo-1590102426275-8d1c367070d3?w=800&h=600&fit=crop&auto=format",
      category: "Landing Page",
      title: "Consultoria Financeira",
      year: "2024",
    },
    {
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop&auto=format",
      category: "Presença Completa",
      title: "SaaS B2B",
      year: "2025",
    },
    {
      img: "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?w=800&h=600&fit=crop&auto=format",
      category: "Landing Page",
      title: "Infoproduto Premium",
      year: "2025",
    },
  ];

  return (
    <section className="py-28 px-6 md:px-16 max-w-screen-xl mx-auto">
      <Reveal>
        <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
          — Portfólio
        </span>
      </Reveal>
      <Reveal>
        <h2
          className="font-display uppercase mb-20"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1, color: "#f5f5f0" }}
        >
          Trabalhos selecionados
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
            <motion.div
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/3", background: "#111" }}
              whileHover="hover"
            >
              <motion.img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-8"
                style={{ background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)" }}
              >
                <motion.div
                  variants={{ hover: { y: 0, opacity: 1 } }}
                  initial={{ y: 10, opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.2em" }}>
                    {p.category} · {p.year}
                  </span>
                  <h3
                    className="font-display uppercase"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#f5f5f0" }}
                  >
                    {p.title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── processos - como funciona ─────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: "01", title: "Briefing", desc: "Um formulário direto + call de 30 min para entender profundamente sua marca, público e objetivos." },
    { n: "02", title: "Estratégia", desc: "Definimos posicionamento, estrutura de página e referências visuais. Você aprova antes de começarmos." },
    { n: "03", title: "Design", desc: "Criamos as peças com atenção obsessiva a cada detalhe. Duas rodadas de revisão inclusas." },
    { n: "04", title: "Entrega", desc: "Você recebe os arquivos finais e o projeto publicado — pronto para converter." },
  ];

  return (
    <section className="py-28" style={{ background: "#0d0d0d" }}>
      <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
        <Reveal>
          <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
            — Como funciona
          </span>
        </Reveal>
        <Reveal>
          <h2
            className="font-display uppercase mb-20"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1, color: "#f5f5f0" }}
          >
            Processo
          </h2>
        </Reveal>

        {/*Responsavel por configurar numeros do COMO FUNCIONA*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} direction="up">
              <div className="p-10" style={{ background: "#0d0d0d" }}>
                <div
                  className="font-display w-12 h-12 flex items-center justify-center mb-8 text-sm"
                  style={{ fontFamily: "'DM Mono', monospace", border: `1px solid ${GREEN}`, color: GREEN }}
                >
                  {s.n}
                </div>
                <h3
                  className="font-display uppercase mb-4"
                  style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.6rem", lineHeight: 1, color: "#f5f5f0" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,240,0.55)" }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Full-width CTA Banner ────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="relative overflow-hidden py-32 px-6" style={{ background: "#050505" }}>
      {/* Background giant text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display uppercase whitespace-nowrap"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "20vw",
            lineHeight: 1,
            color: "rgba(0,230,77,0.04)",
            letterSpacing: "-0.02em",
          }}
        >
          KORE
        </span>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <SplitText
          text="Pronto para ter uma marca que faz barulho?"
          className="font-display uppercase"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.2rem, 3.0vw, 3.0rem)", lineHeight: 1, color: "#f5f5f0" } as React.CSSProperties}
        />
        <Reveal delay={0.3}>
          <a
            href="#contato"
            className="mt-12 inline-block px-14 py-5 uppercase tracking-widest text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: GREEN,
              color: "#050505",
              letterSpacing: "0.2em",
              boxShadow: `0 0 60px ${GREEN}33`,
            }}
          >
            Falar com a equipe →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", empresa: "", servico: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  }

  return (
    <section id="contato" className="py-28" style={{ background: "#0d0d0d" }}>
      <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <Reveal>
              <span className="font-mono-label text-xs tracking-widest uppercase mb-6 block" style={{ fontFamily: "'DM Mono', monospace", color: GREEN, letterSpacing: "0.25em" }}>
                — Entre em contato
              </span>
            </Reveal>
            <SplitText
              text="Vamos construir algo incrível juntos."
              className="font-display uppercase"
              style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1, color: "#f5f5f0" } as React.CSSProperties}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 leading-relaxed" style={{ color: "rgba(245,245,240,0.55)", fontSize: "1rem" }}>
                Preencha o formulário e um membro da nossa equipe entra em contato em até 24h. Sem enrolação, sem proposta genérica.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 space-y-4">
                {[
                  { label: "Email", val: "oi@verdestudio.com.br" },
                  { label: "WhatsApp", val: "+55 11 99999-0000" },
                  { label: "Instagram", val: "@verdestudio" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-xs w-24 shrink-0" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.4)", letterSpacing: "0.1em" }}>
                      {c.label}
                    </span>
                    <span className="text-sm" style={{ color: "#f5f5f0" }}>{c.val}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Form */}
          <Reveal direction="right" delay={0.1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-6 p-12"
                  style={{ border: `1px solid ${GREEN}` }}
                >
                  <div className="w-16 h-16 flex items-center justify-center" style={{ background: GREEN }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display uppercase" style={{ fontFamily: "'Anton', sans-serif", fontSize: "2rem", color: "#f5f5f0" }}>
                    Mensagem enviada!
                  </h3>
                  <p style={{ color: "rgba(245,245,240,0.55)" }}>Nossa equipe entra em contato em breve.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: "nome", label: "Nome completo", type: "text", placeholder: "João Silva" },
                    { name: "email", label: "Email", type: "email", placeholder: "joao@empresa.com" },
                    { name: "empresa", label: "Empresa / Projeto", type: "text", placeholder: "Minha Empresa" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.5)", letterSpacing: "0.15em" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-transparent outline-none transition-colors focus:border-b-2"
                        style={{
                          background: "#1a1a1a",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f5f5f0",
                          fontSize: "0.95rem",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = GREEN)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.5)", letterSpacing: "0.15em" }}>
                      Serviço de interesse
                    </label>
                    <select
                      name="servico"
                      required
                      value={form.servico}
                      onChange={handleChange}
                      className="w-full px-4 py-3 outline-none transition-colors"
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: form.servico ? "#f5f5f0" : "rgba(245,245,240,0.35)",
                        fontSize: "0.95rem",
                      }}
                    >
                      <option value="" disabled>Selecionar...</option>
                      <option value="landing">Landing Page</option>
                      <option value="visual">Identidade Visual</option>
                      <option value="completo">Presença Completa</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.5)", letterSpacing: "0.15em" }}>
                      Mensagem
                    </label>
                    <textarea
                      name="mensagem"
                      required
                      placeholder="Conte um pouco sobre seu projeto..."
                      rows={4}
                      value={form.mensagem}
                      onChange={handleChange}
                      className="w-full px-4 py-3 outline-none resize-none transition-colors"
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f5f5f0",
                        fontSize: "0.95rem",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      background: loading ? "rgba(0,230,77,0.6)" : GREEN,
                      color: "#050505",
                      letterSpacing: "0.2em",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Enviando..." : "Enviar mensagem →"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 md:px-16 py-12" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: BLUE }}>
            <span className="font-display" style={{ fontFamily: "'Anton', sans-serif", color: "#f5f5f0", fontSize: "1rem" }}>K</span>
          </div>
          <span className="font-display uppercase tracking-wider" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.1rem", color: "#f5f5f0" }}>
            KORE
          </span>
        </div>

        <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.3)", letterSpacing: "0.1em" }}>
          © 2026 KORE Studio · Todos os direitos reservados
        </span>

        <div className="flex gap-6">
          {["Instagram", "Behance", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs uppercase tracking-widest transition-colors hover:text-primary"
              style={{ fontFamily: "'DM Mono', monospace", color: "rgba(245,245,240,0.4)", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,240,0.4)")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#050505", color: "#f5f5f0" }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Hero />
      <Marquee text="LANDING PAGES · IDENTIDADE VISUAL · PRESENÇA DIGITAL" />
      <Manifesto />
      <TeamSection />
      <Services />
      <Marquee text="DESIGN · ESTRATÉGIA · CONVERSÃO · MARCA · IMPACTO" reverse />
      <Stats />
      <Work />
      <Process />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}
