import Link from "next/link";
import styles from "./about.module.css";

const principles = [
  { icon: "♡", title: "People over profiles", text: "The best connections happen when you’re doing something you love, not filling out another bio." },
  { icon: "⌂", title: "Small, local, lovely", text: "We champion neighborhood hosts and independent places that make a community feel like home." },
  { icon: "✳", title: "Everyone has a seat", text: "Come on your own, bring a friend, or meet someone new. There’s no one right way to belong." },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>A NOTE FROM YOUR NEIGHBORHOOD</span>
        <h1>We believe a good day starts with <em>good people.</em></h1>
        <p>Gatherly is a small invitation to look up, step out, and feel a little more at home where you are.</p>
        <span className={styles.heroFlower} aria-hidden="true">✿</span>
      </section>

      <section className={styles.story}>
        <div className={styles.storyVisual} aria-hidden="true">
          <div className={styles.storyCircle}>a little<br />more<br /><em>together</em></div>
          <span className={styles.storySparkle}>✦</span>
        </div>
        <div className={styles.storyCopy}>
          <span className={styles.eyebrow}>WHY WE’RE HERE</span>
          <h2>Make room for the <em>unplanned.</em></h2>
          <p>Somewhere between the busy weeks and the “we should catch up soon,” it got harder to meet the people who live just around the corner.</p>
          <p>Gatherly brings the little local things worth showing up for into one welcoming place. A book swap, a shared table, a walk with new friends — no big occasion needed.</p>
          <p>We’re here for the good kind of ordinary: finding your people, one small plan at a time.</p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>WHAT WE BELIEVE</span>
          <h2>Good company makes <em>everything better.</em></h2>
        </div>
        <div className={styles.valueGrid}>
          {principles.map((principle) => (
            <article className={styles.valueCard} key={principle.title}>
              <span className={styles.valueIcon} aria-hidden="true">{principle.icon}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing}>
        <span className={styles.eyebrow}>THE NEXT GOOD THING IS OUT THERE</span>
        <h2>Come find your <em>people.</em></h2>
        <Link href="/items">Explore gatherings <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
