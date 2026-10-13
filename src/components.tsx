import {
  ArrowUpRight,
  ArrowRight,
  Users,
  Clock,
  Check,
  Music2,
  Gamepad2,
  Clapperboard,
  Video,
  BookOpen,
  Shapes,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "./data";
import { cover, money, percent } from "./data";
export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Crowdge home">
      <svg viewBox="0 0 36 38" aria-hidden="true">
        <path
          d="M34 5H15L2 19l13 14h19l-8-9H17l-5-5 5-5h9z"
          fill="currentColor"
        />
      </svg>
      <span>
        crowd<span>ge</span>
        <i>®</i>
      </span>
    </Link>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />;
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function CategoryIcon({
  category,
  size = 15,
}: {
  category: string;
  size?: number;
}) {
  const Icon =
    (
      {
        Music: Music2,
        Gaming: Gamepad2,
        Film: Clapperboard,
        Content: Video,
        Publishing: BookOpen,
      } as Record<string, typeof Music2>
    )[category] || Shapes;
  return <Icon size={size} />;
}
export function ProjectCard({
  project: p,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <Link
      to={`/app/project/${p.id}`}
      className={`project-card ${compact ? "compact" : ""}`}
    >
      <div className="project-image" style={{ backgroundColor: p.color }}>
        <img
          src={cover(p, 700)}
          alt={
            p.category === "Gaming"
              ? "Earth glowing against the darkness of space"
              : p.category === "Music"
                ? "Microphone in a warmly lit recording studio"
                : p.category === "Film"
                  ? "Dramatic alpine mountain peaks"
                  : p.tagline
          }
          loading="lazy"
        />
        <span className="image-category">
          <CategoryIcon category={p.category} />
          {p.category}
        </span>
        <span className="card-go">
          <Arrow diagonal />
        </span>
        {p.id === "echoes-of-orion" && (
          <div className="image-title">
            ECHOES
            <br />
            <span>OF ORION</span>
            <small>A NOVA STUDIO ORIGINAL</small>
          </div>
        )}
        {p.id === "midnight-tapes" && (
          <div className="image-title album-title">
            midnight
            <br />
            tapes<small>SOFIA LAURENT · THE DEBUT ALBUM</small>
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="creator">
          <span className="mini-avatar" style={{ background: p.color }}>
            {p.creator[0]}
          </span>
          {p.creator}
          <span className="verified">
            <Check size={9} />
          </span>
        </div>
        <h3>{p.title}</h3>
        <p className="project-tagline">{p.tagline}</p>
        <div className="funding-line">
          <strong>
            {money(p.raised)} <span>raised</span>
          </strong>
          <span>{percent(p)}%</span>
        </div>
        <div className="progress">
          <span style={{ width: `${percent(p)}%` }} />
        </div>
        <div className="project-meta">
          <span>of {money(p.goal)} goal</span>
          <span>
            <Users size={12} />
            {p.backers} backers
          </span>
        </div>
        <div className="card-bottom">
          <span className="return-tag">{p.share}% revenue share</span>
          <span>
            <Clock size={12} />
            {p.days} days left
          </span>
        </div>
      </div>
    </Link>
  );
}
export function Notice() {
  return (
    <p className="notice">
      Prototype · All projects and financial figures are illustrative. No
      investments or payments are available.
    </p>
  );
}
export function SectionHead({
  label,
  title,
  copy,
  action,
}: {
  label: string;
  title: string;
  copy?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <Label>{label}</Label>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  );
}
