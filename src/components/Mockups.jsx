import { useEffect, useState } from 'react';
import { Bell, Flame } from './Icons.jsx';
import { prefersReducedMotion } from '../lib/device.js';

/* Recreations of the current Doer app UI. Names and numbers are illustrative. */

export function Phone({ w = 280, className = '', children, style }) {
  return (
    <div className={`phone ${className}`} style={{ '--w': `${w}px`, ...style }}>
      <div className="phone-screen"><div className="app">{children}</div></div>
    </div>
  );
}

const TABS = ['Home', 'Groups', 'Battles', 'Rewards', 'Me'];
export const Tabs = ({ on }) => (
  <div className="app-tabs">{TABS.map((t) => <span key={t} className={t === on ? 'on' : ''}><i />{t}</span>)}</div>
);

function useTicker(start, goal) {
  const [steps, setSteps] = useState(start);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setSteps((s) => (s >= goal ? start : s + Math.ceil(Math.random() * 3))), 700);
    return () => clearInterval(id);
  }, [start, goal]);
  return steps;
}

export function ChallengePhone({ w = 270, className, style }) {
  const goal = 10000;
  const steps = useTicker(7342, goal);
  return (
    <Phone w={w} className={className} style={style}>
      <div className="app-top">
        <div><b>Morning, Tolu</b><small>Day 4 of your 7 day challenge</small></div>
        <span className="app-bell"><Bell /></span>
      </div>
      <div className="app-card goldish">
        <div className="app-sponsor" style={{ marginBottom: 10 }}>
          <span className="logo">YB</span>
          <div><div className="app-label">Sponsored by</div><b style={{ fontSize: 'calc(var(--w)*.042)' }}>Your Brand</b></div>
          <span className="app-pill live" style={{ marginLeft: 'auto' }}>Live</span>
        </div>
        <div className="app-label">Steps today</div>
        <div className="app-big">{steps.toLocaleString('en-US')} <small>/ 10,000</small></div>
        <div className="bar"><i style={{ width: `${Math.min((steps / goal) * 100, 100)}%` }} /></div>
        <div className="app-row"><span>Rank <b>#12</b> of 2,841</span><span><b>{Math.max(goal - steps, 0).toLocaleString('en-US')}</b> to go</span></div>
      </div>
      <div className="app-card">
        <div className="app-row" style={{ marginBottom: 8 }}><b>Team battle</b><span className="app-pill">3d left</span></div>
        <div className="vs">
          <div className="team"><span className="av a">AR</span><b>Abuja Runners</b><small>26.7K avg</small></div>
          <span className="v">VS</span>
          <div className="team"><span className="av b">LW</span><b>Lagos Walkers</b><small>20.4K avg</small></div>
        </div>
      </div>
      <div className="app-btn fill">View leaderboard</div>
      <Tabs on="Home" />
    </Phone>
  );
}

export function BattlePhone({ w = 300, title = 'Branch League, October', reward = 'A paid day off + the trophy' }) {
  return (
    <Phone w={w}>
      <div className="app-row"><span className="app-pill live">Live battle</span><span className="app-pill">6 days left</span></div>
      <div>
        <div className="app-label">Step Challenge · All branches</div>
        <b className="app-title">{title}</b>
      </div>
      <div className="app-card goldish">
        <div className="app-label">Your branch rank</div>
        <div className="app-big">#3 <small>of 10 branches</small></div>
        <div className="bar gold"><i style={{ width: '78%' }} /></div>
        <div className="app-row"><span>Avg per person <b>8,412</b></span><span>Leader <b>9,160</b></span></div>
      </div>
      <div className="lb">
        <div className="lb-row"><span className="r">1</span><span>Head Office</span><b>9,160</b></div>
        <div className="lb-row"><span className="r">2</span><span>Port Harcourt</span><b>8,977</b></div>
        <div className="lb-row me"><span className="r">3</span><span>Surulere · you</span><b>8,412</b></div>
        <div className="lb-row"><span className="r">4</span><span>Ikeja</span><b>8,030</b></div>
      </div>
      <div className="app-card app-reward">
        <span className="logo">🏆</span>
        <div><div className="app-label">Winning branch gets</div><b>{reward}</b></div>
      </div>
      <Tabs on="Battles" />
    </Phone>
  );
}

export function StreakPhone({ w = 250 }) {
  const bars = [55, 72, 48, 88, 66, 94, 40];
  return (
    <Phone w={w}>
      <div className="app-top"><div><b>Your streak</b><small>Personal best: 23 days</small></div></div>
      <div className="app-card goldish" style={{ textAlign: 'center' }}>
        <div className="app-big" style={{ fontSize: 'calc(var(--w)*.22)', color: 'var(--gold)' }}>17</div>
        <div className="app-label"><Flame style={{ width: 12, height: 12, verticalAlign: -1, color: 'var(--gold)' }} /> days in a row</div>
      </div>
      <div className="app-card">
        <div className="app-label" style={{ marginBottom: 8 }}>This week</div>
        <div className="mini-bars">
          {bars.map((h, i) => <i key={i} style={{ height: `${h}%`, background: i === 5 ? 'var(--gold)' : i === 6 ? 'var(--lime)' : '#3a3629' }} />)}
        </div>
      </div>
      <div className="app-card">
        <div className="app-row"><span>Badges earned</span><b>12</b></div>
        <div className="bar"><i style={{ width: '60%' }} /></div>
        <div className="app-row"><span>Next: 1 million steps</span><b>60%</b></div>
      </div>
      <Tabs on="Home" />
    </Phone>
  );
}

