import Layout from "../components/Layout"
import Link from 'next/link'

const Error = ({ statusCode }) => {
  return (
    <Layout title='Oh no :('>
      <p>
        {statusCode === 404
          ? (
            <div className="message">
              <h1>Esta página no existe :(</h1>
              <p>
                <Link href="/"><a>Volver al home</a></Link>
              </p>
            </div>
          )
          : (
            <div className="message">
              <h1>Hubo un problema :(</h1>
              <p>Intenta nuevamente en unos segundos</p>
            </div>
          )}
      </p>

      <style>{`
        .message {
          padding: 100px 30px;
          text-align: center;
        }
        h1 {
          margin-bottom: 1em
        }
        a {
          color: #8756ca
        }
      `}</style>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error