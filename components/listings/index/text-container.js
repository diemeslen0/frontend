import React from 'react'
import Link from 'next/link'

import ListingTable from '../listing_table'

import { mobileMedia } from '../../../constants/media'

class TextContainer extends React.Component {
  render() {
    const { listing, isAuthenticated } = this.props

    return (
      <div className="text-container">
        <div className="description">
          {listing.description}
        </div>

        <ListingTable listing={listing}/>

        <div className="link-container">
          {isAuthenticated && <Link href={`/listings/edit?id=${listing.id}`} as={`/listings/${listing.id}/edit`}>
            <a>Editar</a>
          </Link>}

          <Link href={`/listing?id=${listing.id}`} as={`/listing/${listing.id}`} >
            <a className="btn">Ver Detalhes</a>
          </Link>
        </div>


        <style jsx>{`
          .text-container {
            float: left;
            width: calc(100% - 300px);
          }

          div.description {
            font-size: 14px;
            margin: 20px 10px 0;
          }

          .link-container {
            align-items: center;
            display: flex;
            float: right;
            .btn {
              margin: 14px 14px 14px 20px;
            }
          }


          @media ${mobileMedia} {
            .text-container {
              width: 100%;
            }

            a.btn {
              margin: 10px 10px 30px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default TextContainer
