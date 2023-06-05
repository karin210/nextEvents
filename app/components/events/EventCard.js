import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles/EventCard.module.scss";
import star from "../../../public/star-svgrepo-com.svg";

export default function EventCard({
  id,
  image,
  title,
  city,
  popularity,
  country,
  lapse,
  year,
  topic,
}) {
  return (
    <Link legacyBehavior href={`/events/${id}`} key={id}>
      <a className={styles.itemLink}>
        <article className={styles.item}>
          <figure className={styles.fig}>
            <Image src={image} width={300} height={300} alt={title} />
          </figure>
          <h2>{title}</h2>
          <ul className={styles.detailsList}>
            <div className={styles.detailsRow}>
              <li className={styles.detail}>{city}</li>
              <li className={styles.detail}>{country}</li>
            </div>
            <div className={styles.detailsRow}>
              <li className={styles.detail}>{lapse}</li>
              <li className={styles.detail}>{year}</li>
            </div>
            <li className={styles.detailsRow}>
              <span>{topic}</span>
              <div className={styles.detailStars}>
                <Image
                  className={styles.startIcon}
                  src={star}
                  width={100}
                  height={100}
                  alt="Star icon"
                />
                <span>{popularity}</span>
              </div>
            </li>
          </ul>
        </article>
      </a>
    </Link>
  );
}
