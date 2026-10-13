import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  HeartHandshake,
  TrendingUp,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Plus,
  Minus,
  Mail,
} from "lucide-react";
import { Logo, Label, ProjectCard, SectionHead, Notice } from "./components";
import { projects, categories, money, saveLocal, readLocal } from "./data";
export default function Landing() {
  const [menu, setMenu] = useState(false),
    [category, setCategory] = useState("All projects"),
    [sort, setSort] = useState("Trending"),
    [role, setRole] = useState("Backer"),
    [submitted, setSubmitted] = useState(false),
    [formError, setFormError] = useState(""),
    [revenue, setRevenue] = useState(300000),
    [modal, setModal] = useState("");
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModal("");
        return;
      }
      if (e.key === "Tab") {
        const items = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".modal button,.modal a[href]",
          ),
        );
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, [modal]);
  const filtered = projects
    .filter((p) => category === "All projects" || p.category === category)
    .sort((a, b) =>
      sort === "Ending Soon"
        ? a.days - b.days
        : sort === "Most Funded"
          ? b.raised - a.raised
          : sort === "New"
            ? b.days - a.days
            : 0,
    );
  const payout =
    Math.min(revenue, 100000) +
    Math.max(0, Math.min(revenue, 200000) - 100000) * 0.2;
  function selectRole(value: string) {
    setRole(value);
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav">
          <Logo />
          <nav
            className={menu ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            <a href="#how-it-works" onClick={() => setMenu(false)}>
              How it works
            </a>
            <a href="#projects" onClick={() => setMenu(false)}>
              Explore projects
            </a>
            <a href="#about" onClick={() => setMenu(false)}>
              Our story
            </a>
          </nav>
          <div className="nav-actions">
            <Link className="login-link" to="/app">
              Log in <ArrowUpRight size={14} />
            </Link>
            <a className="button small primary" href="#join">
              Join the waitlist <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <div className="launch-pill">
              <span />A new chapter for independent creativity{" "}
              <ArrowUpRight size={13} />
            </div>
            <h1>
              Fund creativity.
              <br />
              Share their
              <br />
              <em>success.</em>
              <span className="hero-asterisk">✳</span>
            </h1>
            <p>
              Crowdge connects independent creators with people willing to fund
              their next project. Discover promising ideas, back the ones you
              believe in, and participate financially in their potential
              success.
            </p>
            <div className="hero-buttons">
              <Link className="button primary" to="/app">
                Explore projects <ArrowUpRight size={18} />
              </Link>
              <a
                className="button secondary"
                href="#join"
                onClick={() => setRole("Creator")}
              >
                Fund your project <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="avatar-stack">
                <i>JL</i>
                <i>AM</i>
                <i>SK</i>
                <i>ME</i>
              </span>
              <span>
                Independent ideas.
                <br />
                <strong>Collective possibilities.</strong>
              </span>
              <div className="tiny-divider" />
              <span className="hero-small">
                <ShieldCheck size={16} /> Built around transparency
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="floating-label">
              <span className="live-dot" />
              Big ideas. Shared futures.
            </div>
            <div className="hero-project main-project">
              <ProjectCard project={projects[0]} compact />
            </div>
            <div className="hero-project rear-project">
              <ProjectCard project={projects[1]} compact />
            </div>
            <div className="floating-stat">
              <div className="stat-icon">
                <TrendingUp size={23} />
              </div>
              <div>
                <small>CREATIVITY MEETS OPPORTUNITY</small>
                <strong>A stake in something you believe in.</strong>
              </div>
              <ArrowUpRight size={19} />
            </div>
            <div className="visual-caption">
              A PREVIEW OF WHAT’S POSSIBLE <span>↗</span>
            </div>
          </div>
        </section>
        <div className="category-strip">
          <div className="container">
            <span>Great ideas don’t fit in one box.</span>
            <div>
              {categories.slice(1).map((c) => (
                <a key={c} href="#projects" onClick={() => setCategory(c)}>
                  {c}
                  <span>✳</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <section id="how-it-works" className="section container">
          <SectionHead
            label="THE IDEA IS SIMPLE"
            title="Their next chapter. Your part in it."
            copy="A more connected way to bring independent projects to life."
          />
          <div className="steps">
            {[
              {
                icon: Compass,
                title: "Discover something special.",
                text: "Explore projects across music, gaming, film, digital content and other creative industries.",
              },
              {
                icon: HeartHandshake,
                title: "Back what you believe in.",
                text: "Invest even small amounts in a specific project. Understand the plan, the terms, and the people behind it.",
              },
              {
                icon: TrendingUp,
                title: "Share in the potential.",
                text: "Receive returns according to the project-specific structure. When creativity succeeds, you can be part of it.",
              },
            ].map((s, i) => (
              <div className="step" key={s.title}>
                <div className="step-top">
                  <s.icon size={27} strokeWidth={1.4} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className="quiet-note">
            Creative projects involve risk. Returns are not guaranteed, and
            capital may be lost.
          </p>
        </section>
        <section id="projects" className="section project-section">
          <div className="container">
            <SectionHead
              label="INDEPENDENT MINDS. EXTRAORDINARY IDEAS."
              title="Find your next “I believe in this.”"
              copy="Meet a few of the projects that could shape what comes next."
              action={
                <Link className="text-link" to="/app">
                  Explore all projects <ArrowUpRight size={18} />
                </Link>
              }
            />
            <div className="filter-row">
              <div className="chips">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={category === c ? "chip active" : "chip"}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <label className="sort-select">
                <span className="sr-only">Sort projects</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {["Trending", "New", "Ending Soon", "Most Funded"].map(
                    (v) => (
                      <option key={v}>{v}</option>
                    ),
                  )}
                </select>
                <ChevronDown size={14} />
              </label>
            </div>
            <div className="project-grid landing-project-grid">
              {filtered.slice(0, 4).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <p className="quiet-note">
              A glimpse of the platform. All projects shown are illustrative.
            </p>
          </div>
        </section>
        <section className="section container">
          <SectionHead
            label="A BETTER WAY TO CREATE, TOGETHER"
            title="Different roles. Shared ambition."
          />
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-top">
                <span>FOR CREATORS</span>
                <span>01 /</span>
              </div>
              <h3>
                Your vision.
                <br />A community behind it.
              </h3>
              <p>
                Bring your next project to life, while keeping ownership of your
                wider activity.
              </p>
              <ul>
                {[
                  "Access upfront capital",
                  "Keep ownership of your wider activity",
                  "Build a financially aligned community",
                  "Fund a project, not sell your entire business",
                ].map((x) => (
                  <li key={x}>
                    <Check size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <button
                className="text-link"
                onClick={() => selectRole("Creator")}
              >
                Let’s make it happen <ArrowUpRight size={18} />
              </button>
              <div className="benefit-art art-creator" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="benefit-card backer-card">
              <div className="benefit-top">
                <span>FOR BACKERS</span>
                <span>02 /</span>
              </div>
              <h3>
                More than an audience.
                <br />
                Part of the story.
              </h3>
              <p>
                Discover independent talent and participate financially in the
                projects you believe in.
              </p>
              <ul>
                {[
                  "Discover creators beyond your existing circle",
                  "Get started with small amounts",
                  "Access project-based opportunities",
                  "Participate in potential financial upside",
                ].map((x) => (
                  <li key={x}>
                    <Check size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <Link className="text-link" to="/app">
                Find your kind of project <ArrowUpRight size={18} />
              </Link>
              <div className="benefit-art art-backer" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </section>
        <section className="section example-section">
          <div className="container example-grid">
            <div>
              <Label>LET’S PUT NUMBERS TO IT</Label>
              <h2>
                A shared success.
                <br />
                With clear terms.
              </h2>
              <p className="section-copy">
                Every project sets its own structure. Here’s how one
                illustrative revenue-sharing arrangement could work.
              </p>
              <div className="example-terms">
                <div>
                  <small>PROJECT FUNDING</small>
                  <strong>€100,000</strong>
                </div>
                <div>
                  <small>REVENUE SHARE</small>
                  <strong>20%</strong>
                </div>
                <div>
                  <small>REVENUE THRESHOLD</small>
                  <strong>€200,000</strong>
                </div>
              </div>
              <p className="quiet-note">
                Illustrative example — final structures may vary by project.
                Before fees. Not legal or financial advice.
              </p>
            </div>
            <div className="example-panel">
              <div className="panel-heading">
                <span>The project’s journey</span>
                <span className="tag">ILLUSTRATIVE</span>
              </div>
              <div className="timeline">
                <div>
                  <span>1</span>
                  <div>
                    <strong>First €100,000 in revenue</strong>
                    <p>
                      100% goes to backers to recover their initial capital.
                    </p>
                  </div>
                </div>
                <div>
                  <span>2</span>
                  <div>
                    <strong>Next €100,000 in revenue</strong>
                    <p>20% goes to backers, 80% to the creator.</p>
                  </div>
                </div>
                <div>
                  <span>3</span>
                  <div>
                    <strong>Beyond €200,000 in revenue</strong>
                    <p>100% goes to the creator.</p>
                  </div>
                </div>
              </div>
              <label className="revenue-label" htmlFor="revenue">
                If the project generates <strong>{money(revenue)}</strong>
              </label>
              <input
                id="revenue"
                aria-label="Illustrative project revenue"
                type="range"
                min="0"
                max="400000"
                step="10000"
                value={revenue}
                onChange={(e) => setRevenue(+e.target.value)}
              />
              <div className="payout">
                <div>
                  <small>BACKERS RECEIVE</small>
                  <strong>{money(payout)}</strong>
                </div>
                <div>
                  <small>CREATOR RECEIVES</small>
                  <strong>{money(revenue - payout)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section container market-section">
          <div className="market-intro">
            <Label>THE NEXT CHAPTER IS INDEPENDENT</Label>
            <h2>
              Creativity is growing.
              <br />
              Its funding needs to catch up.
            </h2>
            <p>
              Independent creators are building increasingly ambitious projects,
              but access to suitable funding remains limited.
            </p>
          </div>
          <div className="market-stats">
            <div>
              <strong>
                ~$480B<span>↗</span>
              </strong>
              <p>
                Projected creator economy
                <br />
                by 2027
              </p>
              <a
                href="https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027"
                target="_blank"
                rel="noreferrer"
              >
                Goldman Sachs <ArrowUpRight size={12} />
              </a>
            </div>
            <div>
              <strong>$706M</strong>
              <p>
                Pledged to successful Kickstarter
                <br />
                projects in 2024
              </p>
              <a
                href="https://updates.kickstarter.com/the-creative-download-2024/"
                target="_blank"
                rel="noreferrer"
              >
                Kickstarter <ArrowUpRight size={12} />
              </a>
            </div>
            <div>
              <strong>
                85<span>%</span>
              </strong>
              <p>
                Of surveyed creators self-fund
                <br />
                with personal cards or savings
              </p>
              <a
                href="https://corporate.visa.com/en/solutions/commercial-solutions/knowledge-hub/2025-visa-creators-report.html"
                target="_blank"
                rel="noreferrer"
              >
                Visa Creator Report <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div>
              <Label>WHO WE ARE</Label>
              <h2>
                Built with conviction.
                <br />
                And a fresh perspective.
              </h2>
              <p>
                We share a strong foundation in economics and finance, while our
                academic paths are developing in complementary directions across
                entrepreneurship, venture, governance and organizations.
              </p>
            </div>
            <div className="founders">
              <article>
                <div className="founder-avatar">
                  FD<span>↗</span>
                </div>
                <div>
                  <h3>Francesco Di Salvo</h3>
                  <span className="purple-text">Founder</span>
                  <p>
                    BSc in Economics and Finance at Bocconi, now starting the
                    MSc in Innovation, Technology and Entrepreneurship.
                  </p>
                </div>
              </article>
              <article>
                <div className="founder-avatar second">
                  GA<span>↗</span>
                </div>
                <div>
                  <h3>Giorgio Americo</h3>
                  <span className="purple-text">Co-Founder</span>
                  <p>
                    BSc in Economics and Finance at Bocconi, now starting the
                    MSc in Economics and Management of Government and
                    International Organizations.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="faq" className="section container faq-section">
          <div>
            <Label>A LITTLE MORE CLARITY</Label>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "Is Crowdge available for investments?",
                "Not yet. Crowdge is an early-stage project. This website is a clickable prototype with mock projects, terms, and financial data. No real investments, payments, or KYC take place.",
              ],
              [
                "How would returns work?",
                "Each project would define its own revenue-sharing terms, recovery mechanism, and threshold. Any eventual structure would be subject to legal and regulatory validation. Returns would depend on actual project performance.",
              ],
              [
                "Can I lose the money I invest?",
                "Yes. Creative projects can be delayed, underperform, or fail. An investor could lose some or all of their capital. Illustrative scenarios are not forecasts or guarantees.",
              ],
              [
                "Who can submit a project?",
                "Independent creators across music, gaming, film, content, publishing, and other creative industries can express interest. Join the local demo waitlist as a creator to explore the form.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={17} className="faq-plus" />
                  <Minus size={17} className="faq-minus" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="join" className="container join-section">
          <div className="join-copy">
            <Label>EARLY DAYS. BIG POSSIBILITIES.</Label>
            <h2>
              Be part of Crowdge
              <br />
              from the beginning<span>.</span>
            </h2>
            <p>
              For the people making something meaningful.
              <br />
              And the people who want to be part of it.
            </p>
            <div className="role-choices">
              <button
                className={role === "Creator" ? "role active" : "role"}
                onClick={() => setRole("Creator")}
              >
                I’m a Creator <ArrowUpRight size={15} />
              </button>
              <button
                className={role === "Backer" ? "role active" : "role"}
                onClick={() => setRole("Backer")}
              >
                I Want to Back Projects <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="join-flower" aria-hidden="true">
              ✳
            </div>
          </div>
          <div className="join-form">
            {submitted ? (
              <div className="success-state" role="status">
                <span>
                  <Check size={28} />
                </span>
                <h3>You’re part of the story.</h3>
                <p>
                  Your interest has been saved on this device. This demo doesn’t
                  send your details to the Crowdge team.
                </p>
                <button
                  className="text-link"
                  onClick={() => setSubmitted(false)}
                >
                  Add another response <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const values = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );
                  /* Backend integration point: POST these values to a consent-aware Supabase, Firebase, or Formspree endpoint. */ /* Backend integration point: POST these values to a consent-aware Supabase, Firebase, or Formspree endpoint. */ const ok =
                    saveLocal("crowdge-waitlist", [
                      ...readLocal<object[]>("crowdge-waitlist", []),
                      { ...values, createdAt: new Date().toISOString() },
                    ]);
                  if (ok) {
                    setSubmitted(true);
                    setFormError("");
                  } else
                    setFormError(
                      "Your browser could not save this submission. Please enable local storage and try again.",
                    );
                }}
              >
                <h3>Let’s keep in touch.</h3>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Alex Morgan"
                  required
                  maxLength={100}
                />
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                />
                <label htmlFor="userType">I’m here as a</label>
                <select
                  id="userType"
                  name="userType"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Creator</option>
                  <option>Backer</option>
                  <option>Both</option>
                </select>
                <label htmlFor="message">
                  Anything you’d like to share? <span>(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us a little about your idea…"
                  rows={2}
                  maxLength={2000}
                />
                <button className="button primary" type="submit">
                  Join the waitlist <ArrowUpRight size={18} />
                </button>
                <p className="form-note">
                  Demo only. Your response is saved in this browser, not sent to
                  our team. Read our{" "}
                  <button type="button" onClick={() => setModal("Privacy")}>
                    privacy note
                  </button>
                  .
                </p>
                {formError && <p role="alert">{formError}</p>}
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="container footer">
        <div className="footer-top">
          <div>
            <Logo />
            <p>Fund creativity. Share their success.</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#join">Contact</a>
            <a href="#faq">FAQ</a>
            {["Terms", "Privacy", "Risk Disclosure"].map((t) => (
              <button key={t} onClick={() => setModal(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="social-links">
            <button
              aria-label="LinkedIn placeholder"
              onClick={() => setModal("Social profiles")}
            >
              in
            </button>
            <button
              aria-label="Instagram placeholder"
              onClick={() => setModal("Social profiles")}
            >
              <Globe size={17} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Crowdge. A future worth creating.
          </span>
          <span>
            Made for independent ambition <span className="purple-text">↗</span>
          </span>
        </div>
        <p className="footer-disclosure">
          Crowdge is currently an early-stage project. Investment features shown
          on this website are illustrative and not yet available.
        </p>
      </footer>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="icon-button modal-close"
              aria-label="Close dialog"
              onClick={() => setModal("")}
              onKeyDown={(e) => {
                if (e.key === "Escape") setModal("");
              }}
            >
              <X />
            </button>
            <h2>{modal}</h2>
            <p>
              {modal === "Privacy"
                ? "This prototype stores waitlist responses, saved profiles, settings, and demo project drafts in your browser’s local storage. No payment or identity data is collected. Project photography is served locally. You can remove saved data in your browser settings. A complete privacy policy will be prepared before any public investment service launches."
                : modal === "Terms"
                  ? "This is an early-stage demonstration of Crowdge. All projects, dashboards, and investment structures are illustrative. The prototype does not offer securities, process transactions, or establish an investment agreement. Full service terms will be developed before launch."
                  : modal === "Risk Disclosure"
                    ? "Creative projects can fail, earn no revenue, or face production delays. Any future investment could result in loss of some or all capital and may be illiquid. Revenue shares are subject to project-specific terms, fees, and legal validation. Examples are not financial or legal advice, forecasts, or guarantees."
                    : "Our LinkedIn and Instagram profiles will be linked here when available."}
            </p>
            <button className="button secondary" onClick={() => setModal("")}>
              Got it
            </button>
          </section>
        </div>
      )}
    </>
  );
}
