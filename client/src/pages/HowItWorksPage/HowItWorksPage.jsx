import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import styles from './HowItWorksPage.module.sass';
import HowWorksSec from './HowWorksSec/HowWorksSec';
import UseWaysSec from './UseWaysSec/UseWaysSec';
import NamingStepsSec from './NamingStepsSec/NamingStepsSec';
import SearchSec from './SearchSec/SearchSec';
import FAQSec from './FAQSec/FAQSec';

const IMG_PATH = `${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/`;

function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={styles.howItWorksMain}>
        <HowWorksSec imgPath={IMG_PATH} />
        <UseWaysSec imgPath={IMG_PATH} />
        <NamingStepsSec imgPath={IMG_PATH} />
        <FAQSec imgPath={IMG_PATH} />
        <SearchSec imgPath={IMG_PATH} />
      </main>
      <Footer />
    </>
  );
}

export default HowItWorksPage;
