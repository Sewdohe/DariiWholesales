import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <p>
        Welcome to Dari Wholesales. We're a small business of about 10 people.
        We have been serving eastern North Carolina for 16 years, providing
        c-stores with affordable products at wholesale prices.
      </p>
      <h2>Open Account</h2>
      <p>
        Like to open an account? We'd love to have you as a customer! Unfortunatly, we currently only accept customers in North Carolina. In order to open an account, we will need your basic information, as well as information about your store, including your Federal tax-id number. We cannot open an account for you if you do not have a Federal tax-id number. We also cannot open an account if you require shipments across state lines, due to state tax regulations.
      </p>
    </Layout>
  );
};

export default IndexPage;
