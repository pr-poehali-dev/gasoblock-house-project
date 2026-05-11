import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/bae8b394-b764-4a82-b30e-675424263613/files/d70e887b-2ce3-4938-9acf-1ccaa875ebe8.jpg";
const HOUSE_IMG = "https://cdn.poehali.dev/projects/bae8b394-b764-4a82-b30e-675424263613/files/9af1c949-40b8-4ba1-9673-6e277c3e4dd7.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/bae8b394-b764-4a82-b30e-675424263613/files/2d729afc-0d38-4511-9f82-0e497823fc28.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Этапы", href: "#stages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Home", title: "Дома под ключ", desc: "Полный цикл строительства от фундамента до финишной отделки" },
  { icon: "Building2", title: "Проектирование", desc: "Архитектурные и конструктивные решения под ваши задачи" },
  { icon: "Layers", title: "Фундамент", desc: "Любые типы фундаментов: свайный, монолитный, ленточный" },
  { icon: "Hammer", title: "Каркасные дома", desc: "Быстрое возведение каркасных домов с гарантией 10 лет" },
  { icon: "Brick", title: "Кирпичное строительство", desc: "Классические кирпичные дома с высокими теплохарактеристиками" },
  { icon: "Wrench", title: "Ремонт и реконструкция", desc: "Модернизация существующих строений любой сложности" },
];

const PORTFOLIO = [
  { title: "Коттедж «Лесной»", area: "180 м²", type: "Каркасный", price: "от 4.8 млн ₽", img: HOUSE_IMG },
  { title: "Усадьба «Балтийская»", area: "240 м²", type: "Кирпичный", price: "от 8.2 млн ₽", img: HERO_IMG },
  { title: "Дача «Янтарная»", area: "120 м²", type: "Газобетон", price: "от 2.9 млн ₽", img: TEAM_IMG },
  { title: "Дом «Дюны»", area: "300 м²", type: "Монолит", price: "от 12 млн ₽", img: HOUSE_IMG },
];

const STAGES = [
  { num: "01", title: "Консультация", desc: "Бесплатная встреча, обсуждение проекта, оценка участка" },
  { num: "02", title: "Проектирование", desc: "Разработка архитектурного проекта и смет" },
  { num: "03", title: "Договор", desc: "Фиксируем стоимость и сроки — без скрытых доплат" },
  { num: "04", title: "Строительство", desc: "Возводим дом под контролем прорабов и инженеров" },
  { num: "05", title: "Сдача", desc: "Принимаете готовый дом, подписываем акт, получаете ключи" },
];

const REVIEWS = [
  {
    name: "Алексей В.",
    text: "Строили дом 180 м² за 6 месяцев. Всё чётко по договору, ни одной доплаты. Рекомендую всем.",
    stars: 5,
    date: "Январь 2025",
  },
  {
    name: "Ирина М.",
    text: "Долго выбирали компанию. Малахит предложил лучший проект и честную цену. Живём уже второй год — всё отлично!",
    stars: 5,
    date: "Март 2025",
  },
  {
    name: "Дмитрий К.",
    text: "Профессиональный подход, грамотные инженеры. Сроки соблюдены. Качество строительства на высоте.",
    stars: 5,
    date: "Декабрь 2024",
  },
];

const HOUSE_TYPES = ["Каркасный", "Газобетон", "Кирпичный", "Монолитный"];
const MATERIALS = ["Эконом", "Стандарт", "Комфорт", "Премиум"];
const FLOORS = ["1 этаж", "2 этажа", "3 этажа"];

const BASE_PRICE: Record<string, number> = {
  Каркасный: 18000,
  Газобетон: 25000,
  Кирпичный: 35000,
  Монолитный: 45000,
};

const MATERIAL_COEFF: Record<string, number> = {
  Эконом: 1.0,
  Стандарт: 1.3,
  Комфорт: 1.6,
  Премиум: 2.1,
};

