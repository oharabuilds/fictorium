import styled from 'styled-components'

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  .background {
    opacity: 0.25;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 0;
    overflow: hidden;

    .ReactGridGallery {
      transform: scale(2);
      transform-origin: top left;

      .ReactGridGallery_tile {
        margin: 0 !important;
        img {
          transform: scale(1);
        }
      }
    }
  }

  .emojis {
    position: fixed;
    pointer-events: none;
    bottom: 1vw;
    right: 2vw;
    font-size: 100px;
    z-index: 2;
  }

  .container {
    max-width: 1000px;
    box-sizing: border-box;
    padding: 25px 5vw;
    width: 100%;
    position: relative;
    z-index: 1;
    background: linear-gradient(45deg, black, #ff00e7db);
    min-height: 100vh;
    text-align: center;
    padding-bottom: 10vw;

    .header-title {
      display: flex;
      flex-direction: column;
      align-items: center;

      .fictorium-image {
        width: 300px;
        border-radius: 100%;
        height: 300px;
      }

      h1 {
        font-size: 45px;
        line-height: 130%;
        font-family: 'Henny Penny';
        color: #42ffd7;
        text-align: center;
      }

      p {
        max-width: 600px;
        font-size: 120%;
      }
    }

    form {
      input[type="text"] {
        width: 100%;
        padding: 15px;
        background: black;
        color: white;
        border: 1px solid grey;
        border-radius: 5px;
        outline: none;
        margin-bottom: 50px;
      }

      input[type="submit"] {
        width: 100%;
        padding: 15px;
        background: linear-gradient(45deg, #d500ff, #2a13ff7d);
        color: black;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid grey;
        border-radius: 5px;
        outline: none;
      }
    }

    .check-images {
      display: flex;
      justify-content; center;

      input {
        margin-right: 15px;
        cursor: pointer;
      }
    }

    .images {

      h2 {
        font-size :50px;
        text-transform: uppercase;
        text-align: center;
        line-height: 100%;
        padding: 25px;
        border: 1px solid white;
        box-sizing: border-box;
        margin-top: 100px;
      }
      .image-container {
        margin-bottom: 50px;
        padding-bottom: 50px;
        font-size: 30px;
        border-bottom: 3px solid grey;

        p {
          font-family: cursive;
          text-align: center;
        }
        img {
          width: 100%;
        }
      }

    }
  }
`

export default HomeStyled
