import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Compass,
  Search,
  Briefcase,
  Layers,
  Plus,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronDown,
  Check,
  Clock,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  SlidersHorizontal,
  ExternalLink,
  Download,
  User,
  Bookmark,
  Trash2,
} from "lucide-react";
import {
  Logo,
  Label,
  ProjectCard,
  Notice,
  SectionHead,
  CategoryIcon,
} from "./components";
import {
  projects,
  categories,
  money,
  cover,
  percent,
  readLocal,
  saveLocal,
} from "./data";
import type { Project } from "./data";
function CreatorProfile() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);
  if (!p) return <InfoPage type="Creator not found" />;
  return (
    <>
      <Link className="back-link" to={`/app/project/${p.id}`}>
        <ArrowLeft size={15} />
        Back to project
      </Link>
      <div className="profile-cover">
        <div>
          INDEPENDENT MINDS. SHARED AMBITION.<span>✳</span>
        </div>
      </div>
      <div className="profile-heading">
        <div className="profile-avatar" style={{ background: p.color }}>
          {p.creator
            .split(" ")
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h1>{p.creator}</h1>
          <p>
            Independent {p.category.toLowerCase()} creator · Illustrative
            profile
          </p>
          <span className="tag">CREATOR</span>
        </div>
      </div>
      <div className="profile-bio">
        <h3>Meet the mind behind the project.</h3>
        <p>{p.description}</p>
        <p>Social links will be provided by the creator before launch.</p>
      </div>
      <div className="metric-grid">
        <Metric label="Completed projects" value="0" detail="Sample profile" />
        <Metric label="Active projects" value="1" detail={p.title} />
        <Metric
          label="Total raised"
          value={money(p.raised)}
          detail="Illustrative funding"
        />
        <Metric
          label="Community size"
          value={String(p.backers)}
          detail="Demo supporters"
        />
      </div>
      <h2>Active project</h2>
      <div className="profile-projects">
        <ProjectCard project={p} />
      </div>
    </>
  );
}
const navItems = [
  { to: "/app", label: "Discover", icon: Compass, end: true },
  { to: "/app/search", label: "Search", icon: Search },
  { to: "/app/investments", label: "My Investments", icon: Briefcase },
  { to: "/app/projects", label: "My Projects", icon: Layers },
];
export default function Platform() {
  const [profile, setProfile] = useState(false),
    [notifications, setNotifications] = useState(false),
    [mobile, setMobile] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setProfile(false);
    setNotifications(false);
    setMobile(false);
  }, [location.pathname]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#app-main">
        Skip to content
      </a>
      <aside className={`sidebar ${mobile ? "sidebar-open" : ""}`}>
        <Logo />
        <div className="workspace-label">YOUR CREATIVE WORLD</div>
        <nav aria-label="App navigation">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              <n.icon size={19} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link className="button primary create-button" to="/app/create">
          <Plus size={17} /> Create Project
        </Link>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span>✳</span>
            <strong>
              Small beginnings.
              <br />
              Extraordinary possibilities.
            </strong>
            <Link to="/#join">
              Help shape Crowdge <ArrowUpRight size={14} />
            </Link>
          </div>
          <NavLink to="/app/help">
            <HelpCircle size={17} /> Help & resources
          </NavLink>
          <Link to="/">
            Back to crowdge.com <ArrowUpRight size={14} />
          </Link>
          <small>EARLY ACCESS PROTOTYPE</small>
        </div>
      </aside>
      {mobile && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="app-body">
        <header className="app-topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Toggle navigation"
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
          <div className="app-breadcrumb">
            Your next connection starts here <span>↗</span>
          </div>
          <div className="topbar-actions">
            <span className="demo-badge">
              <span /> Demo workspace
            </span>
            <div className="dropdown-wrap">
              <button
                className="icon-button notification-button"
                aria-label="Notifications"
                aria-expanded={notifications}
                onClick={() => {
                  setNotifications(!notifications);
                  setProfile(false);
                }}
              >
                <Bell size={19} />
                <i />
              </button>
              {notifications && (
                <div className="dropdown notification-dropdown">
                  <h4>You’re all caught up</h4>
                  <p>
                    This is a demo workspace. There are no live notifications.
                  </p>
                  <Link to="/app">
                    Explore something new <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
            <div className="dropdown-wrap">
              <button
                className="profile-toggle"
                aria-expanded={profile}
                aria-label="Profile menu"
                onClick={() => {
                  setProfile(!profile);
                  setNotifications(false);
                }}
              >
                <span className="user-avatar">AM</span>
                <ChevronDown size={14} />
              </button>
              {profile && (
                <div className="dropdown">
                  {[
                    ["Profile", "/app/profile"],
                    ["Settings", "/app/settings"],
                    ["Help", "/app/help"],
                    ["Terms", "/app/terms"],
                    ["Privacy", "/app/privacy"],
                  ].map(([name, url]) => (
                    <Link key={name} to={url}>
                      {name}
                    </Link>
                  ))}
                  <Link to="/">
                    <LogOut size={14} /> Log out of demo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <main id="app-main" className="app-content">
          <Routes>
            <Route index element={<Discover />} />
            <Route path="search" element={<Discover search />} />
            <Route path="project/:id" element={<ProjectDetail />} />
            <Route path="investments" element={<Investments />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="profile" element={<Profile />} />
            <Route path="creator/:id" element={<CreatorProfile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<InfoPage type="Help" />} />
            <Route path="terms" element={<InfoPage type="Terms" />} />
            <Route path="privacy" element={<InfoPage type="Privacy" />} />
            <Route path="*" element={<InfoPage type="Page not found" />} />
          </Routes>
          <Notice />
        </main>
      </div>
    </div>
  );
}
function Discover({ search = false }: { search?: boolean }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All projects"),
    [sort, setSort] = useState("Featured"),
    [progress, setProgress] = useState("All progress"),
    [min, setMin] = useState("Any amount"),
    [stage, setStage] = useState("All stages"),
    [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    setQuery("");
  }, [search]);
  const filtered = projects
    .filter(
      (p) =>
        (category === "All projects" || p.category === category) &&
        `${p.title} ${p.creator} ${p.category}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (progress === "All progress" ||
          (progress === "Over 70%" ? percent(p) > 70 : percent(p) <= 70)) &&
        (min === "Any amount" || p.minimum <= Number(min)) &&
        (stage === "All stages" || p.stage === stage),
    )
    .sort((a, b) =>
      sort === "Ending soon"
        ? a.days - b.days
        : sort === "Most funded"
          ? b.raised - a.raised
          : sort === "New creators"
            ? b.days - a.days
            : sort === "Trending now"
              ? b.backers - a.backers
              : 0,
    );
  return (
    <>
      <div className="app-page-heading">
        <div>
          <Label>
            {search
              ? "MAKE YOUR NEXT DISCOVERY"
              : "INDEPENDENT CREATIVITY, SHARED"}
          </Label>
          <h1>
            {search ? "Find what moves you." : "Good ideas deserve a crowd."}
          </h1>
          <p>
            {search
              ? "Search projects, creators, and creative categories."
              : "Discover ambitious projects. Get to know the people behind them."}
          </p>
        </div>
        <span className="outline-label">DISCOVER / 01</span>
      </div>
      {!search && (
        <Link to="/app/project/beyond-the-alps" className="featured-banner">
          <img src={cover(projects[2], 1400)} alt="Alpine mountain panorama" />
          <div className="featured-banner-content">
            <div className="tag">
              <span /> THE SPOTLIGHT · FILM
            </div>
            <h2>
              Stories that take you
              <br />
              somewhere new.
            </h2>
            <p>Beyond the Alps — a film by Luca & Emma</p>
            <span className="button light">
              Meet the project <ArrowUpRight size={17} />
            </span>
          </div>
          <div className="banner-stat">
            <strong>71%</strong>
            <span>of the journey funded</span>
            <div className="progress">
              <span style={{ width: "71%" }} />
            </div>
            <small>Illustrative project</small>
          </div>
        </Link>
      )}
      <div className="discovery-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            aria-label="Search projects, creators, and categories"
            placeholder="Find a project, creator, or category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
        </div>
        <button
          className={`button secondary filter-button ${showFilters ? "selected" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>
      {showFilters && (
        <div className="advanced-filters">
          <label>
            Funding progress
            <select
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            >
              <option>All progress</option>
              <option>Over 70%</option>
              <option>70% or less</option>
            </select>
          </label>
          <label>
            Minimum investment up to
            <select value={min} onChange={(e) => setMin(e.target.value)}>
              <option>Any amount</option>
              <option value="20">€20</option>
              <option value="25">€25</option>
              <option value="50">€50</option>
            </select>
          </label>
          <label>
            Project stage
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option>All stages</option>
              <option>Concept</option>
              <option>In development</option>
              <option>Production ready</option>
            </select>
          </label>
          <button
            className="text-link"
            onClick={() => {
              setProgress("All progress");
              setMin("Any amount");
              setStage("All stages");
              setQuery("");
              setCategory("All projects");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <div className="filter-row">
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="feed-heading">
        <div className="feed-tabs">
          {["Featured", "Trending now", "Ending soon", "New creators"].map(
            (s) => (
              <button
                key={s}
                className={sort === s ? "active" : ""}
                onClick={() => setSort(s)}
              >
                {s}
              </button>
            ),
          )}
        </div>
        <label className="sort-select">
          <span className="sr-only">Sort results</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {[
              "Featured",
              "Trending now",
              "Ending soon",
              "New creators",
              "Most funded",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <ChevronDown size={13} />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} projects to discover
      </p>
      <div className="project-grid app-project-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search size={30} />
          <h3>No projects found.</h3>
          <p>Try another keyword or broaden your filters.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("All projects");
              setProgress("All progress");
              setMin("Any amount");
              setStage("All stages");
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((p) => p.id === id);
  const [amount, setAmount] = useState("100"),
    [projectRevenue, setProjectRevenue] = useState("300000"),
    [tab, setTab] = useState("Overview"),
    [saved, setSaved] = useState(false),
    [simulated, setSimulated] = useState(false);
  if (!p) return <InfoPage type="Project not found" />;
  const investment = Number(amount),
    valid =
      Number.isFinite(investment) &&
      investment >= p.minimum &&
      investment <= p.goal;
  const rev = Math.max(0, Number(projectRevenue) || 0);
  const totalPayout =
    Math.min(rev, p.goal) +
    Math.max(0, Math.min(rev, p.goal * 2) - p.goal) * (p.share / 100);
  const payout = valid ? (investment / p.goal) * totalPayout : 0;
  const deadline = new Date("2026-09-23T12:00:00Z");
  deadline.setDate(deadline.getDate() + p.days);
  return (
    <>
      <Link className="back-link" to="/app">
        <ArrowLeft size={15} />
        Back to discovery
      </Link>
      <div className="detail-hero">
        <img src={cover(p, 1500)} alt={p.tagline} />
        <div className="detail-hero-overlay">
          <span className="image-category">
            <CategoryIcon category={p.category} />
            {p.category}
          </span>
          <h1>{p.title}</h1>
          <p>{p.tagline}</p>
        </div>
        <span className="detail-demo">ILLUSTRATIVE PROJECT</span>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-creator">
            <Link to={`/app/creator/${p.id}`} className="creator">
              <span className="large-avatar" style={{ background: p.color }}>
                {p.creator[0]}
              </span>
              <span>
                Created by <strong>{p.creator}</strong>
              </span>
              <span className="verified">
                <Check size={10} />
              </span>
            </Link>
            <button
              className={`button secondary small ${saved ? "selected" : ""}`}
              onClick={() => setSaved(!saved)}
            >
              <Bookmark size={15} />
              {saved ? "Saved for this visit" : "Save project"}
            </button>
          </div>
          <div className="detail-tabs">
            {[
              "Overview",
              "Milestones",
              "Updates",
              "Risks & FAQ",
              "Documents",
            ].map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "Overview" && (
            <>
              <h2>A project with a point of view.</h2>
              <p>{p.description}</p>
              <p>
                This mock project shows how a creator could share their vision,
                funding needs, and revenue terms with a community of backers.
                The team plans to use funding for production, specialist
                collaborators, and a thoughtful independent release.
              </p>
              <h3>Where the funding goes</h3>
              <div className="allocation-bar">
                <span style={{ width: "55%" }} />
                <span style={{ width: "30%" }} />
                <span style={{ width: "15%" }} />
              </div>
              <div className="allocation-legend">
                <span>
                  <i />
                  Production · 55%
                </span>
                <span>
                  <i />
                  Collaborators · 30%
                </span>
                <span>
                  <i />
                  Release · 15%
                </span>
              </div>
              <h3>Illustrative investment terms</h3>
              <div className="terms-list">
                <div>
                  <span>Capital recovery</span>
                  <strong>
                    First revenues to backers, up to {money(p.goal)}
                  </strong>
                </div>
                <div>
                  <span>Revenue share after recovery</span>
                  <strong>{p.share}% shared pro rata with backers</strong>
                </div>
                <div>
                  <span>Cumulative revenue threshold</span>
                  <strong>{money(p.goal * 2)}</strong>
                </div>
                <div>
                  <span>Revenue above threshold</span>
                  <strong>100% to the creator</strong>
                </div>
                <div>
                  <span>Fees</span>
                  <strong>Excluded from this illustration</strong>
                </div>
              </div>
              <p className="quiet-note">
                Subject to legal and regulatory validation. There is no
                guaranteed repayment, return, or liquidity. Actual terms could
                differ.
              </p>
            </>
          )}
          {tab === "Milestones" && (
            <>
              <h2>From an idea to the world.</h2>
              <div className="milestone-list">
                {[
                  [
                    "01",
                    "Concept & planning",
                    "Completed · Demo",
                    "Creative direction, scope, and production plan.",
                  ],
                  [
                    "02",
                    "Community funding",
                    "Current phase",
                    "Raise the capital required to start production.",
                  ],
                  [
                    "03",
                    "Production & development",
                    "Months 2–6",
                    "Bring the core creative work to life with regular updates.",
                  ],
                  [
                    "04",
                    "Independent release",
                    "Month 8",
                    "Release the project and begin revenue reporting.",
                  ],
                ].map(([n, t, d, b]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <div>
                      <small>{d}</small>
                      <h3>{t}</h3>
                      <p>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "Updates" && (
            <>
              <h2>From the creator’s notebook.</h2>
              <article className="update-card">
                <span className="tag">DEMO UPDATE · SEPTEMBER 2026</span>
                <h3>The beginning of something.</h3>
                <p>
                  Our creative direction is ready, our production plan is taking
                  shape, and we’re excited to share the journey. This sample
                  update shows where creators would keep their community
                  informed.
                </p>
                <strong>— {p.creator}</strong>
              </article>
            </>
          )}
          {tab === "Risks & FAQ" && (
            <>
              <h2>Know what you’re backing.</h2>
              <div className="risk-panel">
                <ShieldCheck size={22} />
                <div>
                  <h3>Capital is at risk.</h3>
                  <p>
                    Production delays, cost overruns, uncertain audience demand,
                    and distribution challenges could reduce or eliminate
                    returns. You could lose all invested capital. No resale
                    market is assumed.
                  </p>
                </div>
              </div>
              <div className="faq-list">
                {[
                  [
                    "Are returns guaranteed?",
                    "No. Returns depend entirely on actual project revenues and agreed terms. The project could generate no revenue.",
                  ],
                  [
                    "When would distributions happen?",
                    "A final agreement would define revenue reporting, deductions, and distribution timing. No binding schedule exists in this demo.",
                  ],
                  [
                    "Can I exit early?",
                    "This example assumes no secondary market or early withdrawal mechanism.",
                  ],
                  [
                    "What happens if the funding goal is missed?",
                    "A launch-ready agreement would define funding conditions and any refund process. This prototype collects no money.",
                  ],
                ].map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <Plus size={16} />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </>
          )}
          {tab === "Documents" && (
            <>
              <h2>The details, in one place.</h2>
              <p>
                Documents shown below are placeholders. No binding investment
                documents are available.
              </p>
              {[
                "Project overview",
                "Revenue-sharing terms",
                "Risk disclosure",
              ].map((d) => (
                <div className="document-row" key={d}>
                  <FileText size={20} />
                  <span>{d}</span>
                  <span className="tag">COMING BEFORE LAUNCH</span>
                </div>
              ))}
            </>
          )}
        </div>
        <aside className="investment-panel">
          <div className="investment-total">
            <strong>{money(p.raised)}</strong>
            <span>raised of {money(p.goal)} goal</span>
          </div>
          <div className="progress">
            <span style={{ width: `${percent(p)}%` }} />
          </div>
          <div className="investment-stats">
            <div>
              <strong>{percent(p)}%</strong>
              <span>funded</span>
            </div>
            <div>
              <strong>{p.backers}</strong>
              <span>backers</span>
            </div>
            <div>
              <strong>{p.days}</strong>
              <span>days left</span>
            </div>
          </div>
          <div className="small-terms">
            <span>
              Demo deadline{" "}
              <strong>
                {deadline.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </span>
            <span>
              Minimum investment <strong>{money(p.minimum)}</strong>
            </span>
            <span>
              Project stage <strong>{p.stage}</strong>
            </span>
          </div>
          <hr />
          <h3>What could your part look like?</h3>
          <span className="tag">ILLUSTRATIVE SIMULATOR</span>
          <div className="amount-presets">
            {[50, 100, 250].map((v) => (
              <button
                key={v}
                className={amount === String(v) ? "active" : ""}
                onClick={() => {
                  setAmount(String(v));
                  setSimulated(false);
                }}
              >
                €{v}
              </button>
            ))}
          </div>
          <label htmlFor="investment-amount">
            Your illustrative investment (€)
          </label>
          <input
            id="investment-amount"
            type="number"
            min={p.minimum}
            max={p.goal}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSimulated(false);
            }}
          />
          {!valid && (
            <p className="field-error">
              Enter an amount from {money(p.minimum)} to {money(p.goal)}.
            </p>
          )}
          <label htmlFor="project-revenue">
            Assumed total project revenue (€)
          </label>
          <input
            id="project-revenue"
            type="number"
            min="0"
            value={projectRevenue}
            onChange={(e) => {
              setProjectRevenue(e.target.value);
              setSimulated(false);
            }}
          />
          <div className="simulation-result">
            <span>Illustrative total payout</span>
            <strong>{money(payout)}</strong>
            <small>Includes any recovered capital · before fees</small>
          </div>
          <p className="quiet-note">
            Assumes full funding and pro-rata distribution under the terms
            shown. Not a forecast or financial advice. Your actual payout could
            be €0.
          </p>
          <button
            className="button primary"
            disabled={
              !valid || projectRevenue === "" || Number(projectRevenue) < 0
            }
            onClick={() => setSimulated(true)}
          >
            Back this Project <ArrowUpRight size={17} />
          </button>
          {simulated && (
            <div className="simulation-message" role="status">
              <Check size={18} />
              <p>
                Demo preview complete. No investment was made and no money was
                collected. <Link to="/#join">Join the waitlist</Link> for future
                updates.
              </p>
            </div>
          )}
          <span className="panel-disclaimer">
            <ShieldCheck size={13} />
            No payment. No commitment. Demo only.
          </span>
        </aside>
      </div>
    </>
  );
}
function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
function Investments() {
  return (
    <>
      <div className="app-page-heading">
        <div>
          <Label>YOUR CREATIVE PORTFOLIO</Label>
          <h1>My investments.</h1>
          <p>A little belief can be part of a bigger story.</p>
        </div>
        <span className="tag">MOCK DATA</span>
      </div>
      <div className="metric-grid">
        <Metric
          label="Total invested"
          value="€1,250"
          detail="Across three demo projects"
        />
        <Metric
          label="Active projects"
          value="3"
          detail="Music, gaming, and film"
        />
        <Metric
          label="Distributions received"
          value="€75"
          detail="Illustrative cash distributions"
        />
        <Metric
          label="Cash returned / invested"
          value="6.0%"
          detail="Not a total-return measure"
        />
      </div>
      <div className="portfolio-panels">
        <div className="chart-panel">
          <div className="panel-heading">
            <h3>Distributions over time</h3>
            <span className="tag">2026 · DEMO</span>
          </div>
          <div
            className="bar-chart"
            role="img"
            aria-label="Mock monthly distributions: April 0 euros, May 5 euros, June 10 euros, July 15 euros, August 20 euros, September 25 euros"
          >
            {[0, 5, 10, 15, 20, 25].map((v, i) => (
              <div key={i}>
                <small>{money(v)}</small>
                <div style={{ height: `${Math.max(3, v * 5)}px` }} />
                <span>{["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="portfolio-mix">
          <h3>A mix of creative worlds</h3>
          <div
            className="donut"
            role="img"
            aria-label="Portfolio allocation: gaming 40 percent, film 40 percent, music 20 percent"
          >
            <div>
              <strong>3</strong>
              <span>creative projects</span>
            </div>
          </div>
          <div className="allocation-legend">
            <span>
              <i />
              Gaming 40%
            </span>
            <span>
              <i />
              Film 40%
            </span>
            <span>
              <i />
              Music 20%
            </span>
          </div>
        </div>
      </div>
      <div className="panel-heading">
        <h2>Your projects</h2>
        <Link className="text-link" to="/app">
          Discover more <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {[
                "Project",
                "Amount invested",
                "Status",
                "Project revenue",
                "Distributions",
                "Next update",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 3).map((p, i) => (
              <tr key={p.id}>
                <td>
                  <Link className="table-project" to={`/app/project/${p.id}`}>
                    <img src={cover(p, 150)} alt="" />
                    <span>
                      <strong>{p.title}</strong>
                      <small>{p.creator}</small>
                    </span>
                  </Link>
                </td>
                <td>{i === 1 ? "€250" : "€500"}</td>
                <td>
                  <span className={`status ${i === 1 ? "green" : ""}`}>
                    {i === 1 ? "Distributing" : "In production"}
                  </span>
                </td>
                <td>{i === 1 ? "€9,000" : "€0"}</td>
                <td>{i === 1 ? "€75" : "€0"}</td>
                <td>Oct {12 + i * 3}, 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="quiet-note">
        Separate portfolio scenario: these mock holdings show projects after
        funding. Discovery cards show their earlier fundraising phase.
        Distributions do not indicate profit or current investment value.
      </p>
    </>
  );
}
type Draft = {
  title: string;
  category: string;
  goal: string;
  description: string;
  date: string;
  share: string;
  threshold: string;
  minimum: string;
  risks: string;
  id?: string;
  created?: string;
};
const blankDraft: Draft = {
  title: "",
  category: "Music",
  goal: "30000",
  description: "",
  date: "",
  share: "20",
  threshold: "60000",
  minimum: "25",
  risks: "",
};
function MyProjects() {
  const [drafts, setDrafts] = useState<Draft[]>(() =>
    readLocal<Draft[]>("crowdge-projects", []),
  );
  const [error, setError] = useState("");
  return (
    <>
      <div className="app-page-heading">
        <div>
          <Label>YOUR CREATOR STUDIO</Label>
          <h1>Make your next chapter.</h1>
          <p>Your projects, your community, and the work ahead.</p>
        </div>
        <Link className="button primary" to="/app/create">
          <Plus size={17} />
          Create New Project
        </Link>
      </div>
      <div className="metric-grid">
        <Metric
          label="Projects created"
          value={String(drafts.length + 1)}
          detail={`${drafts.length} locally saved · 1 sample`}
        />
        <Metric
          label="Amount raised"
          value="€24,750"
          detail="82.5% of the sample funding goal"
        />
        <Metric
          label="Community of backers"
          value="186"
          detail="Sample project supporters"
        />
        <Metric
          label="Distributions due"
          value="€0"
          detail="No revenue yet · demo only"
        />
      </div>
      <h2>Your creative projects</h2>
      <div className="creator-project-row">
        <img src={cover(projects[1], 500)} alt="Recording studio" />
        <div>
          <span className="tag">SAMPLE PROJECT</span>
          <h3>Midnight Tapes</h3>
          <p>Music · Funding open</p>
          <div className="progress">
            <span style={{ width: "82.5%" }} />
          </div>
          <span>€24,750 raised of €30,000 · 186 backers</span>
          <p>Revenue reported: €0 · Distributions due: €0</p>
        </div>
        <Link className="button secondary" to="/app/project/midnight-tapes">
          View project <ArrowUpRight size={16} />
        </Link>
      </div>
      {drafts.map((d) => (
        <div className="local-project" key={d.id}>
          <div>
            <span className="tag">LOCAL DEMO · NOT PUBLIC</span>
            <h3>{d.title}</h3>
            <p>
              {d.category} · Goal {money(Number(d.goal))} · 0 backers · €0
              raised
            </p>
            <p>Revenue reported: €0 · Distributions due: €0</p>
            <details>
              <summary>
                View saved details <ChevronDown size={14} />
              </summary>
              <p>{d.description}</p>
              <p>
                Target date: {d.date} · {d.share}% share ·{" "}
                {money(Number(d.threshold))} threshold ·{" "}
                {money(Number(d.minimum))} minimum
              </p>
              <p>Risks: {d.risks}</p>
            </details>
          </div>
          <button
            className="icon-button"
            aria-label={`Delete local project ${d.title}`}
            onClick={() => {
              const next = drafts.filter((x) => x.id !== d.id);
              if (saveLocal("crowdge-projects", next)) setDrafts(next);
              else setError("Unable to update local storage.");
            }}
          >
            <Trash2 size={17} />
          </button>
        </div>
      ))}
      {error && <p role="alert">{error}</p>}
      <div className="creator-prompt">
        <span>✳</span>
        <h3>Something new on your mind?</h3>
        <p>Turn your idea into a project, one step at a time.</p>
        <Link className="text-link" to="/app/create">
          Start a new project <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}
const steps = [
  "Project basics",
  "Category",
  "Funding goal",
  "Project description",
  "Timeline",
  "Return structure",
  "Revenue-sharing threshold",
  "Minimum investment",
  "Risk disclosure",
  "Review and publish",
];
function CreateProject() {
  const [step, setStep] = useState(0),
    [draft, setDraft] = useState<Draft>(() =>
      readLocal("crowdge-draft", blankDraft),
    ),
    [error, setError] = useState(""),
    [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  function update(key: keyof Draft, value: string) {
    setDraft({ ...draft, [key]: value });
    setSaved(false);
    setError("");
  }
  function next() {
    if (!form.current?.reportValidity()) return;
    if (step === 6 && Number(draft.threshold) < Number(draft.goal)) {
      setError(
        "The revenue threshold must be at least the funding goal for this recovery-first structure.",
      );
      return;
    }
    if (step === 7 && Number(draft.minimum) > Number(draft.goal)) {
      setError("Minimum investment cannot exceed the funding goal.");
      return;
    }
    setError("");
    if (step < 9) {
      setStep(step + 1);
      return;
    }
    const item = {
      ...draft,
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
    };
    if (
      saveLocal("crowdge-projects", [
        ...readLocal<Draft[]>("crowdge-projects", []),
        item,
      ])
    ) {
      saveLocal("crowdge-draft", blankDraft);
      navigate("/app/projects");
    } else
      setError(
        "Could not save the project. Please enable local storage and try again.",
      );
  }
  return (
    <>
      <Link className="back-link" to="/app/projects">
        <ArrowLeft size={15} />
        My projects
      </Link>
      <div className="app-page-heading">
        <div>
          <Label>EVERY GREAT PROJECT STARTS SOMEWHERE</Label>
          <h1>Bring your idea to life.</h1>
          <p>A guided draft. Your next creative chapter.</p>
        </div>
        <button
          className="button secondary"
          onClick={() => {
            if (saveLocal("crowdge-draft", draft)) setSaved(true);
            else setError("Local storage is unavailable.");
          }}
        >
          {saved ? <Check size={16} /> : <Bookmark size={16} />}{" "}
          {saved ? "Draft saved on this device" : "Save draft"}
        </button>
      </div>
      <div className="wizard">
        <aside className="wizard-steps">
          {steps.map((s, i) => (
            <div
              key={s}
              className={step === i ? "active" : step > i ? "complete" : ""}
            >
              <span>
                {step > i ? (
                  <Check size={13} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {s}
            </div>
          ))}
        </aside>
        <form
          ref={form}
          className="wizard-form"
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          <span className="purple-text">
            STEP {String(step + 1).padStart(2, "0")} OF 10
          </span>
          <div className="progress wizard-progress">
            <span style={{ width: `${(step + 1) * 10}%` }} />
          </div>
          <h2>{steps[step]}</h2>
          {step === 0 && (
            <>
              <p>Give your project a name that feels like you.</p>
              <label htmlFor="project-title">
                Project title{" "}
                <span title="Choose a specific name for a single creative project.">
                  ⓘ
                </span>
              </label>
              <input
                id="project-title"
                required
                minLength={3}
                maxLength={100}
                value={draft.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. My next independent album"
              />
            </>
          )}
          {step === 1 && (
            <>
              <p>Where does your project feel most at home?</p>
              <div className="category-options">
                {categories.slice(1).map((c) => (
                  <button
                    type="button"
                    key={c}
                    className={draft.category === c ? "active" : ""}
                    onClick={() => update("category", c)}
                  >
                    <CategoryIcon category={c} size={24} />
                    {c}
                    {draft.category === c && <Check size={15} />}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p>
                Set a clear, realistic budget for bringing your idea to life.
              </p>
              <label htmlFor="goal">
                Funding goal (€){" "}
                <span title="Include production costs, collaborators, and an appropriate contingency.">
                  ⓘ
                </span>
              </label>
              <input
                id="goal"
                type="number"
                required
                min="100"
                max="10000000"
                step="1"
                value={draft.goal}
                onChange={(e) => update("goal", e.target.value)}
              />
            </>
          )}
          {step === 3 && (
            <>
              <p>Tell future backers what you’re making and why it matters.</p>
              <label htmlFor="description">Project description</label>
              <textarea
                id="description"
                required
                minLength={30}
                maxLength={5000}
                rows={7}
                value={draft.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="The idea, the audience, the people, and how the funding will be used…"
              />
              <small>
                At least 30 characters. {draft.description.length}/5,000
              </small>
            </>
          )}
          {step === 4 && (
            <>
              <p>
                Choose a target completion date. Be realistic about the work
                ahead.
              </p>
              <label htmlFor="date">Target release date</label>
              <input
                id="date"
                type="date"
                required
                min={new Date().toISOString().slice(0, 10)}
                value={draft.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </>
          )}
          {step === 5 && (
            <>
              <p>
                This prototype uses capital recovery followed by a configurable
                revenue share.
              </p>
              <div className="info-box">
                The first project revenues go to backers until their initial
                capital is recovered. After that, the percentage below applies
                until your revenue threshold is reached.
              </div>
              <label htmlFor="share">
                Backers’ revenue share after recovery (%){" "}
                <span title="The share is split proportionally among all backers, not paid to each individual.">
                  ⓘ
                </span>
              </label>
              <input
                id="share"
                type="number"
                min="1"
                max="100"
                step="1"
                required
                value={draft.share}
                onChange={(e) => update("share", e.target.value)}
              />
              <p className="quiet-note">
                Illustrative structure, subject to legal and regulatory
                validation.
              </p>
            </>
          )}
          {step === 6 && (
            <>
              <p>Set the cumulative project revenue at which sharing ends.</p>
              <label htmlFor="threshold">
                Cumulative revenue threshold (€){" "}
                <span title="This is total project revenue, not the total paid to investors. It must be at least the funding goal.">
                  ⓘ
                </span>
              </label>
              <input
                id="threshold"
                type="number"
                required
                min={Number(draft.goal)}
                max="100000000"
                step="1"
                value={draft.threshold}
                onChange={(e) => update("threshold", e.target.value)}
              />
              <div className="info-box">
                With these terms, aggregate backer payouts would be capped at{" "}
                {money(
                  Number(draft.goal) +
                    (Math.max(0, Number(draft.threshold) - Number(draft.goal)) *
                      Number(draft.share)) /
                      100,
                )}{" "}
                before fees, if sufficient revenue is generated. Returns are not
                guaranteed.
              </div>
            </>
          )}
          {step === 7 && (
            <>
              <p>
                Make room for people who believe in your idea, even with a small
                amount.
              </p>
              <label htmlFor="minimum">Minimum investment (€)</label>
              <input
                id="minimum"
                type="number"
                min="1"
                max={Number(draft.goal)}
                step="1"
                required
                value={draft.minimum}
                onChange={(e) => update("minimum", e.target.value)}
              />
            </>
          )}
          {step === 8 && (
            <>
              <p>
                Be open about what could go wrong. Clear risks build informed
                decisions.
              </p>
              <label htmlFor="risks">Project-specific risks</label>
              <textarea
                id="risks"
                minLength={30}
                maxLength={5000}
                required
                rows={6}
                value={draft.risks}
                onChange={(e) => update("risks", e.target.value)}
                placeholder="Production delays, uncertain demand, distribution challenges, cost overruns…"
              />
              <small>
                At least 30 characters. Include the risk of losing all invested
                capital.
              </small>
            </>
          )}
          {step === 9 && (
            <>
              <p>
                Review your project before saving it in this demo workspace.
              </p>
              <div className="review-list">
                {[
                  ["Project", draft.title],
                  ["Category", draft.category],
                  ["Funding goal", money(Number(draft.goal))],
                  ["Description", draft.description],
                  ["Target release", draft.date],
                  ["Revenue share", `${draft.share}% after recovery`],
                  ["Revenue threshold", money(Number(draft.threshold))],
                  ["Minimum investment", money(Number(draft.minimum))],
                  ["Risks", draft.risks],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
              <label className="checkbox-label">
                <input type="checkbox" required />I understand this is an
                illustrative local demo. This does not publish an investment
                offer.
              </label>
            </>
          )}
          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
          <div className="wizard-actions">
            <button
              type="button"
              className="button secondary"
              disabled={step === 0}
              onClick={() => {
                setStep(step - 1);
                setError("");
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button type="submit" className="button primary">
              {step === 9 ? "Publish demo locally" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="quiet-note">
            Saved only on this device. All financial structures are illustrative
            and require legal/regulatory validation before use.
          </p>
        </form>
      </div>
    </>
  );
}
function Profile() {
  const [editing, setEditing] = useState(false),
    [profile, setProfile] = useState(() =>
      readLocal("crowdge-profile", {
        name: "Alex Morgan",
        bio: "Curious about independent music, meaningful stories, and the people making them.",
        website: "",
      }),
    ),
    [message, setMessage] = useState("");
  return (
    <>
      <div className="profile-cover">
        <div>
          CREATIVITY IS BETTER TOGETHER <span>✳</span>
        </div>
      </div>
      <div className="profile-heading">
        <div className="profile-avatar">
          {profile.name
            .split(" ")
            .map((x) => x[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h1>{profile.name}</h1>
          <p>Demo community profile</p>
          <span className="tag">BACKER</span>{" "}
          <span className="tag">CREATOR</span>
        </div>
        <button
          className="button secondary"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel editing" : "Edit profile"}
        </button>
      </div>
      {editing && (
        <form
          className="profile-edit"
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(
              saveLocal("crowdge-profile", profile)
                ? "Profile saved on this device."
                : "Unable to save profile.",
            );
            setEditing(false);
          }}
        >
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            required
            value={profile.name}
            maxLength={100}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            value={profile.bio}
            maxLength={500}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
          <label htmlFor="profile-website">
            Social or portfolio URL (https)
          </label>
          <input
            id="profile-website"
            type="url"
            pattern="https://.*"
            placeholder="https://…"
            value={profile.website}
            onChange={(e) =>
              setProfile({ ...profile, website: e.target.value })
            }
          />
          <button className="button primary">Save profile</button>
        </form>
      )}
      {message && <p role="status">{message}</p>}
      <div className="profile-bio">
        <h3>A little about me</h3>
        <p>{profile.bio}</p>
        {profile.website.startsWith("https://") && (
          <a
            className="text-link"
            href={profile.website}
            target="_blank"
            rel="noreferrer"
          >
            Website / social profile <ExternalLink size={14} />
          </a>
        )}
      </div>
      <div className="metric-grid">
        <Metric
          label="Completed projects"
          value="0"
          detail="The story is just beginning"
        />
        <Metric
          label="Active projects"
          value="1"
          detail="Sample creator project"
        />
        <Metric
          label="Total raised"
          value="€24,750"
          detail="Illustrative funding"
        />
        <Metric label="Community size" value="186" detail="Demo supporters" />
      </div>
      <h2>Active project</h2>
      <div className="profile-projects">
        <ProjectCard project={projects[1]} />
      </div>
    </>
  );
}
function SettingsPage() {
  const [settings, setSettings] = useState(() =>
      readLocal("crowdge-settings", { updates: true, digest: false }),
    ),
    [message, setMessage] = useState("");
  return (
    <>
      <div className="app-page-heading">
        <div>
          <Label>MAKE YOURSELF AT HOME</Label>
          <h1>Settings.</h1>
          <p>Personalize your demo workspace.</p>
        </div>
      </div>
      <div className="settings-panel">
        <h3>Communication preferences</h3>
        <p>
          These preferences are saved locally. This prototype sends no email.
        </p>
        {[
          ["updates", "Creator updates"],
          ["digest", "Monthly discovery digest"],
        ].map(([key, label]) => (
          <label className="switch-row" key={key}>
            {label}
            <input
              type="checkbox"
              checked={settings[key as keyof typeof settings]}
              onChange={(e) =>
                setSettings({ ...settings, [key]: e.target.checked })
              }
            />
          </label>
        ))}
        <button
          className="button primary"
          onClick={() =>
            setMessage(
              saveLocal("crowdge-settings", settings)
                ? "Preferences saved on this device."
                : "Unable to save preferences.",
            )
          }
        >
          Save preferences
        </button>
        {message && <p role="status">{message}</p>}
      </div>
    </>
  );
}
function InfoPage({ type }: { type: string }) {
  return (
    <div className="info-page">
      <Label>CROWDGE / RESOURCES</Label>
      <h1>{type}</h1>
      {type === "Help" ? (
        <>
          <h3>A space to explore.</h3>
          <p>
            Start in Discover to browse sample projects. Open a project to
            review its terms and simulate different investment and revenue
            scenarios. My Investments shows a separate mock portfolio, and
            Create Project lets you save a draft on this device.
          </p>
          <h3>Need to get in touch?</h3>
          <p>
            The contact form on our homepage is a local demo. Submitted messages
            are not sent to our team yet.
          </p>
          <Link className="button primary" to="/#join">
            Explore the contact form <ArrowUpRight size={16} />
          </Link>
        </>
      ) : type === "Terms" ? (
        <>
          <p>
            Crowdge is an early-stage project. This prototype is provided for
            demonstration only. All projects, financial figures, portfolio data,
            and revenue-sharing terms are fictional or illustrative.
          </p>
          <p>
            No investment offer, contract, payment, KYC, or financial
            transaction is available. Do not rely on the examples as financial
            or legal advice. Full terms will be developed before a live service
            launches.
          </p>
        </>
      ) : type === "Privacy" ? (
        <>
          <p>
            Waitlist responses, project drafts, profile information, and
            preferences are stored in this browser’s local storage. They are not
            submitted to a Crowdge backend. No payment information or identity
            documents are collected.
          </p>
          <p>
            Project photography is served locally. Clear this site’s browser
            data to remove saved responses and drafts. A complete privacy policy
            will be prepared before a live service launches.
          </p>
        </>
      ) : (
        <>
          <p>We couldn’t find that page or project.</p>
          <Link className="button primary" to="/app">
            Back to discovery
          </Link>
        </>
      )}
    </div>
  );
}
