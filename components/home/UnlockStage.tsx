'use client';

import { Fragment, useEffect, useRef } from 'react';
import { runStage } from './runStage';
import type { Lang } from '@/lib/i18n';

type MethodKey = 'face' | 'finger' | 'pin' | 'card' | 'key';
/* x / y / w: where each unlock method sits on the lock photo (viewBox units) */
const METHODS: { m: MethodKey; icon: string; x: string; y: string; w: string }[] = [
  { m: 'face', icon: 'face', x: '747.5', y: '209', w: '72' },
  { m: 'finger', icon: 'finger', x: '755', y: '448', w: '62' },
  { m: 'pin', icon: 'pin', x: '752', y: '321', w: '122' },
  { m: 'card', icon: 'card', x: '743.5', y: '154.5', w: '92' },
  { m: 'key', icon: 'key', x: '751', y: '606', w: '104' },
];
const TEXT: Record<Lang, { svg: string; group: string; methods: Record<MethodKey, [string, string, string]> }> = {
  ar: {
    svg: 'قفل ALABED ذكي على باب',
    group: 'اختر طريقة فتح لتراها على القفل',
    methods: {
      face: ['وجه', 'التعرّف ثلاثي الأبعاد على الوجه', 'يفتح حتى في الظلام، ولا تخدعه صورة أو فيديو.'],
      finger: ['بصمة', 'بصمة الإصبع', 'مستشعر يحفظ حتى 100 بصمة لكل أفراد البيت.'],
      pin: ['رمز سري', 'رمز سري بأرقام وهمية', 'اكتب أرقامًا عشوائية حول رمزك حتى لا يلتقطه أحد.'],
      card: ['بطاقة', 'بطاقة أو ميدالية', 'مثالية للعاملين في البيت والأطفال.'],
      key: ['مفتاح', 'مفتاح ميكانيكي احتياطي', 'مخفي خلف غطاء، للطوارئ فقط.'],
    },
  },
  en: {
    svg: 'ALABED smart lock on a door',
    group: 'Pick an unlock method to see it on the lock',
    methods: {
      face: ['Face', '3D face recognition', 'Opens even in the dark, and can’t be fooled by a photo or video.'],
      finger: ['Fingerprint', 'Fingerprint', 'Stores up to 100 fingerprints for the whole household.'],
      pin: ['PIN code', 'PIN with decoy digits', 'Type random digits around your code so no one can catch it.'],
      card: ['Card', 'Card or key fob', 'Ideal for household staff and kids.'],
      key: ['Key', 'Backup mechanical key', 'Hidden behind a cover, for emergencies only.'],
    },
  },
};

