import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';
import Gear from '../../components/Gear';
import './index.scss';

const HomePage = () => {
  return (
    <div className="HomePage">
      <section className="HomePage__hero">
        <div className="HomePage__clockwork" aria-hidden="true">
          <Gear className="HomePage__gear-1" size={560} teeth={16} speed={55} />
          <Gear className="HomePage__gear-2" size={340} teeth={12} speed={32} reverse />
          <Gear className="HomePage__gear-3" size={200} teeth={10} speed={18} />
          <Gear className="HomePage__gear-4" size={120} teeth={8} speed={10} reverse />
        </div>

        <div className="HomePage__hero-content">
          <p className="HomePage__eyebrow">Portfolio</p>
          <h1>
            Engineering teams that run <em>like clockwork.</em>
          </h1>
          <p className="HomePage__subtitle">
            Engineering Manager · Platform &amp; Developer Productivity · Berlin
          </p>
          <p className="HomePage__lede">
            Process, velocity, and AI adoption — three gears in one machine.
            Each earns its place; together they keep the work moving.
          </p>
          <Link to={AppRoutes.ResumeBuilder} className="HomePage__cta">
            See my resume →
          </Link>
        </div>
      </section>

      <section className="HomePage__pillars">
        <div className="HomePage__pillars-inner">
          <article className="HomePage__pillar">
            <div className="HomePage__pillar-gear">
              <Gear size={56} teeth={10} speed={22} />
            </div>
            <p className="HomePage__pillar-num">01 · Process</p>
            <h2>The right framework, not the favorite one.</h2>
            <p className="HomePage__pillar-lead">
              Process is a tool. I pick the framework that fits the team's stage — not the other way around.
            </p>
            <ul>
              <li>Waterfall when the unknowns are small and the spec is locked.</li>
              <li>Scrum / Kanban when discovery dominates and feedback loops matter.</li>
              <li>Hybrid sprints with explicit phase gates for migrations.</li>
              <li>Document the <em>why</em> of every choice so the team can revisit it.</li>
            </ul>
          </article>

          <article className="HomePage__pillar">
            <div className="HomePage__pillar-gear">
              <Gear size={56} teeth={12} speed={14} reverse />
            </div>
            <p className="HomePage__pillar-num">02 · Velocity</p>
            <h2>Remove friction, don't push harder.</h2>
            <p className="HomePage__pillar-lead">
              Speed comes from killing systemic blockers — review queues, environments, onboarding — before they kill momentum.
            </p>
            <ul>
              <li>Cycle time from weeks to days via deploy automation + smaller PRs.</li>
              <li>Hiring loops run in days, not months.</li>
              <li>Quarterly cadence: roadmap → OKRs → review. No surprise re-plans.</li>
              <li>Performance reviews driven by evidence, not impression.</li>
            </ul>
          </article>

          <article className="HomePage__pillar">
            <div className="HomePage__pillar-gear">
              <Gear size={56} teeth={8} speed={9} />
            </div>
            <p className="HomePage__pillar-num">03 · AI Adoption</p>
            <h2>Pilot, guardrail, measure — in that order.</h2>
            <p className="HomePage__pillar-lead">
              AI rollouts fail when they're mandates. Pilot first, guardrails second, measurement third, scale last.
            </p>
            <ul>
              <li>Discovery: who's already curious; what they'd unblock first.</li>
              <li>Guardrails: data, security, code review — defined before mandate.</li>
              <li>Measure: adoption rate, cycle-time impact, defect rate after rollout.</li>
              <li>Playbooks so other teams can self-serve.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="HomePage__closing">
        <Gear className="HomePage__closing-gear" size={80} teeth={10} speed={25} />
        <h2>Want to talk?</h2>
        <p>See the resume for past roles, or reach out directly.</p>
        <Link to={AppRoutes.ResumeBuilder} className="HomePage__cta HomePage__cta--alt">
          See my resume →
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
