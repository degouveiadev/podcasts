import React from 'react'

const Home = () => <div>
  <img src="/images/platzi-logo.webp" alt="Platzi" />
  <h1>Curso de Next.js de Platzi</h1>
  <p>Creado por @juanchordg</p>

  <style jsx>{`
    h1 {
      color: white;
      margin: 0
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh
    }

    :global(div p) {
      color: white;
    }

    img {
      max-width: 100px;
      display: block;
      margin-bottom: 2rem
    }
  `}</style>

  <style jsx global>{`
    body {
      background: #1d3642;
      margin: 0;
    }
  `}</style>
</div>

export default Home