export function JoinPhone({ w = 250, org = 'your company' }) {
  return (
    <Phone w={w}>
      <div className="app-top"><div><b>Welcome to</b><small>{org} on Doer</small></div></div>
      <div className="app-card">
        <div className="app-label">Department</div>
        <b style={{ fontSize: 'calc(var(--w)*.055)' }}>Surulere, Lagos</b>
        <div className="app-label" style={{ marginTop: 6 }}>Carried over from your invite link</div>
      </div>
      <div className="app-card goldish">
        <div className="app-label">Your leaderboard name</div>
        <b style={{ fontSize: 'calc(var(--w)*.075)', fontWeight: 900, letterSpacing: '-.5px' }}>QuietStepper</b>
        <div className="app-label" style={{ marginTop: 6 }}>Not connected to your real name. Only your team sees it.</div>
      </div>
      <div className="app-card"><div className="app-row"><span>🔒 Employees only</span><b>108 members</b></div></div>
      <div className="app-btn fill">Join your team</div>
      <Tabs on="Groups" />
    </Phone>
  );
}

export function RewardsPhone({ w = 250 }) {
  return (
    <Phone w={w}>
      <div className="app-top"><div><b>Rewards</b><small>Earned by walking</small></div></div>
      <div className="app-card goldish">
        <div className="app-sponsor"><span className="logo">YB</span><div><div className="app-label">7 Day Challenge · Completed</div><b style={{ fontSize: 'calc(var(--w)*.045)' }}>Free meal voucher</b></div></div>
        <div className="app-btn fill" style={{ marginTop: 10 }}>Redeem</div>
      </div>
      <div className="app-card"><div className="app-sponsor"><span className="logo" style={{ background: '#F2EEE6' }}>₦</span><div><div className="app-label">Top 3 this month</div><b style={{ fontSize: 'calc(var(--w)*.045)' }}>₦2,000 airtime</b></div></div></div>
      <div className="app-card"><div className="app-sponsor"><span className="logo" style={{ background: 'var(--lime)' }}>★</span><div><div className="app-label">Branch battle · Winner</div><b style={{ fontSize: 'calc(var(--w)*.045)' }}>Paid day off</b></div></div></div>
      <Tabs on="Rewards" />
    </Phone>
  );
}

export function BrandChallengePhone({ w = 280, brand = 'Your Brand', initials = 'YB', title = 'The 10K Week', reward = 'Free meal voucher' }) {
  return (
    <Phone w={w}>
      <div className="app-card goldish brand-hero-card">
        <div className="app-sponsor"><span className="logo">{initials}</span><div><div className="app-label">Sponsored by</div><b style={{ fontSize: 'calc(var(--w)*.048)' }}>{brand}</b></div></div>
        <b className="app-title" style={{ marginTop: 10 }}>{title}</b>
        <div className="app-row" style={{ marginTop: 6 }}><span className="app-pill">7 Day Challenge</span><span className="app-pill live">Live</span></div>
      </div>
      <div className="app-grid3">
        <div className="app-card"><div className="app-big sm">2,841</div><div className="app-label">Joined</div></div>
        <div className="app-card"><div className="app-big sm">10K</div><div className="app-label">Steps/day</div></div>
        <div className="app-card"><div className="app-big sm">3d</div><div className="app-label">Left</div></div>
      </div>
      <div className="app-card">
        <div className="app-row"><span>Day 5 of 7</span><b>72%</b></div>
        <div className="bar"><i style={{ width: '72%' }} /></div>
      </div>
      <div className="app-card app-reward">
        <span className="logo" style={{ background: 'var(--gold)' }}>🎁</span>
        <div><div className="app-label">Finish to win</div><b>{reward}</b></div>
      </div>
      <div className="app-btn fill">Join challenge</div>
      <Tabs on="Battles" />
    </Phone>
  );
}

/* Corporate admin dashboard, based on the Doer organization dashboard */
export function Dashboard({ org = 'Your Organization' }) {
  const days = [['Mon', '52%'], ['Tue', '64%'], ['Wed', '58%'], ['Thu', '77%'], ['Fri', '70%'], ['Sat', '88%'], ['Sun', '95%']];
  const standings = [['Head Office', '9,160', '100%'], ['Port Harcourt', '8,977', '96%'], ['Surulere', '8,412', '90%'], ['Ikeja', '8,030', '86%'], ['Abuja Central', '7,644', '81%']];
  return (
    <div className="dash">
      <div className="dash-bar"><i /><i /><i /><span>doer · admin</span></div>
      <div className="dash-body">
        <div className="dash-head">
          <div><b>{org}</b><small>1,186 members · 10 branches</small></div>
          <div className="dash-tabs"><span className="on">Dashboard</span><span>Battles</span><span>Reports</span><span>Rewards</span></div>
        </div>
        <div className="dash-kpis">
          <div className="kpi"><small>Walking</small><b className="l" data-count="78" data-suffix="%">0%</b></div>
          <div className="kpi"><small>Steps this month</small><b data-count="9607760">0</b></div>
          <div className="kpi"><small>Active streaks</small><b className="g" data-count="866">0</b></div>
          <div className="kpi"><small>Battle ends in</small><b>6 days</b></div>
        </div>
        <div className="dash-cols">
          <div className="panel">
            <h4>7 day step trend <em>▲ 18%</em></h4>
            <div className="chart">
              {days.map(([d, h]) => <div key={d}><i data-h={h} /><span>{d}</span></div>)}
            </div>
          </div>
          <div className="panel">
            <h4>Branch standings <em>avg / person</em></h4>
            <div className="standings">
              {standings.map(([n, v, f], i) => (
                <div key={n}><span className="r">{i + 1}</span><span className="nm"><span>{n}</span><span className="track"><i data-fill={f} /></span></span><b>{v}</b></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
