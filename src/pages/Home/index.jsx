import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';
import './index.scss';

const HomePage = () => {
  return (
    <div className="HomePage">
      <section className="HomePage__hero">
        <p className="HomePage__eyebrow">Portfolio</p>
        <h1>I build engineering teams that ship.</h1>
        <p className="HomePage__subtitle">
          Engineering Manager · Platform &amp; Developer Productivity · Berlin
        </p>
        <p className="HomePage__lede">
          Process that fits the team's stage. Velocity from removing friction.
          AI rollouts that don't burn out the people doing the work.
        </p>
        <Link to={AppRoutes.ResumeBuilder} className="HomePage__cta">
          See my resume →
        </Link>
      </section>

      <section className="HomePage__pillars">
        <article className="HomePage__pillar">
          <div className="HomePage__pillar-num">01</div>
          <h2>Process</h2>
          <p className="HomePage__pillar-lead">
            Process is a tool, not an identity. I pick the framework that fits the team's stage — not the other way around.
          </p>
          <ul>
            <li>Waterfall when the unknowns are small and the spec is locked.</li>
            <li>Scrum / Kanban when discovery dominates and feedback loops matter.</li>
            <li>Hybrid sprints with explicit phase gates for migrations.</li>
            <li>Document the <em>why</em> of every choice so the team can revisit it.</li>
          </ul>
        </article>

        <article className="HomePage__pillar">
          <div className="HomePage__pillar-num">02</div>
          <h2>Velocity</h2>
          <p className="HomePage__pillar-lead">
            Speed comes from removing friction, not pushing harder. The systemic blockers — review queues, environments, onboarding — get fixed first.
          </p>
          <ul>
            <li>Cycle time from weeks to days via deploy automation + smaller PRs.</li>
            <li>Hiring loops run in days, not months.</li>
            <li>Quarterly cadence: roadmap → OKRs → review. No surprise re-plans.</li>
            <li>Performance reviews driven by evidence, not impression.</li>
          </ul>
        </article>

        <article className="HomePage__pillar">
          <div className="HomePage__pillar-num">03</div>
          <h2>AI Adoption</h2>
          <p className="HomePage__pillar-lead">
            AI rollouts fail when they're mandates. Start with a pilot team, build guardrails before scaling, measure adoption as a leading indicator.
          </p>
          <ul>
            <li>Discovery: who's already curious; what they'd unblock first.</li>
            <li>Guardrails: data, security, code review — defined before mandate.</li>
            <li>Measure: adoption rate, cycle-time impact, defect rate after rollout.</li>
            <li>Playbooks so other teams can self-serve.</li>
          </ul>
        </article>
      </section>

      <section className="HomePage__closing">
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