const FLOOR_COEFF: Record<string, number> = {
  "1 этаж": 1.0,
  "2 этажа": 1.15,
  "3 этажа": 1.28,
};

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [houseType, setHouseType] = useState("Газобетон");
  const [area, setArea] = useState(120);
  const [material, setMaterial] = useState("Стандарт");
  const [floors, setFloors] = useState("1 этаж");

  const totalPrice = Math.round(
    (BASE_PRICE[houseType] * MATERIAL_COEFF[material] * FLOOR_COEFF[floors] * area) / 1000
  ) * 1000;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "hsl(210,15%,10%)", color: "#fff", minHeight: "100vh", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.3s",
          background: scrolled ? "hsla(210,15%,8%,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("#hero")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <img src="https://cdn.poehali.dev/projects/bae8b394-b764-4a82-b30e-675424263613/bucket/9f20fcc7-f298-4d47-a46d-b2a3afbf6ff3.jpg" alt="СК МАЛАХИТ 39" style={{ height: 40, width: "auto", objectFit: "contain" }} />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 14 }}>
              СК МАЛАХИТ 39
            </span>
          </button>

          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 32 }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
            <a href="tel:+79622674779" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontFamily: "'Golos Text', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
              <Icon name="Phone" size={15} />
              +7 962 267 47-79
            </a>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a href="https://vk.com/malahite39" target="_blank" rel="noopener noreferrer" title="ВКонтакте" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0077FF")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.983 4 8.593c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.736c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/></svg>
              </a>
              <a href="https://t.me/maksnt" target="_blank" rel="noopener noreferrer" title="Telegram" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#29a9eb")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.67l-2.94-.918c-.64-.203-.654-.64.136-.954l11.5-4.432c.533-.194 1.003.131.828.855z"/></svg>
              </a>
              <a href="https://wa.me/79622674779" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#25D366")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://max.ru/call/+79622674779" target="_blank" rel="noopener noreferrer" title="MAX" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", transition: "background 0.2s", overflow: "hidden" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
                <img src="https://cdn.poehali.dev/projects/bae8b394-b764-4a82-b30e-675424263613/bucket/0de2256d-6fa0-4614-8c97-adf57e1ec943.jpg" alt="MAX" style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 4 }} />
              </a>
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "hsl(210,15%,8%)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {item.label}
              </button>
            ))}
            <a href="tel:+79622674779" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <Icon name="Phone" size={14} /> +7 962 267 47-79
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, hsla(210,15%,5%,0.9) 0%, hsla(210,15%,5%,0.65) 60%, hsla(152,48%,18%,0.25) 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "128px 24px 80px" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 2, marginBottom: 32, border: "1px solid hsl(152,48%,28%)", color: "hsl(152,45%,60%)", background: "hsla(152,48%,15%,0.3)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(152,48%,50%)" }}></span>
              Строительная компания · Калининград
            </div>

            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.05, marginBottom: 24, fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#fff" }}>
              Строим дома,<br />
              <span style={{ color: "hsl(152,48%,52%)" }}>которые живут</span><br />
              десятилетиями
            </h1>

            <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Golos Text', sans-serif", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>
              Полный цикл строительства — от проекта до ключей. Фиксированная цена в договоре. Средний срок — 180 дней.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <button
                onClick={() => scrollTo("#contacts")}
                style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13, padding: "16px 32px", borderRadius: 2, border: "none", cursor: "pointer", background: "hsl(152,48%,28%)", color: "#fff", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(152,45%,35%)")}
                onMouseLeave={e => (e.currentTarget.style.background = "hsl(152,48%,28%)")}
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("#calc")}
                style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13, padding: "16px 32px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.8)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              >
                Рассчитать стоимость
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { num: "15+", label: "лет на рынке" },
                { num: "380+", label: "домов сдано" },
                { num: "180", label: "дней средний срок" },
                { num: "100%", label: "фиксированная цена" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.8rem", color: "hsl(152,48%,52%)" }}>{s.num}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Golos Text', sans-serif", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 0", background: "hsl(210,12%,13%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 64, alignItems: "center" }}>
            <AnimSection>
              <div style={{ position: "relative" }}>
                <img src={TEAM_IMG} alt="Наша команда" style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 2 }} />
                <div style={{ position: "absolute", bottom: -24, right: -24, padding: 24, borderRadius: 2, background: "hsl(152,48%,28%)" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>15+</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "'Golos Text', sans-serif" }}>лет опыта</div>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>О компании</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "2.2rem", color: "#fff", marginBottom: 24, lineHeight: 1.15 }}>
                СК Малахит — надёжность в каждом кирпиче
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Golos Text', sans-serif", lineHeight: 1.75, marginBottom: 20, fontSize: 15 }}>
                Мы строим частные дома в Калининграде и области с 2009 года. За это время сдали более 380 объектов и ни разу не вышли за рамки согласованного бюджета.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Golos Text', sans-serif", lineHeight: 1.75, marginBottom: 32, fontSize: 15 }}>
                Мы несём финансовую ответственность за качество и сроки. Стоимость фиксируется в договоре — никаких дополнительных счетов в процессе строительства.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "ShieldCheck", text: "Гарантия 10 лет" },
                  { icon: "FileText", text: "Договор с ценой" },
                  { icon: "Clock", text: "Сроки по договору" },
                  { icon: "Users", text: "Свои бригады" },
                ].map((f) => (
                  <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "hsla(152,48%,28%,0.15)", border: "1px solid hsl(152,48%,28%)" }}>
                      <Icon name={f.icon} size={16} style={{ color: "hsl(152,48%,52%)" }} />
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Golos Text', sans-serif", fontSize: 14 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "96px 0", background: "hsl(210,15%,10%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Что мы делаем</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff" }}>Наши услуги</h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {SERVICES.map((s) => (
              <AnimSection key={s.title}>
                <div
                  style={{ padding: 28, borderRadius: 2, border: "1px solid rgba(255,255,255,0.05)", background: "hsl(210,12%,13%)", cursor: "pointer", transition: "border-color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(46,139,87,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, background: "hsla(152,48%,28%,0.15)", border: "1px solid hsla(152,48%,28%,0.3)" }}>
                    <Icon name={s.icon} size={22} style={{ color: "hsl(152,48%,52%)" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Golos Text', sans-serif", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" style={{ padding: "96px 0", background: "hsl(210,12%,13%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Онлайн расчёт</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff", marginBottom: 16 }}>Калькулятор стоимости</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Golos Text', sans-serif", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>Укажите параметры дома и получите предварительную оценку. Точная стоимость — после консультации с нашим инженером.</p>
            </div>
          </AnimSection>

          <AnimSection>
            <div style={{ borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)", padding: "48px", background: "hsl(210,15%,10%)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {/* House type */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Тип дома</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {HOUSE_TYPES.map((t) => (
                        <button key={t} onClick={() => setHouseType(t)} style={{ padding: "10px 16px", borderRadius: 2, fontSize: 14, fontFamily: "'Golos Text', sans-serif", cursor: "pointer", border: "1px solid", transition: "all 0.2s", ...(houseType === t ? { background: "hsl(152,48%,28%)", borderColor: "hsl(152,48%,28%)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }) }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Floors */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Этажность</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {FLOORS.map((f) => (
                        <button key={f} onClick={() => setFloors(f)} style={{ padding: "10px 8px", borderRadius: 2, fontSize: 13, fontFamily: "'Golos Text', sans-serif", cursor: "pointer", border: "1px solid", transition: "all 0.2s", ...(floors === f ? { background: "hsl(152,48%,28%)", borderColor: "hsl(152,48%,28%)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }) }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Класс отделки</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {MATERIALS.map((m) => (
                        <button key={m} onClick={() => setMaterial(m)} style={{ padding: "10px 16px", borderRadius: 2, fontSize: 14, fontFamily: "'Golos Text', sans-serif", cursor: "pointer", border: "1px solid", transition: "all 0.2s", ...(material === m ? { background: "hsl(152,48%,28%)", borderColor: "hsl(152,48%,28%)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }) }}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                      Площадь: <span style={{ color: "#fff" }}>{area} м²</span>
                    </label>
                    <input
                      type="range" min={60} max={500} step={10} value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      style={{ width: "100%", cursor: "pointer", accentColor: "hsl(152,48%,28%)" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "'Golos Text', sans-serif", marginTop: 4 }}>
                      <span>60 м²</span><span>500 м²</span>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ borderRadius: 2, padding: 32, flex: 1, background: "hsl(210,12%,16%)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Примерная стоимость</div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: "#fff", fontSize: "2.6rem", lineHeight: 1, marginBottom: 8 }}>
                      от {(totalPrice / 1000000).toFixed(1)} млн ₽
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Golos Text', sans-serif", fontSize: 14, marginBottom: 24 }}>
                      {(totalPrice / area).toLocaleString("ru")} ₽ за м²
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        ["Тип", houseType],
                        ["Площадь", `${area} м²`],
                        ["Этажность", floors],
                        ["Отделка", material],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontFamily: "'Golos Text', sans-serif" }}>
                          <span style={{ color: "rgba(255,255,255,0.4)" }}>{k}</span>
                          <span style={{ color: "rgba(255,255,255,0.8)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => scrollTo("#contacts")}
                    style={{ padding: "16px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13, color: "#fff", borderRadius: 2, border: "none", cursor: "pointer", background: "hsl(152,48%,28%)", transition: "all 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "hsl(152,45%,35%)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "hsl(152,48%,28%)")}
                  >
                    Уточнить у инженера
                  </button>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "96px 0", background: "hsl(210,15%,10%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <div style={{ marginBottom: 64 }}>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Наши объекты</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff" }}>Портфолио</h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {PORTFOLIO.map((p) => (
              <AnimSection key={p.title}>
                <div style={{ position: "relative", borderRadius: 2, overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.transform = "scale(1.06)"; }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if(img) img.style.transform = "scale(1)"; }}
                >
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: 260, objectFit: "cover", transition: "transform 0.5s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,17,22,0.95) 0%, rgba(12,17,22,0.15) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 }}>
                    <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{p.type}</div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, color: "#fff", textTransform: "uppercase" }}>{p.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Golos Text', sans-serif" }}>{p.area}</span>
                      <span style={{ fontSize: 13, fontFamily: "'Golos Text', sans-serif", color: "rgba(255,255,255,0.8)" }}>{p.price}</span>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" style={{ padding: "96px 0", background: "hsl(210,12%,13%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Как мы работаем</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff" }}>Этапы работы</h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, position: "relative" }}>
            {STAGES.map((s) => (
              <AnimSection key={s.num}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 4, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(152,48%,28%)", boxShadow: "0 0 30px hsla(152,48%,28%,0.4)" }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#fff", fontSize: 20 }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Golos Text', sans-serif", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "96px 0", background: "hsl(210,15%,10%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Что говорят клиенты</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff" }}>Отзывы</h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {REVIEWS.map((r) => (
              <AnimSection key={r.name}>
                <div style={{ padding: 32, borderRadius: 2, border: "1px solid rgba(255,255,255,0.05)", background: "hsl(210,12%,13%)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} style={{ color: "hsl(38,72%,58%)" }} className="fill-current" />
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Golos Text', sans-serif", fontSize: 15, lineHeight: 1.7, flex: 1, marginBottom: 24 }}>«{r.text}»</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", textTransform: "uppercase", fontSize: 14, letterSpacing: "0.05em" }}>{r.name}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Golos Text', sans-serif", fontSize: 12 }}>{r.date}</span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "96px 0", background: "hsl(210,12%,13%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 64, alignItems: "start" }}>
            <AnimSection>
              <div style={{ color: "hsl(152,48%,52%)", fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Свяжитесь с нами</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", fontSize: "2.2rem", color: "#fff", marginBottom: 24, lineHeight: 1.15 }}>
                Начните свой проект сегодня
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Golos Text', sans-serif", marginBottom: 40, lineHeight: 1.75, fontSize: 15 }}>
                Оставьте заявку, и наш инженер свяжется с вами в течение 30 минут для бесплатной консультации.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 962 267 47-79" },
                  { icon: "MapPin", label: "Адрес", val: "г. Калининград, ТЦ «Кловер», 7 этаж, 717 офис" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00–19:00" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "hsla(152,48%,28%,0.15)", border: "1px solid hsl(152,48%,28%)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "hsl(152,48%,52%)" }} />
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.15em" }}>{c.label}</div>
                      <div style={{ color: "#fff", fontFamily: "'Golos Text', sans-serif", marginTop: 2 }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div style={{ borderRadius: 2, padding: 36, border: "1px solid rgba(255,255,255,0.08)", background: "hsl(210,15%,10%)" }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, textTransform: "uppercase", color: "#fff", marginBottom: 28, letterSpacing: "0.05em" }}>Оставить заявку</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Ваше имя", type: "text", placeholder: "Иван Иванов" },
                    { label: "Телефон", type: "tel", placeholder: "+7 (000) 000-00-00" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 2, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'Golos Text', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "hsl(152,48%,28%)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Что хотите построить?</label>
                    <textarea
                      rows={4} placeholder="Расскажите о вашем проекте..."
                      style={{ width: "100%", padding: "12px 16px", borderRadius: 2, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: "'Golos Text', sans-serif", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "hsl(152,48%,28%)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <button
                    style={{ padding: "16px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13, color: "#fff", borderRadius: 2, border: "none", cursor: "pointer", background: "hsl(152,48%,28%)", marginTop: 4, transition: "all 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "hsl(152,45%,35%)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "hsl(152,48%,28%)")}
                  >
                    Отправить заявку
                  </button>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Golos Text', sans-serif", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 0", background: "hsl(210,15%,7%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 3, background: "hsl(152,48%,28%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#fff", fontSize: 11 }}>М</span>
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13 }}>СК Малахит</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontFamily: "'Golos Text', sans-serif", textAlign: "center" }}>
            © 2025 ООО «СК Малахит 39» · Строительство домов под ключ в Калининграде
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legal info */}
        <div style={{ maxWidth: 1280, margin: "24px auto 0", padding: "24px 24px 0", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
          <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, fontFamily: "'Golos Text', sans-serif", lineHeight: 1.8 }}>
            <span>ООО «СК Малахит 39» · ИНН: 3900021785 · КПП: 390001001 · ОГРН: 1243900001718</span>
            <br />
            <span>Строительство домов под ключ с отделкой, в белом и сером ключе в Калининграде и области.</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, fontFamily: "'Golos Text', sans-serif", lineHeight: 1.8 }}>
            Юридический адрес: 236013, Калининградская область, г. Калининград, ул. Карташева, д. 2б, кв. 13
          </div>
        </div>
      </footer>
    </div>
  );
}