import React from "react";
import Head from "next/head";

export default function Home() {
  setTimeout(() => (window.location.href = "/login"), 1000);
  return (
    <div>
      <Head>
        <title>Attendance</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <h1>Redirecting...</h1>
      </main>
    </div>
  );
}
