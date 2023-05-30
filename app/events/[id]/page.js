import React from "react";

export default function page() {
  return (
    <main className={styles.main}>
      {/* <h1>Id</h1> */}
      <figure>
        <img src={data.image} width={500} height={300} alt={data.title} />
      </figure>
      <section>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <form onSubmit={onSubmit} className="email-registration">
          <label>Get registered for this event!</label>
          <input
            ref={inputEmail}
            type="email"
            id="email"
            placeholder="Please insert your email here"
          />
          {message === "This email is already registered" ? (
            <p className={styles.error}>{message}</p>
          ) : (
            <p className={styles.notification}>{message}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
