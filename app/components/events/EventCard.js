import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles/EventCard.module.scss";

export default function EventCard({
  id,
  image,
  title,
  city,
  popularity,
  country,
  lapse,
  finished,
}) {
  return (
    <Link legacyBehavior href={`/events/${id}`} key={id}>
      <a className={styles.itemLink}>
        <article className={styles.item}>
          <figure className={styles.fig}>
            <Image src={image} width={300} height={300} alt={title} />
          </figure>
          <h2>{title}</h2>
          <ul className={styles.itemDetails}>
            <div>
              <li className={styles.details}>{city}</li>
              <li className={styles.details}>{country}</li>
            </div>
            <div>
              <li className={styles.rateBar}>
                <label className={styles.details} for="popularity">
                  Ranking
                </label>
                <progress id="popularity" max="5" value={popularity}></progress>
              </li>
              {finished ? (
                <li className={styles.details}>Finished</li>
              ) : (
                <li className={styles.finished}>{lapse}</li>
              )}
            </div>
          </ul>
        </article>
      </a>
    </Link>
  );
}
