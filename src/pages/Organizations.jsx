import Layout from '../components/Layout.jsx';
import PartnerForm from '../components/PartnerForm.jsx';
import GlassPanel from '../components/GlassPanel.jsx';
import { JoinPhone, BattlePhone, Dashboard } from '../components/Mockups.jsx';
import { ShaderBackdrop, Head } from '../components/Shared.jsx';
import { Arrow, Lock, Users, Phone, Shield, Building, Bars, Chart, Eye, Gift, Link, Clock } from '../components/Icons.jsx';
import { EMAIL, PHONE } from '../config.js';

const BOOK = <button className="btn btn-ink btn-sm" data-open-form>Book 15 minutes</button>;

const FAQ = [
  ['How much does it cost?', 'Doer runs as a recurring monthly programme, priced per branch. The monthly rewards we put up are already funded, so your cost is the programme, not the prizes. Tell us your size and structure and we will send a quote.'],
  ['What does our IT team need to do?', 'Nothing. There is nothing to integrate with your core systems and nothing to install on company devices. Staff download Doer on the phones they already own and join with your private link.'],
  ['Who can see our staff data?', 'Only your organization. Your staff get a private space inside Doer that no other organization can see. Access is controlled and data is encrypted. Staff can appear on leaderboards under a display name that is not linked to their real name, and personal health data is never sold.'],
  ['What if a branch is much bigger than another?', 'It does not matter. Every leaderboard runs on average steps per person, not total steps, so a branch of 20 competes fairly with a branch of 200.'],
  ['How fast can we launch?', 'Days, not months. We create your private space, load your branches and departments, and you share one link with staff.'],
  ['Can we compete against another company?', 'Yes. Beyond internal battles, organizations can take on other organizations in company vs company step battles, and brands can sponsor those battles.'],
];

