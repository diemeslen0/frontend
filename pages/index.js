import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-unfetch'

import Layout from '../components/main-layout'
import MapContainer from "../components/map-container"
import Listing from "../components/listings/index/listing"

export default class MyPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        lockGoogleMap: false
      }
    }

  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch(process.env.REACT_APP_API_URL + 'listings/')
    const json = await res.json()

    return { listings: json.data }
  }

  componentDidMount = () => {
    const that = this

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTrigger = 137
    const scrollTop = document.documentElement.scrollTop

    if (scrollTop > scrollTrigger) {
      this.setState({ lockGoogleMap: true })
    } else {
      this.setState({ lockGoogleMap: false })
    }
  }

  render () {
    const { listings } = this.props
    const { lockGoogleMap } = this.state

    return (
      <Layout>
        <Head>
          <title>EmCasa - Compre e venda imóveis na Zona Sul do Rio de Janeiro</title>
          <meta property="og:description"
          content="Conteúdo do Index"/>
        </Head>

        <div className="listings">
          <h1>Compre seu Imóvel na<br/>Zona Sul do Rio de Janeiro</h1>

          <div className={lockGoogleMap ? 'locked' : ''}>
            <MapContainer
              listings={listings}
              height="calc(100vh - 50px)"
              width="50vw"/>
          </div>

          <div className="entries-container">
            {listings.map((listing, i) => {
              return <Listing listing={listing} key={i} />
            })}
          </div>
        </div>

        <style jsx>{`
          .listings h1 {
            line-height: 1.2em;
            margin-bottom: 40px;
            text-align: center;
          }

          .listings > div {
            float: left;
            width: 50%;
          }

          .listings > div.entries-container {
            float: right;
          }

          .listings > div.map-container {
            float: left;
          }

          @media (max-width: 600px) {
            .listings > div:first-of-type {
              display: none;
            }

            .listings > div.entries-container {
              width: 100%;
            }
          }

        `}</style>
        <style jsx global>{`
          div.locked > div {
            position: fixed !important;
            top: 56px;
          }
        `}</style>
      </Layout>
    )
  }
}
