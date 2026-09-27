import Layout from '../components/Layout.jsx';
import ScrollHero from '../components/ScrollHero.jsx';
import { BattlePhone, StreakPhone, JoinPhone, RewardsPhone } from '../components/Mockups.jsx';
import { StoreButtons, ShaderBackdrop, Head } from '../components/Shared.jsx';
import { Arrow, Bars, Trophy, Gift } from '../components/Icons.jsx';
import { EMAIL } from '../config.js';

const MARQUEE = ['Walk', 'Compete', 'Get rewarded', 'Branch vs branch', 'Team vs team', 'Real prizes', 'No gym needed'];

const FAQ = [
  ['Is Doer free?', 'Yes. Doer is free to download and free to use. Brands and organizations fund the rewards, you just show up and walk.'],
  ['Are the rewards real?', 'Yes. When you complete a challenge you earn things like airtime, food vouchers and cash rewards from the brand or organization behind it. Redeemable in the real world, not points on a screen.'],
  ['How does Doer count my steps?', 'Doer reads step data from Apple Health on iPhone and Health Connect on Android, only with your permission. No wearable or extra hardware needed.'],
  ['What is a battle?', 'A team competition. Groups, departments or branches go head to head on a live leaderboard for a set time. Scores are average steps per person, so small teams can beat big ones. The winning team takes the prize.'],
  ['Can my company use Doer?', <>Yes. Organizations get a private space, their own leaderboards and a live admin dashboard. <a href="/organizations.html">See Doer for organizations</a>.</>],
  ['Is my data safe?', <>Your personal and health data is never sold. Sponsors see campaign results like steps logged, completions and redemptions, never your personal details. Company data stays inside that company's private space. Read our <a href="/privacy.html">privacy policy</a>.</>],
  ['Where is Doer available?', 'Doer is live on the App Store and Google Play, starting in Nigeria with Abuja and Lagos. More cities are coming.'],
];

export default function Home() {
  return (
    <Layout
      page="home"
      cta={<a href="#download" className="btn btn-ink btn-sm">Get the app</a>}
      sideLeft={<>WALK <b>·</b> COMPETE <b>·</b> EARN <b>·</b> REPEAT</>}
      sideRight={<>DOER <b>/</b> ABUJA <b>·</b> LAGOS <b>/</b> EST. 2025</>}
    >
      <ScrollHero />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* WHAT · WHO · HOW */}
      <section className="section" data-label="WHAT · WHO · HOW" data-theme="light">
        <div className="wrap">
          <Head eyebrow="Doer in three lines">Most people will never step inside a gym. <span className="gold">We built for them.</span></Head>
          <div className="wwh">
            <div className="wwh-row reveal"><span className="k">WHAT</span><span className="q">What we do</span><p className="a">We turn walking into something worth showing up for. Doer counts your steps automatically, puts you in <em>challenges and team battles</em>, and pays out real rewards when you hit the goal.</p></div>
            <div className="wwh-row reveal"><span className="k">WHO</span><span className="q">Who we serve</span><p className="a"><em>Everyday people</em> who know they should move more. <em>Organizations</em> that want healthier, closer teams. <em>Brands</em> that want to be part of a win instead of an ad people skip.</p></div>
            <div className="wwh-row reveal"><span className="k">HOW</span><span className="q">How we serve them</span><p className="a">People walk for free. Companies run <em>monthly step battles</em> between branches and departments with a live dashboard. Brands <em>sponsor challenges</em> and fund the prizes. Everyone is paid in the same currency: movement.</p></div>
          </div>
        </div>
      </section>

      {/* HEADLINE FEATURE: BATTLES */}
      <section className="section dark has-shader" id="battles" data-label="BATTLES" data-theme="dark">
        <ShaderBackdrop preset="night" speed={0.15} />
        <div className="wrap split">
          <div className="reveal">
            <div className="head" style={{ marginBottom: 28 }}>
              <span className="eyebrow">The headline feature</span>
              <h2 className="h1">Battles. <span className="gold">Your team</span> vs <span className="outline">theirs.</span></h2>
              <p className="lede">Nobody walks harder than someone walking for their team. Doer battles put groups head to head on a live leaderboard, run for a week or a month, and hand the winners a real prize.</p>
            </div>
            <div className="battle-points">
              <div><span className="ico"><Bars /></span><div><b>Fair by design</b><p>Every board runs on average steps per person, not totals. A branch of 20 can beat a branch of 200.</p></div></div>
              <div><span className="ico"><Trophy /></span><div><b>Winners picked automatically</b><p>The app counts steps, ranks teams and names the winner. No spreadsheets, no disputes.</p></div></div>
              <div><span className="ico"><Gift /></span><div><b>Prizes worth the walk</b><p>Vouchers, airtime, food, cashback, paid days off, and a trophy the winners keep until someone takes it.</p></div></div>
            </div>
            <div className="formats">
              <span><b>VS</b>Group vs group</span>
              <span><b>HQ</b>Branch vs branch</span>
              <span><b>DPT</b>Department vs department</span>
              <span><b>ALL</b>Organization wide</span>
            </div>
          </div>
          <div className="battle-stage reveal d2">
            <div className="battle-glow" />
            <BattlePhone />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" data-label="HOW IT WORKS" data-theme="light">
        <div className="wrap">
          <Head eyebrow="How it works" lede="Doer runs in the background on the phone you already own. Nobody logs anything or fills in a form.">Three steps. <span className="gold">No gym.</span> No gear.</Head>
          <div className="steps">
            <div className="step reveal"><span className="num">01</span><h3 className="h3">Join a challenge</h3><p className="body">Pick a sponsored challenge, join your company's private space, or start a group with friends. One tap and you are in.</p></div>
            <div className="step reveal d1"><span className="num">02</span><h3 className="h3">Just walk</h3><p className="body">Doer reads your steps from Apple Health or Health Connect, with your permission. Your streak grows, your rank moves, your team climbs.</p></div>
            <div className="step reveal d2"><span className="num">03</span><h3 className="h3">Claim the reward</h3><p className="body">Hit the goal and the prize is yours. Not points. Not coins. Airtime, food, vouchers and cash rewards from real brands.</p></div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section dark" id="who" data-label="WHO WE SERVE" data-theme="dark">
        <div className="wrap">
          <Head eyebrow="Who we serve">One app. <span className="gold">Three people</span> it was built for.</Head>
          <div className="aud">
            <a className="aud-card reveal" href="#download">
              <span className="tag">01 · PEOPLE</span>
              <h3 className="h3">For people who want a reason to move</h3>
              <p>90% of people who start a fitness journey quit within three months. Not because they are lazy. Because nothing is waiting on day four. Doer puts something there.</p>
              <ul><li>Free to download, free to play</li><li>Streaks, badges and leaderboards</li><li>Walk clubs in Abuja and Lagos</li><li>Real rewards, redeemable in the real world</li></ul>
              <span className="go">Download Doer <Arrow /></span>
            </a>
            <a className="aud-card feature reveal d1" href="/organizations.html">
              <span className="tag">02 · ORGANIZATIONS</span>
              <h3 className="h3">For companies that want healthier teams</h3>
              <p>A monthly wellness programme your staff actually use. Branches and departments compete, HR watches it live, and it costs your team zero extra work.</p>
              <ul><li>A private space only your staff can see</li><li>Branch vs branch, department vs department</li><li>Live participation dashboard and reports</li><li>Monthly rewards, already funded</li></ul>
              <span className="go">See Doer for organizations <Arrow /></span>
            </a>
            <a className="aud-card reveal d2" href="/brands.html">
              <span className="tag">03 · BRANDS</span>
              <h3 className="h3">For brands tired of being skipped</h3>
              <p>Over half of digital ads are never actually seen. A Doer challenge is chosen. People opt in and carry your brand with them for 7 to 30 days.</p>
              <ul><li>Fully branded challenge pages</li><li>Sponsor public challenges or company battles</li><li>Verified steps, joins and redemptions</li><li>Pay for movement, not impressions</li></ul>
              <span className="go">Sponsor a challenge <Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* INSIDE THE APP */}
      <section className="section paper" data-label="INSIDE THE APP" data-theme="light">
        <div className="wrap">
          <Head eyebrow="Inside the app" center>Built to make you <span className="gold">show up tomorrow.</span></Head>
          <div className="screens">
            <figure className="reveal"><StreakPhone /><figcaption><span>01</span>Streaks that build habits</figcaption></figure>
            <figure className="reveal d1"><JoinPhone /><figcaption><span>02</span>Private spaces for teams</figcaption></figure>
            <figure className="reveal d2"><RewardsPhone /><figcaption><span>03</span>Rewards that are real</figcaption></figure>
          </div>
          <p className="mock-note" style={{ justifyContent: 'center' }}>Current Doer interface, illustrative names and numbers.</p>
        </div>
      </section>

      {/* PROOF */}
      <section className="section dark" data-label="PROOF" data-theme="dark">
        <div className="wrap">
          <div className="split wide-left" style={{ alignItems: 'end', marginBottom: 'clamp(36px,5vw,60px)' }}>
            <div className="head reveal" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Proof it works</span>
              <h2 className="h2">Already live inside a <span className="gold">federal government agency.</span></h2>
            </div>
            <p className="lede reveal d1">Their staff have walked on Doer every day since August, with a walkathon running through September. Not a pilot deck. A live system.</p>
          </div>
          <div className="stats">
            <div className="stat reveal"><div className="v" data-count="1039743">0</div><p>steps walked in the first nine days of September</p></div>
            <div className="stat reveal d1"><div className="v" data-count="78" data-suffix="%">0</div><p>of staff actually walking, not just signed up</p></div>
            <div className="stat reveal d2"><div className="v" data-count="17" data-suffix=" days">0</div><p>in a row with steps logged, no gaps</p></div>
          </div>
          <p className="source">Figures from Doer's live system, 9 September 2026.</p>
          <div style={{ marginTop: 36 }} className="reveal">
            <a href="/organizations.html" className="btn btn-gold">Bring Doer to your organization <Arrow /></a>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="section" data-label="WHY WE EXIST" data-theme="light">
        <div className="wrap founder">
          <div className="founder-nums reveal">
            <div><b data-count="921">0</b><span>km walked</span></div>
            <div><b data-count="48">0</b><span>kg lost</span></div>
            <div style={{ gridColumn: '1 / -1', background: 'var(--gold)', color: 'var(--ink)' }}><span style={{ color: 'var(--ink)' }}>One year. No gym. No trainer. No app that kept him going. So he built one.</span></div>
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Why we exist</span>
            <blockquote className="big" style={{ marginTop: 18 }}>"I didn't build Doer for athletes. I built it for <span className="gold">the person I used to be.</span>"</blockquote>
            <span className="cite">Charles Chikwado Victor, Founder &amp; CEO. Left medical school, walked 921 km, then built the app he wished he had.</span>
            <p className="body" style={{ marginTop: 22, maxWidth: '56ch' }}>Cardiovascular disease kills over a million people across Africa every year, and physical inactivity is one of its biggest drivers. Walking 7,000 steps a day instead of 2,000 cuts the risk of dying from any cause by nearly half. Doer exists to make that walk happen, every day, for the people who need it most.</p>
            <p className="source">Sources: The Lancet Public Health, 2025 · WHO African Region.</p>
            <div className="badges" style={{ marginTop: 22 }}>
              <span>Advised by LvlUp Labs</span>
              <span>Africa Innovation Challenge 2026</span>
              <span>Live on iOS &amp; Android</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section paper" id="faq" data-label="FAQ" data-theme="light">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">Questions. <span className="gold">Answered.</span></h2>
            <p className="lede">Anything else? Email <a href={`mailto:${EMAIL.hello}`}>{EMAIL.hello}</a>.</p>
          </div>
          <div className="faq reveal d1">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* DOWNLOAD, on a live gold shader gradient */}
      <section className="section gold-bg has-shader" id="download" data-label="DOWNLOAD" data-theme="light">
        <ShaderBackdrop preset="gold" speed={0.25} />
        <div className="wrap cta reveal">
          <span className="eyebrow" style={{ color: 'var(--ink)' }}>Available now</span>
          <h2 className="h-display">Your streak<br />starts today.</h2>
          <p className="lede" style={{ color: 'rgba(13,13,13,.78)' }}>Download Doer, join your first challenge, and find out what your steps are worth.</p>
          <StoreButtons />
        </div>
      </section>
    </Layout>
  );
}