/** Home hero: the lock photo with a focus ring that springs between unlock methods (autoplays). */
export default function UnlockStage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => runStage(ref.current!), []);

  return (
    <>
      <svg className="hero__frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroPanel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1A2150" stopOpacity=".9" />
            <stop offset="1" stopColor="#151B42" stopOpacity=".35" />
          </linearGradient>
        </defs>
        <polygon className="fp" points="0,0 88,0 100,100 0,100" />
        <polygon className="fe" points="4,3 91,3 100,97" />
      </svg>
    <div className="ul-stage" data-ul-stage ref={ref}>
      <div className="ul-door">
        <svg className="ul-svg" viewBox="189 15 1043 810" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t.svg}>
          <defs>
            <mask id="ul-hole" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2500" height="1800">
              <rect x="-400" y="-400" width="2500" height="1800" fill="#fff" />
              <ellipse data-ul="hole" cx="747.5" cy="209" rx="36" ry="36" fill="#000" />
            </mask>
            <radialGradient id="ul-glow-gold">
              <stop offset="0" stopColor="#FDDC94" stopOpacity="1" />
              <stop offset=".35" stopColor="#FAAB08" stopOpacity=".75" />
              <stop offset="1" stopColor="#FAAB08" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ul-glow-green">
              <stop offset="0" stopColor="#B8FFB0" stopOpacity=".95" />
              <stop offset=".4" stopColor="#3BE14A" stopOpacity=".55" />
              <stop offset="1" stopColor="#3BE14A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ul-scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FAAB08" stopOpacity="0" />
              <stop offset="1" stopColor="#FAAB08" stopOpacity=".45" />
            </linearGradient>
            <clipPath id="ul-face-clip"><rect x="712" y="174" width="72" height="72" rx="36" /></clipPath>
          </defs>
          <g data-ul="cam">
            {/* real product photo */}
            <image href="/assets/hero-lock.webp" x="0" y="0" width="1670" height="942" preserveAspectRatio="none"/>

            {/* FACE: camera flicker + scan sweep */}
            <g className="ul-fx" data-fx="face">
            <circle data-o="iris" cx="747.5" cy="209" r="17" fill="none" stroke="#FDDC94" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke"/>
            <circle data-o="ir" cx="747.5" cy="209" r="14" fill="url(#ul-glow-gold)" opacity="0"/>
            <g clipPath="url(#ul-face-clip)"><g data-o="scan"><rect x="712" y="150" width="72" height="24" fill="url(#ul-scan-grad)"/><rect x="712" y="173" width="72" height="2" fill="#FAAB08"/></g></g>
            </g>
            {/* FINGER: sensor ring traces + glows */}
            <g className="ul-fx" data-fx="finger">
            <circle data-o="pad" cx="755" cy="448.5" r="26" fill="url(#ul-glow-gold)" opacity="0"/>
            <circle data-o="draw" cx="755" cy="448.5" r="16" fill="none" stroke="#FAAB08" strokeWidth="3" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" vectorEffect="non-scaling-stroke" transform="rotate(-90 755 448.5)"/>
            </g>
            {/* PIN: digits light up */}
            <g className="ul-fx" data-fx="pin">
            <circle data-o="k" cx="730" cy="281.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="752.5" cy="281.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="773.5" cy="281.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/>
            <circle data-o="k" cx="730" cy="307.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="752.5" cy="307.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="773.5" cy="307.5" r="11" fill="url(#ul-glow-gold)" opacity="0"/>
            <circle data-o="k" cx="730" cy="334" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="752.5" cy="334" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="773.5" cy="334" r="11" fill="url(#ul-glow-gold)" opacity="0"/>
            <circle data-o="k" cx="730" cy="361" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="752.5" cy="361" r="11" fill="url(#ul-glow-gold)" opacity="0"/><circle data-o="k" cx="773.5" cy="361" r="11" fill="url(#ul-glow-gold)" opacity="0"/>
            </g>
            {/* CARD: reader window at the top of the lock */}
            <g className="ul-fx" data-fx="card">
            <rect data-o="pad" x="714" y="141" width="59" height="27" rx="3" fill="#FAAB08" opacity="0" style={{ mixBlendMode: "screen" }}/>
            <rect data-o="draw" x="714" y="141" width="59" height="27" rx="3" fill="none" stroke="#FAAB08" strokeWidth="2.5" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" vectorEffect="non-scaling-stroke"/>
            <circle data-o="arc" cx="743.5" cy="154.5" r="34" fill="none" stroke="#FAAB08" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke"/>
            <circle data-o="arc" cx="743.5" cy="154.5" r="34" fill="none" stroke="#FAAB08" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke"/>
            <circle data-o="arc" cx="743.5" cy="154.5" r="34" fill="none" stroke="#FAAB08" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke"/>
            </g>
            {/* KEY: hidden cylinder cover is traced */}
            <g className="ul-fx" data-fx="key">
            <rect data-o="slotglow" x="728" y="560" width="46" height="93" rx="23" fill="#FAAB08" opacity="0" style={{ mixBlendMode: "screen" }}/>
            <rect data-o="draw" x="733" y="566" width="36" height="81" rx="18" fill="none" stroke="#FAAB08" strokeWidth="2.5" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" vectorEffect="non-scaling-stroke"/>
            </g>

            <rect x="-400" y="-400" width="2500" height="1800" fill="rgba(9,12,32,.5)" mask="url(#ul-hole)"/>
            {/* UNLOCKED: the real green LED strip flares */}
            <ellipse data-ul="ok" cx="746" cy="730" rx="26" ry="52" fill="url(#ul-glow-green)" opacity="0" style={{ mixBlendMode: "screen", transformBox: "fill-box", transformOrigin: "center" }}/>
            <ellipse data-ul="wave" style={{ transformBox: "fill-box", transformOrigin: "center" }} cx="747.5" cy="209" rx="36" ry="36" fill="none" stroke="#FAAB08" strokeWidth="1" opacity="0" vectorEffect="non-scaling-stroke"/>
            <ellipse data-ul="ring" cx="747.5" cy="209" rx="36" ry="36" fill="none" stroke="#FAAB08" strokeWidth="3" pathLength="100" strokeDasharray="100 0" vectorEffect="non-scaling-stroke"/>
            <g data-ul="brackets" fill="none" stroke="#FAAB08" strokeWidth="2" strokeLinecap="square" opacity="0"><path data-b="0" d="M0 16V0h16" vectorEffect="non-scaling-stroke"/><path data-b="1" d="M0 16V0h16" vectorEffect="non-scaling-stroke"/><path data-b="2" d="M0 16V0h16" vectorEffect="non-scaling-stroke"/><path data-b="3" d="M0 16V0h16" vectorEffect="non-scaling-stroke"/></g>
          </g>
        </svg>
        <div className="ul-caption" aria-live="polite">
          <div className="ul-caption__text">
            <span className="ul-line"><span><strong data-ul="title" /></span></span>
            {" "}
            <span className="ul-line"><span className="ul-caption__desc" data-ul="desc" /></span>
          </div>
        </div>
      </div>
      <div className="ul-methods" role="group" aria-label={t.group}>
        {METHODS.map(({ m, icon, x, y, w }, i) => (
          <Fragment key={m}>
            {i > 0 && ' '}
            <button type="button" className="ul-method" data-method={m} data-x={x} data-y={y} data-w={w} data-title={t.methods[m][1]} data-desc={t.methods[m][2]} aria-pressed="false">
              <svg aria-hidden="true"><use href={`#i-${icon}`} /></svg>
              <span>{t.methods[m][0]}</span>
            </button>
          </Fragment>
        ))}
      </div>
    </div>
    </>
  );
}
