import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Spinner.module.sass';

// import { css } from '@emotion/core';
// const override = css`border-color: #46568a;`;
// ==\/==
// *const override = { borderColor: '#46568a' };

//TODO check if override needed or delete
//* react-awesome-spinners.sizeUnit="px" was deleted
//* css={override} => cssOverride={override}

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      // cssOverride={override}
      size={50}
      color="#46568a"
      loading
    />
  </div>
);

export default SpinnerLoader;
