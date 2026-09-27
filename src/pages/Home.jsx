import Layout from '../components/Layout.jsx';
import ScrollHero from '../components/ScrollHero.jsx';
import { BattlePhone, StreakPhone, JoinPhone, RewardsPhone, ChallengePhone } from '../components/Mockups.jsx';
import { StoreButtons, ShaderBackdrop, Head } from '../components/Shared.jsx';
import { Arrow, Bars, Trophy, Gift, Flame, Users, Lock, Phone, Chart, Target, Shield, Map } from '../components/Icons.jsx';
import { EMAIL } from '../config.js';

const MARQUEE = ['Walk', 'Earn airtime', 'Beat your colleagues', 'Win free food', 'Keep your streak', 'Get cashback', 'Take a day off', 'No gym needed'];

const FAQ = [
  ['What can I win?', 'Each challenge shows its prize before you join. Rewards include airtime, mobile money, food vouchers, cashback and brand vouchers. Inside company programmes, employers add things like paid days off and trophies.'],
  ['Do I need a smartwatch?', 'No. Doer works with the phone you already carry. It reads your steps from Apple Health on iPhone or Health Connect on Android.'],
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
            <div className="wwh-row reveal"><span className="k">WHAT</span><span className="q">What we do</span><p className="a">We turn walking into a game you can win. Your phone counts your steps, you join <em>challenges and team battles</em>, and when you hit the goal you collect something real: <em>airtime, mobile money, food vouchers or cashback.</em></p></div>
            <div className="wwh-row reveal"><span className="k">WHO</span><span className="q">Who we serve</span><p className="a"><em>Everyday people</em> who know they should move more but need a reason. <em>Organizations</em>, from banks to government agencies, that want healthier, closer staff. <em>Brands</em> that want people to choose them, not skip them.</p></div>
            <div className="wwh-row reveal"><span className="k">HOW</span><span className="q">How we serve them</span><p className="a">Walkers use Doer <em>free, forever.</em> Organizations run <em>monthly branch and department battles</em> with a live dashboard. Brands <em>sponsor challenges</em> and fund the prizes. The more people move, the more everyone wins.</p></div>
          </div>
        </div>
      </section>

      {/* WHAT YOUR STEPS CAN WIN */}
      <section className="section paper" id="rewards" data-label="REWARDS" data-theme="light">
        <div className="wrap">
          <Head eyebrow="What your steps can win" lede="Every challenge shows its prize before you join. Hit the goal, it's yours. No points to convert, no tokens to cash out.">Real rewards. <span className="gold">Not points.</span></Head>
          <div className="reward-wall">
            <div className="rw big reveal"><span className="rw-k">📱</span><b>Airtime</b><p>Straight to your line when you finish.</p></div>
            <div className="rw reveal d1"><span className="rw-k">₦</span><b>Mobile money</b><p>Cash rewards to your wallet.</p></div>
            <div className="rw reveal d1"><span className="rw-k">🍔</span><b>Food vouchers</b><p>Meals from the brands you already eat.</p></div>
            <div className="rw reveal d2"><span className="rw-k">%</span><b>Cashback</b><p>Money back from sponsoring brands.</p></div>
            <div className="rw reveal d2"><span className="rw-k">🎟</span><b>Brand vouchers</b><p>Products and perks from sponsors.</p></div>
            <div className="rw reveal d3"><span className="rw-k">🌴</span><b>Paid days off</b><p>From employers running Doer for staff.</p></div>
            <div className="rw dark reveal d3"><span className="rw-k">🏆</span><b>Trophies &amp; badges</b><p>Bragging rights you keep forever.</p></div>
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
            <div className="battle-glow" data-speed="1.2" />
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
            <div className="step reveal d2"><span className="num">03</span><h3 className="h3">Claim the reward</h3><p className="body">Hit the goal and the prize is yours: airtime, mobile money, food vouchers or cashback from the brand or employer behind the challenge.</p></div>
          </div>
        </div>
      </section>

      {/* EVERYTHING IN DOER */}
      <section className="section" data-label="FEATURES" data-theme="light" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Head eyebrow="Everything in Doer">Built to keep you <span className="gold">coming back tomorrow.</span></Head>
          <div className="feat-grid reveal">
            <div className="feat"><span className="ico"><Target /></span><h3>Sponsored challenges</h3><p>7, 14 and 30 day step challenges funded by brands, each with a real prize waiting at the finish.</p></div>
            <div className="feat"><span className="ico"><Users /></span><h3>Team battles</h3><p>Your group against theirs on a live board. Scored per person, so small teams win too.</p></div>
            <div className="feat"><span className="ico"><Flame /></span><h3>Streaks</h3><p>Every day you walk, your streak grows. Miss a day and it resets. That's the point.</p></div>
            <div className="feat"><span className="ico"><Trophy /></span><h3>Badges &amp; milestones</h3><p>From your first 1,000 steps to 3 million. Every milestone is a badge you keep.</p></div>
            <div className="feat"><span className="ico"><Chart /></span><h3>Live leaderboards</h3><p>See exactly where you rank, today, this week, this challenge.</p></div>
            <div className="feat"><span className="ico"><Map /></span><h3>Groups &amp; walk clubs</h3><p>Join verified groups like Run Club Abuja and the Doer WalkClub, or start your own.</p></div>
            <div className="feat"><span className="ico"><Lock /></span><h3>Your name, your call</h3><p>Compete under a display name like QuietStepper. Nobody needs to know it's you.</p></div>
            <div className="feat"><span className="ico"><Phone /></span><h3>No wearable needed</h3><p>Works with the phone in your pocket, through Apple Health or Health Connect.</p></div>
            <div className="feat"><span className="ico"><Shield /></span><h3>Your data stays yours</h3><p>Health data is never sold. Sponsors see results, never your personal details.</p></div>
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
              <h3 className="h3">For anyone who needs a reason to move</h3>
              <p>90% of people who start a fitness journey quit within three months. Not because they're lazy. Because nothing is waiting on day four. Doer puts airtime there.</p>
              <ul><li>Free to download, free forever</li><li>Airtime, mobile money, food and cashback</li><li>Streaks, badges and leaderboards</li><li>Walk clubs in Abuja and Lagos</li></ul>
              <span className="go">Download Doer <Arrow /></span>
            </a>
            <a className="aud-card feature reveal d1" href="/organizations.html">
              <span className="tag">02 · ORGANIZATIONS</span>
              <h3 className="h3">For banks, agencies and companies</h3>
              <p>A monthly step league for your staff. Branches and departments compete, HR watches it live, Doer funds the monthly rewards. Your team does zero extra work.</p>
              <ul><li>A private space only your staff can see</li><li>Branch vs branch, department vs department</li><li>Live participation dashboard and reports</li><li>Monthly rewards, already funded</li></ul>
              <span className="go">See Doer for organizations <Arrow /></span>
            </a>
            <a className="aud-card reveal d2" href="/brands.html">
              <span className="tag">03 · BRANDS</span>
              <h3 className="h3">For brands tired of being skipped</h3>
              <p>Over half of digital ads are never seen. A Doer challenge is chosen. People opt in, walk with your brand for 7 to 30 days, and win your reward.</p>
              <ul><li>Fully branded challenge pages</li><li>Sponsor public challenges or company battles</li><li>Verified steps, joins and redemptions</li><li>Pay for movement, not impressions</li></ul>
              <span className="go">Sponsor a challenge <Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* INSIDE THE APP: pinned, the phones travel sideways as you scroll */}
      <section className="section paper gallery" data-label="INSIDE THE APP" data-theme="light" data-cursor="Scroll">
        <div className="wrap">
          <div className="gallery-head">
            <Head eyebrow="Inside the app" className="gallery-title">Built to make you <span className="gold">show up tomorrow.</span></Head>
            <span className="hint reveal"><i />Keep scrolling</span>
          </div>
          <div className="screens">
            <figure><StreakPhone w={270} /><figcaption><span>01</span>Streaks that build habits</figcaption></figure>
            <figure><ChallengePhone w={270} /><figcaption><span>02</span>Sponsored challenges, live</figcaption></figure>
            <figure><JoinPhone w={270} /><figcaption><span>03</span>Private spaces for teams</figcaption></figure>
            <figure><BattlePhone w={270} /><figcaption><span>04</span>Battles that move in real time</figcaption></figure>
            <figure><RewardsPhone w={270} /><figcaption><span>05</span>Rewards that are real</figcaption></figure>
          </div>
          <p className="mock-note">Current Doer interface, illustrative names and numbers.</p>
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

      {/* INVESTORS */}
      <section className="section dark ink2" id="investors" data-label="INVESTORS" data-theme="dark">
        <div className="wrap">
          <Head eyebrow="For investors" lede="Brands waste most of their ad spend on attention they never get. Africa is losing over a million lives a year to diseases driven by inactivity. Doer connects the two: brands pay for verified movement, people get rewarded for it.">Two broken systems. <span className="gold">One business.</span></Head>
          <div className="inv-grid">
            <div className="inv reveal"><span className="inv-k">Model</span><b>Businesses pay. Walkers never do.</b><p>Two revenue streams: brand challenge sponsorships, and recurring corporate wellness contracts priced per branch.</p></div>
            <div className="inv reveal d1"><span className="inv-k">Traction</span><b>Live inside a federal agency.</b><p>1,039,743 steps in nine days, 78% of staff active, 17 days unbroken. Live on iOS and Android.</p></div>
            <div className="inv reveal d2"><span className="inv-k">Proof of demand</span><b>200M+ people walk for rewards.</b><p>Sweatcoin proved it with tokens. Doer pays in rewards people actually want, through local rails.</p></div>
            <div className="inv reveal d1"><span className="inv-k">Moat</span><b>Verified activity data.</b><p>Every challenge builds a dataset of real movement and reward response that can't be copied with code alone.</p></div>
            <div className="inv reveal d2"><span className="inv-k">Backing</span><b>Selected, 1 of 15 from 300+.</b><p>LvlUp Labs cohort. Africa Innovation Challenge 2026. ICSDI 2026 finalist.</p></div>
            <div className="inv cta-inv reveal d3"><span className="inv-k">Next</span><b>Talk to the founder.</b><p><a href={`mailto:${EMAIL.founder}?subject=Investing%20in%20Doer`}>{EMAIL.founder}</a></p></div>
          </div>
          <p className="source">Sources: comScore and Google Active View (ad viewability) · WHO African Region · Business of Apps (Sweatcoin). Traction figures from Doer's live system, 9 September 2026.</p>
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
          <h2 className="h-display">Start walking.<br />Start winning.</h2>
          <p className="lede" style={{ color: 'rgba(13,13,13,.78)' }}>Download Doer free, join your first challenge today, and find out what your steps are worth.</p>
          <StoreButtons />
        </div>
      </section>
    </Layout>
  );
}
