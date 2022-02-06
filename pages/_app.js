import { DefaultSeo } from 'next-seo';
import moment from 'moment';
import Head from 'next/head';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const site = {
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION
  }

  const metaTags = {
    title: site.title,
    name: site.name,
    url: "https://moneyscramble.com",
    imgUrl: "https://moneyscramble.com/static/og-image.jpg",
    description: site.description,
    locale: "en_US"
  }


  return (
    <div id="page-container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charSet="utf-8" />

        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>

        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/static/favicon/site.webmanifest"/>
        <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#237b07"/>
        <meta name="msapplication-TileColor" content="#11d710"/>
      </Head>

      <DefaultSeo
        title = {metaTags.title}
        titleTemplate = {`Money Scramble | %s`}
        defaultTitle = {'Money Scramble'}

        description={metaTags.description}
        
        openGraph={{
          type: 'website',
          locale: metaTags.locale,
          url: metaTags.url,
          site_name: metaTags.name,
          description: metaTags.description,
          images: [
            {
              url: metaTags.imgUrl,
              width: 1200,
              height: 627,
              alt: 'MoneyScramble.com',
            }
          ]
        }}
      />

      <main id="content-wrap">
        <Component
          {...pageProps}
          site={site}
        />
      </main>

      <footer className="d-flex bg-dark justify-content-center align-items-center text-capitalize text-muted small">
        <div><small>&copy;{moment().year()} {site.name.replace(" ", '')}.com</small></div>
        <div className="position-absolute end-0 bottom-0 p-2"><small><small>{"Alfredo<3"}</small></small></div>
      </footer>
      <style jsx>
        {`
          #content-wrap {
            padding-bottom: 3.5rem;    /* Footer height */
          }

          #page-container {
            min-height: 100vh;
            position: relative;
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
            background-color: #fff;
          }
        `}
      </style>
    </div>
  )

}

export default MyApp
