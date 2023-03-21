import React, { useReducer, useState } from "react";
import { CatForm } from "../../components/CatForm";
import Head from "next/head";

// A resuable form.
const createNewCat = () => {
  return (
    <>
      <Head>
        <title>Your cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CatForm label={"Add "} id={""} name={""} description={""} />
    </>
  );
};

export default createNewCat;