export default function Organizations() {
  return (
    <Layout
      page="organizations"
      cta={BOOK}
      sideLeft={<>BRANCH <b>·</b> DEPARTMENT <b>·</b> ORGANIZATION</>}
      sideRight={<>DOER <b>/</b> FOR ORGANIZATIONS</>}
      modal={<PartnerForm kind="organization" />}
    >
      {/* HERO on an ink + gold shader, with a glass stats panel */}
      <header className="page-hero has-shader" data-label="START" data-theme="dark">
        <ShaderBackdrop preset="ink" speed={0.2} />
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Doer for organizations</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(46px, 6.6vw, 100px)' }}>Turn your branches into <span className="gold">a step league.</span></h1>
            <p className="lede">Doer is a monthly walking competition for your staff. Branch against branch, department against department, on the phones they already own. We set it up, fund the monthly rewards and give HR a live dashboard. Your team does zero extra work.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" data-open-form>Book 15 minutes <Arrow /></button>
              <a href="#how" className="btn btn-ghost on-dark">See how it works</a>
            </div>
          </div>
          <div className="glass-panel-wrap">
            <GlassPanel>
              <div className="gp-head"><span>Live · federal agency</span><span className="app-pill live">Walking now</span></div>
              <div className="gp-big" data-count="1039743">0</div>
              <div style={{ marginTop: -8, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,225,.7)' }}>steps in the first nine days of September</div>
              <div className="gp-row">
                <div><b data-count="78" data-suffix="%">0</b><span>of staff walking</span></div>
                <div><b data-count="17">0</b><span>days, no gaps</span></div>
              </div>
              <div className="gp-note">From Doer's live system, 9 September 2026.</div>
            </GlassPanel>
          </div>
        </div>
      </header>

      {/* KEY FACTS */}
      <div className="facts" data-theme="light" aria-label="Key facts">
        <div><b>Days</b><span>from yes to your first battle</span></div>
        <div><b>0</b><span>IT integrations or devices</span></div>
        <div><b>Funded</b><span>monthly rewards, by Doer</span></div>
        <div><b>Live</b><span>dashboard and monthly reports</span></div>
      </div>

      {/* BUILT FOR */}
      <section className="section dark" data-label="BUILT FOR" data-theme="dark">
        <div className="wrap">
          <Head eyebrow="Built for">Wherever people work <span className="gold">in teams.</span></Head>
          <div className="tiers">
            <div className="tier hot reveal" style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              <span className="badge" style={{ color: 'var(--ink)' }}>BANKS</span>
              <h3 className="h3">Every branch on one board</h3>
              <p className="body" style={{ color: 'rgba(13,13,13,.75)' }}>Built for banks with dozens of branches and staff under real pressure. A measurable programme you can report against NSBP, Responsible Banking and ESG commitments.</p>
            </div>
            <div className="tier hot reveal d1" style={{ background: 'var(--ink-3)' }}>
              <span className="badge">AGENCIES</span>
              <h3 className="h3">Already live in government</h3>
              <p className="body">A federal agency's staff have walked on Doer every day since August. Departments compete, and agencies can take on other agencies.</p>
            </div>
            <div className="tier hot reveal d2" style={{ background: 'var(--ink-3)' }}>
              <span className="badge">COMPANIES</span>
              <h3 className="h3">Any team, any size</h3>
              <p className="body">Head office against the field team, Lagos against Abuja, Sales against Support. If your people have rivals, Doer gives it a scoreboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHORT VERSION */}
      <section className="section" data-label="THE SHORT VERSION" data-theme="light">
        <div className="wrap">
          <Head eyebrow="First, the short version" lede="Doer is a phone app that counts your staff's steps automatically and rewards them for walking. Nobody logs anything or fills in a form. It just runs in the background while they walk.">Doer counts steps. <span className="gold">Your teams compete.</span> Everyone wins something.</Head>
          <div className="feat-grid reveal" style={{ gridTemplateColumns: undefined }}>
            <div className="feat"><span className="ico"><Lock /></span><h3>Private to your organization</h3><p>Your staff get their own space in the app. Nobody else sees your numbers.</p></div>
            <div className="feat"><span className="ico"><Users /></span><h3>Built for teams</h3><p>Steps roll up into departments and branches, so people walk for their team, not just themselves.</p></div>
            <div className="feat"><span className="ico"><Phone /></span><h3>Runs on phones they already own</h3><p>No wearables to buy, nothing for IT to install.</p></div>
            <div className="feat"><span className="ico"><Shield /></span><h3>Access controlled and encrypted</h3><p>Your staff data stays inside your own private space, never visible to any other organization on Doer.</p></div>
            <div className="feat"><span className="ico"><Eye /></span><h3>Identity, their call</h3><p>Staff can show up under a display name like QuietStepper that is not linked to their real name.</p></div>
            <div className="feat"><span className="ico"><Gift /></span><h3>Rewards already funded</h3><p>Every month Doer puts up real rewards for your staff. You can layer your own on top.</p></div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section paper" data-label="WHY IT MATTERS" data-theme="light">
        <div className="wrap">
          <div className="split wide-left" style={{ alignItems: 'end', marginBottom: 'clamp(36px,5vw,56px)' }}>
            <div className="head reveal" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Why it matters</span>
              <h2 className="h2">Walking regularly cuts <span className="gold">health risk and sick days.</span></h2>
            </div>
            <p className="lede reveal d1">Your staff already walk together sometimes. Without a tool for it, that stays occasional. The benefit comes from doing it repeatedly, not from one big day out.</p>
          </div>
          <div className="stats" style={{ gridTemplateColumns: undefined }}>
            <div className="stat reveal"><div className="v" data-count="47" data-suffix="%">0</div><p>lower risk of dying from any cause when walking 7,000 steps a day instead of 2,000. Cardiovascular risk drops 25%.</p></div>
            <div className="stat reveal d1"><div className="v" data-count="16" data-suffix="%">0</div><p>less absenteeism in workplaces running consistent wellness programmes.</p></div>
            <div className="stat reveal d2"><div className="v">1M+</div><p>people die from cardiovascular disease across Africa every year. Physical inactivity is one of the biggest drivers.</p></div>
          </div>
          <p className="source">Sources: The Lancet Public Health, 2025 (57 study review, 160,000+ adults) · WHO African Region cardiovascular data · workplace wellness absenteeism research.</p>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="section dark" data-label="WHY NOW" data-theme="dark">
        <div className="wrap split">
          <div className="reveal">
            <Head eyebrow="Why now">Burnout is already <span className="gold">in the numbers.</span></Head>
            <div className="callout">A few organizations run staff wellness walks, but they tend to be one off events or a single week in the year. <b>Nobody has turned it into a running monthly programme with real rewards, until now.</b> It also gives you something measurable to report against your wellbeing, ESG and responsible business commitments.</div>
          </div>
          <div className="reveal d1" style={{ display: 'grid', gap: 14 }}>
            <div className="stat"><div className="v" data-count="64" data-suffix="%">0</div><p>of Nigerian employees were found to be at risk of burnout in a national workforce survey.</p></div>
            <div className="stat"><div className="v">12.5% → 28.1%</div><p>the rise in Nigerian bank staff turnover in a single year, driven largely by overwork. Clinical research now links burnout and hypertension in bank employees.</p></div>
            <p className="source" style={{ marginTop: 0 }}>Sources: WellNewMe national workforce survey, reported by The Guardian Nigeria (2020) · Asian Journal of Social Sciences and Management Studies, 2023.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" data-label="HOW IT WORKS" data-theme="light">
        <div className="wrap">
          <Head eyebrow="How it works" lede="You get a private group inside Doer. Staff join with a link you share internally and land in the right department and branch automatically. Every month, Doer runs step challenges at whichever level you want.">Compete by branch, department, <span className="gold">or the whole organization.</span></Head>
          <div className="tiers">
            <div className="tier hot reveal"><span className="badge">HQ</span><h3 className="h3">Branch vs branch</h3><p className="body">Every branch ranked at once, from head office to the smallest location.</p></div>
            <div className="tier reveal d1"><span className="badge">DPT</span><h3 className="h3">Department vs department</h3><p className="body">Retail against Operations, Sales against Support, however you split it.</p></div>
            <div className="tier reveal d2"><span className="badge">ALL</span><h3 className="h3">Organization wide</h3><p className="body">One leaderboard, everyone ranked together, not just inside their branch or team.</p></div>
          </div>
          <div className="callout reveal" style={{ marginTop: 16 }}><b>Fair by design.</b> Every leaderboard runs on average steps per person, not totals, so a small branch competes fairly against a large one. Your admin can set up each challenge, or we run it end to end.</div>
          <div className="screens" style={{ marginTop: 40 }}>
            <figure className="reveal"><JoinPhone /><figcaption><span>01</span>Staff join with your link</figcaption></figure>
            <figure className="reveal d1"><BattlePhone w={250} /><figcaption><span>02</span>Branches battle monthly</figcaption></figure>
          </div>
          <p className="mock-note" style={{ justifyContent: 'center' }}>Current Doer interface, illustrative names and numbers.</p>
        </div>
      </section>

      {/* FIRST MONTH */}
      <section className="section paper" data-label="YOUR FIRST MONTH" data-theme="light">
        <div className="wrap">
          <Head eyebrow="Your first month">What happens <span className="gold">after you say yes.</span></Head>
          <ol className="timeline">
            <li className="reveal"><span className="tl-k">WEEK 1</span><b>We build your space</b><p>Your private group, branches and departments loaded. One invite link goes out to staff.</p></li>
            <li className="reveal d1"><span className="tl-k">WEEK 2</span><b>The first battle starts</b><p>Branch vs branch goes live. Staff see where their team ranks the moment they open the app.</p></li>
            <li className="reveal d2"><span className="tl-k">WEEKS 2 TO 4</span><b>The rivalry does the work</b><p>Leaderboards move daily. HR watches participation live without sending a single reminder.</p></li>
            <li className="reveal d3"><span className="tl-k">END OF MONTH</span><b>Winners, rewards, report</b><p>Top walkers and the winning branch collect their rewards. You get a report on steps, streaks and participation.</p></li>
          </ol>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="section dark ink2" data-label="THE DASHBOARD" data-theme="dark">
        <div className="wrap">
          <Head eyebrow="What HR sees">A live view of your <span className="gold">whole organization.</span></Head>
          <div className="reveal"><Dashboard /></div>
          <p className="mock-note">Real Doer admin layout, illustrative organization and data.</p>
          <div className="feat-grid reveal" style={{ marginTop: 36 }}>
            <div className="feat"><span className="ico"><Chart /></span><h3>Participation, in real time</h3><p>See who is active and who has gone quiet, by branch or department, without chasing anyone.</p></div>
            <div className="feat"><span className="ico"><Clock /></span><h3>Launch a battle in two minutes</h3><p>Name it, pick the branches, set a reward and a duration. No ticket, no spreadsheet.</p></div>
            <div className="feat"><span className="ico"><Bars /></span><h3>Monthly reports</h3><p>Steps, streaks and participation by team, ready for your wellbeing and ESG reporting.</p></div>
          </div>
        </div>
      </section>

      {/* REWARDS */}
      <section className="section" data-label="REWARDS" data-theme="light">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="reveal">
            <Head eyebrow="The rewards">Real rewards for your staff, <span className="gold">already funded.</span></Head>
            <div className="callout">Every month, <b>we put up real rewards for your staff</b>, like airtime and vouchers. We also run Doer WalkClub, and we can organize monthly walking retreats for your teams, fully organized on our end. All they have to do is show up.</div>
          </div>
          <div className="reveal d1">
            <p className="lede" style={{ marginBottom: 14 }}>Then layer on your own incentives. From our work with a federal government agency, these work well:</p>
            <ol className="incentives">
              <li>An extra paid day off for the top walker of the month</li>
              <li>Vouchers or airtime for the top three</li>
              <li>A trophy the winning branch keeps until someone takes it from them</li>
            </ol>
            <p className="source">The app counts steps, ranks branches and picks the winner automatically.</p>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="section dark" id="proof" data-label="PROOF" data-theme="dark">
        <div className="wrap">
          <div className="split wide-left" style={{ alignItems: 'end', marginBottom: 'clamp(36px,5vw,60px)' }}>
            <div className="head reveal" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Proof it works</span>
              <h2 className="h2">Already live inside a <span className="gold">federal government agency.</span></h2>
            </div>
            <p className="lede reveal d1">Their staff have walked on Doer every day since August, and a walkathon challenge is running through the end of September. We can show you the same dashboard in the meeting.</p>
          </div>
          <div className="stats">
            <div className="stat reveal"><div className="v" data-count="1039743">0</div><p>steps walked in the first nine days of September</p></div>
            <div className="stat reveal d1"><div className="v" data-count="78" data-suffix="%">0</div><p>of their staff walking, not just signed up</p></div>
            <div className="stat reveal d2"><div className="v" data-count="17" data-suffix=" days">0</div><p>in a row with steps logged, no gaps</p></div>
          </div>
          <p className="source">Figures taken from Doer's live system on 9 September 2026.</p>
        </div>
      </section>

      {/* ZERO EXTRA WORK */}
      <section className="section dark ink2" data-label="ZERO EXTRA WORK" data-theme="dark">
        <div className="wrap">
          <Head eyebrow="What it takes from you">None of this is <span className="gold">extra work</span> for your team.</Head>
          <div className="steps">
            <div className="step reveal"><span className="num">01</span><h3 className="h3">We set it up</h3><p className="body">We create your private group and load in your departments and branches.</p></div>
            <div className="step reveal d1"><span className="num">02</span><h3 className="h3">Staff join with a link</h3><p className="body">Shared however you already reach your people: email, WhatsApp, the intranet.</p></div>
            <div className="step reveal d2"><span className="num">03</span><h3 className="h3">You choose who runs it</h3><p className="body">Your admin creates each challenge, or we run it end to end.</p></div>
          </div>
          <div className="zero reveal" style={{ marginTop: 16 }}>
            <div><b>0</b><span>integrations with your core systems</span></div>
            <div><b>0</b><span>devices to procure</span></div>
            <div><b>0</b><span>new headcount needed in HR</span></div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section paper" data-label="THE DIFFERENCE" data-theme="light">
        <div className="wrap">
          <Head eyebrow="The difference">Wellness programmes get ignored. <span className="gold">A goal with a reward doesn't.</span></Head>
          <div className="compare">
            <div className="old reveal">
              <h3>A typical wellness programme</h3>
              <ul>
                <li>One walk a year, then nothing until next year</li>
                <li>Reminder emails nobody opens</li>
                <li>Participation guessed from a sign up sheet</li>
                <li>Hard to report anything measurable</li>
              </ul>
            </div>
            <div className="new reveal d1">
              <h3>Doer</h3>
              <ul>
                <li>A running monthly programme with a live leaderboard</li>
                <li>Team rivalry does the reminding for you</li>
                <li>Real participation by branch and department, live</li>
                <li>Monthly reports on steps, streaks and engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" data-label="FAQ" data-theme="light">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <Head eyebrow="FAQ">Questions HR <span className="gold">usually asks.</span></Head>
          <div className="faq reveal d1">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* THE ASK */}
      <section className="section gold-bg has-shader" id="contact" data-label="THE ASK" data-theme="light">
        <ShaderBackdrop preset="gold" speed={0.22} />
        <div className="wrap ask">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ink)' }}>The ask</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', marginTop: 16 }}>Fifteen minutes of your time.</h2>
            <p className="lede" style={{ color: 'rgba(13,13,13,.78)', marginTop: 20 }}>Long enough to show you the app working, walk through what a first month at your organization would look like, and answer whatever your team wants to ask. If it is not right for you, that is a fair answer, and it cost you fifteen minutes.</p>
            <div className="hero-actions" style={{ marginTop: 26 }}>
              <button className="btn btn-ink" data-open-form>Book 15 minutes <Arrow /></button>
            </div>
          </div>
          <div className="contact-card reveal d1">
            <div><small>Talk to the founder</small><b style={{ fontSize: 22 }}>Charles Victor Chikwado</b><div style={{ color: 'rgba(240,235,225,.6)', fontSize: 14 }}>Founder &amp; CEO, De Doers Limited</div></div>
            <div className="row"><span className="ic"><Link /></span><div><small>Email</small><a href={`mailto:${EMAIL.founder}`}><b>{EMAIL.founder}</b></a></div></div>
            <div className="row"><span className="ic"><Phone /></span><div><small>Phone / WhatsApp</small><a href={`tel:${PHONE.tel}`}><b>{PHONE.display}</b></a></div></div>
            <div className="row"><span className="ic"><Building /></span><div><small>Partnerships</small><a href={`mailto:${EMAIL.partnerships}`}><b>{EMAIL.partnerships}</b></a></div></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
