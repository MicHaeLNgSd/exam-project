import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import styles from './HowItWorksPage.module.sass';
import classNames from 'classnames';
import {
  FAQ_SECTIONS,
  NAMING_CONTESTS_STEPS,
  POPULAR_SEARCHES,
  WAYS_TO_USE,
} from './HowItWorksData';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const IMG_PATH = `${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/`;

function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={styles.howItWorksMain}>
        <section className={styles.howWorksSec}>
          <div className={styles.howWorksInfo}>
            <h4 className={styles.howWorksTag}>World's #1 Naming Platform</h4>
            <div className={styles.howWorksInfo}>
              <h1 className={styles.howWorksHeader}>How Does Atom Work?</h1>
              <p className={styles.howWorksText}>
                Atom helps you come up with a great name for your business by
                combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
            </div>

            <a
              className={styles.howItWorksBtn}
              href="https://vimeo.com/368584367"
            >
              <i className={classNames('fas fa-play', styles.playBtn)} />
              Play Video
            </a>
          </div>
          <img
            src={`${IMG_PATH}app-user.svg`}
            alt="app-user"
            className={styles.howWorksImg}
          />
        </section>
        <section className={styles.useWaysSec}>
          <div className={styles.useWaysHead}>
            <h4 className={styles.useWaysTag}>Our Services</h4>
            <h2 className={styles.useWaysHeader}>3 Ways To Use Atom</h2>
            <p className={styles.useWaysText}>
              Atom offers 3 ways to get you a perfect name for your business.
            </p>
          </div>
          <div className={styles.useWaysList}>
            {WAYS_TO_USE.map((way, index) => (
              <div key={index} className={styles.useWaysItem}>
                <img src={`${IMG_PATH}${way.iconURL}`} alt={way.alt} />
                <h3>{way.header}</h3>
                <p>{way.text}</p>
                <Link to={way.btnLink} className={styles.useWaysBtn}>
                  {way.btnText}
                  <img
                    className={styles.useWaysBtnArrow}
                    src={`${IMG_PATH}icon-arrow-long-right.svg`}
                    alt="arrow-right"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.namingStepsSec}>
          <div className={styles.namingStepsHead}>
            <img
              src={`${IMG_PATH}prize.svg`}
              alt="prize"
              className={styles.namingStepsImg}
            />
            <h3 className={styles.namingStepsHeader}>
              How Do Naming Contests Work?
            </h3>
          </div>
          <div className={styles.namingStepsList}>
            {NAMING_CONTESTS_STEPS.map((step, index) => (
              <div key={index} className={styles.namingStepsItem}>
                <span className={styles.namingStepsNumber}>
                  Step {index + 1}
                </span>
                <p>{step}</p>
                <span className={styles.stepArrow}>
                  <img
                    className={styles.namingStepsArrow}
                    src={`${IMG_PATH}arrow-right-purpule.svg`}
                    alt="arrow-right"
                  />
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.faqSec}>
          <div className={styles.faqHead}>
            <h3 className={styles.faqHeader}>Frequently Asked Questions</h3>
          </div>
          <nav className={styles.faqNav}>
            {FAQ_SECTIONS.map((sec, index) => (
              <div key={index} className={styles.faqNavItem}>
                {sec.header}
              </div>
            ))}
          </nav>
          <div className={styles.faqList}>
            {FAQ_SECTIONS.map((sec, index) => (
              <section key={index} className={styles.faqSection}>
                <h4 className={styles.faqSectionHeader}>{sec.header}</h4>
                <ul>
                  {sec.questions.map((q, index) => (
                    <li key={index}>
                      <div className={styles.faqQuestion}>{q.question}</div>
                      <div className={styles.faqAnswer}>{q.answer}</div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
        <section className={styles.searchSec}>
          <div className={styles.searchContainer}>
            <img
              src={`${IMG_PATH}icon-search.svg`}
              alt="search"
              className={styles.glassIcon}
            ></img>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search Over 200,000+ Premium Names"
            />
            <button className={styles.searchBtn}>
              <img
                src={`${IMG_PATH}icon-arrow-long-right.svg`}
                alt="arrow-right"
              />
            </button>
          </div>

          <div className={styles.popularSearches}>
            <span>Popular searches</span>
            {POPULAR_SEARCHES.map((s, index) => (
              <a href={s.url} key={index} className={styles.searchesLink}>
                {s.name}
              </a>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default HowItWorksPage;
