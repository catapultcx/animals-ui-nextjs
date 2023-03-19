import React, { useReducer, useState } from "react";
import { NewCatForm } from "@/components/NewCatForm";
import Head from "next/head";

const submitForm = () => {
  return (
    <>
      <Head>
        <title>Your cat</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewCatForm label={"Add "} id={""} name={""} description={""} />
    </>
  );
};

export default submitForm;
