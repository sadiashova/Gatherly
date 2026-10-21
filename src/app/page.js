import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    number: "01",
    icon: "✳",
    title: "A little less scrolling",
    description: "Find considered, welcoming events that feel like your kind of afternoon.",
  },
  {
    number: "02",
    icon: "⌂",
    title: "Good things, close by",
    description: "Meet the people and places making your own neighborhood more interesting.",
  },
  {
    number: "03",
    icon: "♡",
    title: "Come as you are",
    description: "Show up solo, bring a friend, or leave the plan-making to someone else.",
  },
];

const gatherings = [
  { date: "JUN 14", icon: "☕", type: "Coffee & conversation", title: "The slow Sunday coffee club", place: "Moss & Maple · Riverside", color: "sage" },
  { date: "JUN 18", icon: "✿", type: "Outdoors", title: "Flowers, friends & a long lunch", place: "The Conservatory · Old Town", color: "peach" },
  { date: "JUN 22", icon: "♫", type: "Music", title: "An evening of tiny desk concerts", place: "Goodland Studio · Downtown", color: "lavender" },
];

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span /> MAKE A LITTLE ROOM FOR GOOD THINGS</span>
            <h1>Your next favorite thing is <em>closer</em> than you think.</h1>
            <p>Small gatherings, new faces, and the kind of plans you’ll be glad you made. Find your people, right around the corner.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/items">Find your next plan <span aria-hidden="true">↗</span></Link>
              <Link className={styles.textLink} href="/about">Get to know us <span aria-hidden="true">→</span></Link>
            </div>
            <div className={styles.socialProof}>
              <div className={styles.avatarStack} aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
              <span><strong>2,400+</strong> neighbors making memories</span>
            </div>
          </div>
          <div className={styles.heroVisual} aria-label="A cozy table set for a neighborhood gathering">
            <div className={styles.visualSun} />
            <div className={styles.visualCard}>
              <span className={styles.visualLabel}>A GOOD PLAN, THIS WAY</span>
              <span className={styles.visualFlower}>✿</span>
              <span className={styles.visualCaption}>There’s a seat<br />with your name on it.</span>
            </div>
            <div className={styles.floatingNote}><span>✦</span><div><strong>Happening near you</strong><small>Saturday · 10:30 am</small></div></div>
            <span className={styles.visualDoodle} aria-hidden="true">✳</span>
          </div>
          <span className={styles.heroFootnote}>GOOD COMPANY, GROWN LOCALLY <span>✳</span></span>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.sectionEyebrow}>A BETTER KIND OF PLANS</div>
        <h2>Real life is better <em>together.</em></h2>
        <p className={styles.sectionLead}>Gatherly makes it easier to step out, meet someone new, and make your ordinary days a little more memorable.</p>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article className={styles.feature} key={feature.number}>
              <span className={styles.featureNumber}>{feature.number}</span>
              <span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionEyebrow}>YOUR NEIGHBORHOOD, WITH PLANS</div>
            <h2>On the <em>calendar.</em></h2>
          </div>
          <Link className={styles.outlineButton} href="/items">Explore all gatherings <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.eventGrid}>
          {gatherings.map((gathering) => (
            <article className={styles.eventCard} key={gathering.title}>
              <div className={`${styles.eventArtwork} ${styles[gathering.color]}`}>
                <span className={styles.eventDate}>{gathering.date}</span>
                <span className={styles.eventIllustration} aria-hidden="true">{gathering.icon}</span>
                <span className={styles.eventSparkle} aria-hidden="true">✦</span>
              </div>
              <div className={styles.eventDetails}>
                <span className={styles.eventType}>{gathering.type}</span>
                <h3>{gathering.title}</h3>
                <p><span aria-hidden="true">⌖</span> {gathering.place}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quoteSection}>
        <span className={styles.quoteMark} aria-hidden="true">“</span>
        <blockquote>I came for the pottery, stayed for the people, and now Tuesday nights are my favorite.</blockquote>
        <div className={styles.quoteAuthor}><span className={styles.authorAvatar}>L</span><span><strong>Leah M.</strong><small>Found her people in Eastwood</small></span></div>
        <span className={styles.quoteLeaf} aria-hidden="true">✿</span>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaDecor} aria-hidden="true">✳</div>
        <div className={styles.sectionEyebrow}>YOUR NEXT CHAPTER STARTS OUTSIDE</div>
        <h2>Let’s make a little <em>something</em> of today.</h2>
        <p>Pick a plan. Meet a neighbor. See where the afternoon takes you.</p>
        <Link className={styles.lightButton} href="/items">Find a gathering <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
