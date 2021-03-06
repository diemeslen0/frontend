import { Component } from 'react'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'
import { desktopHeaderAndFilterHeight } from '../../../constants/dimensions'

export default class ListingsNotFound extends Component {
  render() {
    const { resetAllParams } = this.props

    return <div className="container" onClick={resetAllParams}>
      <div>
        <p>Não encontramos listagens para sua busca.</p>
        <p>Clique aqui para limpar os filtros.</p>
      </div>

      <style jsx>{`
        .container {
          align-items: center;
          border: 1px solid ${colors.lightGray};
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          height: calc(100vh - ${desktopHeaderAndFilterHeight + 40}px);
          margin-top: 20px;
          justify-content: space-around;
          width: calc(100% - 20px);
          &:hover {
            background: ${colors.offWhite};
          }
          div {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
        }

        p {
          color: ${colors.red};
          font-weight: 600;
          margin: 0 0 10px;
          max-width: calc(100% - 40px);
          text-align: center;
        }

        @media ${mobileMedia} {
          .container {
            margin-left: 20px;
            width: calc(100% - 40px);
          }
        }
      `}</style>
    </div>

  }
}
