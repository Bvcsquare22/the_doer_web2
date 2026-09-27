import Layout from '../components/Layout.jsx';
import PartnerForm from '../components/PartnerForm.jsx';
import GlassPanel from '../components/GlassPanel.jsx';
import { BrandChallengePhone, BattlePhone, RewardsPhone } from '../components/Mockups.jsx';
import { ShaderBackdrop, Head } from '../components/Shared.jsx';
import { Arrow, Target, Eye, Chart, Handshake, Trophy, Building, Users, Shield, Phone, Link } from '../components/Icons.jsx';
import { EMAIL, PHONE } from '../config.js';

const CTA = <button className="btn btn-ink btn-sm" data-open-form>Sponsor a challenge</button>;

const FAQ = [
  ['How much does a sponsorship cost?', 'Campaigns are priced by format and length, and the price scales with the audience we can put in front of you. Tell us your goal and budget and we will build a package that fits.'],
  ['Who funds the reward?', 'You do, and you choose it: vouchers, airtime, product, cashback. Doer runs the challenge, verifies every step, and handles who qualifies to redeem.'],
  ['How is activity verified?', 'Doer reads step data from Apple Health and Health Connect with each user\'s permission and runs anti cheat checks, so your reward goes to people who actually walked.'],
  ['What data do we get?', 'Campaign results: joins, daily active walkers, completions, steps logged and redemptions. Never anyone\'s personal details or health records.'],
  ['Can we sponsor a company battle?', 'Yes. Organizations on Doer run branch and department battles every month. You can sponsor the prize for a battle inside one organization, or for a company vs company battle.'],
];

