import React from 'react';
import styles from './NavBarList.module.sass';
import CONSTANTS from '../../../constants';
import { Link } from 'react-router-dom';

function NavBarList({ navList = [] }) {
  return (
    <ul className={styles.containerList}>
      {navList.map(({ title, items }, index) => (
        <li key={index} className={styles.containerListItem}>
          <span>{title}</span>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
            alt="menu"
          />
          <ul className={styles.dropDownList}>
            {items.map((i) => (
              <li key={i.name} className={styles.dropDownListItem}>
                <Link to={i.link}>{i.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default NavBarList;