export default function Brands() {
  return (
    <Layout
      page="brands"
      cta={CTA}
      sideLeft={<>SPONSOR <b>·</b> VERIFY <b>·</b> BELONG</>}
      sideRight={<>DOER <b>/</b> FOR BRANDS</>}
      modal={<PartnerForm kind="brand" />}
    >
      {/* HERO */}
      <header className="page-hero has-shader" data-label="START" data-theme="dark">
        <ShaderBackdrop preset="ink" speed={0.22} />
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Doer for brands</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(46px, 6.6vw, 100px)' }}>Don't interrupt people. <span className="gold">Be part of their win.</span></h1>
            <p className="lede">Sponsor a walking challenge on Doer and your airtime, voucher or product becomes the prize thousands of people walk for. For 7 to 30 days your brand sits inside a goal they chase every day, and when they win, your brand is the win.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" data-open-form>Sponsor a challenge <Arrow /></button>
              <a href="#formats" className="btn btn-ghost on-dark">See the formats</a>
            </div>
          </div>
          <div className="glass-panel-wrap">
            <GlassPanel>
              <div className="gp-head"><span>Why it works</span><span className="app-pill live">Opt in</span></div>
              <div className="gp-big">54%+</div>
              <div style={{ marginTop: -8, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,225,.75)' }}>of digital ads are never actually seen, even though every impression is paid for.</div>
              <div className="gp-row">
                <div><b>7 to 30</b><span>days of daily brand presence</span></div>
                <div><b>Daily</b><span>verified activity data</span></div>
              </div>
              <div className="gp-note">Source: comScore, Google Active View.</div>
            </GlassPanel>
          </div>
        </div>
      </header>

      {/* WHO YOU REACH */}
      <div className="facts" data-theme="light" aria-label="Who you reach">
        <div><b>18 to 34</b><span>smartphone users in Lagos and Abuja</span></div>
        <div><b>Daily</b><span>opens for the length of your challenge</span></div>
        <div><b>Workforces</b><span>inside banks, agencies and companies</span></div>
        <div><b>Verified</b><span>steps, joins and redemptions</span></div>
      </div>

      {/* COMPARE */}
      <section className="section" data-label="THE PROBLEM" data-theme="light">
        <div className="wrap">
          <Head eyebrow="The problem with ads">An ad gets two seconds. <span className="gold">A Doer challenge gets days.</span></Head>
          <div className="compare">
            <div className="old reveal">
              <h3>A typical digital campaign</h3>
              <ul>
                <li>Paid impressions, most never seen</li>
                <li>Two seconds of attention, then a skip</li>
                <li>Reach you estimate, engagement you guess</li>
                <li>Your brand next to whatever is in the feed</li>
              </ul>
            </div>
            <div className="new reveal d1">
              <h3>A Doer challenge</h3>
              <ul>
                <li>People choose to join, nobody is interrupted</li>
                <li>Daily presence for 7 to 30 days</li>
                <li>Every step, join and redemption verified</li>
                <li>Your brand attached to a personal win</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT A CHALLENGE LOOKS LIKE */}
      <section className="section dark" data-label="YOUR CHALLENGE" data-theme="dark">
        <div className="wrap split">
          <div className="reveal">
            <Head eyebrow="What your challenge looks like">Your name. Your colors. <span className="gold">Your reward.</span></Head>
            <div className="battle-points">
              <div><span className="ico"><Target /></span><div><b>A branded challenge page</b><p>A fully branded destination people open every day, not a placement they scroll past.</p></div></div>
              <div><span className="ico"><Eye /></span><div><b>Everywhere the walk goes</b><p>Your brand sits on the challenge card, the leaderboard and the reward screen. Every step, it is there.</p></div></div>
              <div><span className="ico"><Trophy /></span><div><b>The moment they win</b><p>When someone hits the goal and claims your reward, your brand is the feeling of that win.</p></div></div>
            </div>
          </div>
          <div className="brand-duo reveal d2">
            <BrandChallengePhone />
            <RewardsPhone w={250} />
          </div>
        </div>
        <p className="mock-note wrap" style={{ marginTop: 10 }}>Current Doer interface, illustrative brand and numbers.</p>
      </section>

      {/* FORMATS */}
      <section className="section" id="formats" data-label="FORMATS" data-theme="light">
        <div className="wrap">
          <Head eyebrow="Challenge formats" lede="Every format gives your brand a different kind of presence. Pick what matches your campaign.">Find the format that <span className="gold">fits your campaign.</span></Head>
          <div className="feat-grid reveal">
            <div className="feat"><span className="ico"><span className="mark" style={{ fontSize: 18 }}>7D</span></span><h3>7 Day Challenge</h3><p>A week of daily step targets. Fast, focused and high engagement. Built for launches and short campaign windows.</p></div>
            <div className="feat"><span className="ico"><span className="mark" style={{ fontSize: 18 }}>14D</span></span><h3>14 Day Challenge</h3><p>Two weeks of daily presence. Long enough to build a habit between your brand and someone's walk.</p></div>
            <div className="feat"><span className="ico"><span className="mark" style={{ fontSize: 18 }}>30D</span></span><h3>30 Day Challenge</h3><p>A full month. The deepest integration on Doer: people wake up every day with your brand attached to their goal.</p></div>
            <div className="feat"><span className="ico"><Users /></span><h3>Team battle sponsorship</h3><p>Two groups compete, one wins, and your brand funds the prize. The rivalry drives the engagement.</p></div>
            <div className="feat"><span className="ico"><Building /></span><h3>Sponsor a company battle</h3><p>Back the monthly branch battle inside an organization, or a company vs company showdown. Your brand in front of whole workforces.</p></div>
            <div className="feat"><span className="ico"><Handshake /></span><h3>Built with you</h3><p>From brief to launch, our team designs the challenge around your goal. You pick the reward: airtime, data, vouchers, product, cashback. We handle the rest.</p></div>
          </div>
        </div>
      </section>

      {/* BATTLE SPONSORSHIP */}
      <section className="section dark ink2" data-label="BATTLES" data-theme="dark">
        <div className="wrap split">
          <div className="battle-stage reveal">
            <div className="battle-glow" />
            <BattlePhone title="Branch League, sponsored" reward="Your brand's voucher for every winner" />
          </div>
          <div className="reveal d1">
            <Head eyebrow="Sponsor the rivalry">Put your brand <span className="gold">at the center of a rivalry.</span></Head>
            <p className="lede">Doer battles pit branches, departments, companies and walking groups against each other on a live leaderboard. Everyone checks the board. Everyone knows who put up the prize.</p>
            <div className="formats" style={{ marginTop: 20 }}>
              <span><b>VS</b>Group vs group</span>
              <span><b>HQ</b>Branch vs branch</span>
              <span><b>CO</b>Company vs company</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section paper" id="data" data-label="WHAT YOU GET" data-theme="light">
        <div className="wrap">
          <Head eyebrow="What you get">Real numbers. <span className="gold">Real accountability.</span></Head>
          <div className="feat-grid reveal">
            <div className="feat"><span className="ico"><Chart /></span><h3>A live campaign dashboard</h3><p>Joins, daily active walkers, completions, steps logged and redemptions, updating as the challenge runs.</p></div>
            <div className="feat"><span className="ico"><Shield /></span><h3>Verified activity</h3><p>Steps come from Apple Health and Health Connect with anti cheat checks, so rewards go to people who actually walked.</p></div>
            <div className="feat"><span className="ico"><Target /></span><h3>Pay for movement</h3><p>You are paying for people who chose to engage every day, not for impressions nobody saw.</p></div>
          </div>
          <p className="source">Brands see campaign performance only. Users' personal details and health data are never shared or sold.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" data-label="FAQ" data-theme="light">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <Head eyebrow="FAQ">Questions brands <span className="gold">usually ask.</span></Head>
          <div className="faq reveal d1">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gold-bg has-shader" id="contact" data-label="SPONSOR" data-theme="light">
        <ShaderBackdrop preset="gold" speed={0.22} />
        <div className="wrap ask">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ink)' }}>Get started</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', marginTop: 16 }}>Don't advertise. <span className="outline">Belong.</span></h2>
            <p className="lede" style={{ color: 'rgba(13,13,13,.78)', marginTop: 20 }}>Tell us about your brand and your goal. Our partnerships team replies within 48 hours with a challenge built around it.</p>
            <div className="hero-actions" style={{ marginTop: 26 }}>
              <button className="btn btn-ink" data-open-form>Sponsor a challenge <Arrow /></button>
            </div>
          </div>
          <div className="contact-card reveal d1">
            <div><small>Brand partnerships</small><b style={{ fontSize: 22 }}>Talk to our team</b><div style={{ color: 'rgba(240,235,225,.6)', fontSize: 14 }}>Response within 48 hours</div></div>
            <div className="row"><span className="ic"><Link /></span><div><small>Email</small><a href={`mailto:${EMAIL.partnerships}`}><b>{EMAIL.partnerships}</b></a></div></div>
            <div className="row"><span className="ic"><Phone /></span><div><small>Phone / WhatsApp</small><a href={`tel:${PHONE.tel}`}><b>{PHONE.display}</b></a></div></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
