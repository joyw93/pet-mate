import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 200px;
  background: #fff;

  #members_container {
    width: 100%;
    background-color: #eee;
    padding: 20px 0;
  }
  #members {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    justify-content: space-between;
  }
  #members > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #members p {
    margin-top: 7px;
    font-size: 0.9rem;
  }
  #members p:nth-of-type(1) {
    font-weight: bold;
  }
  #members a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  #kwak_face,
  #son_face,
  #jo_face {
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 50%;
  }

  #kwak_face {
    background-image: url('../img/kwak.jpg');
  }

  #son_face {
    background-image: url('../img/son.png');
  }

  #jo_face {
    background-image: url('../img/jo.png');
    background-color: #fff;
  }
  #copyright {
    display: flex;
    justify-content: center;
  }
  #copyright > a,
  #copyright img {
    display: block;
    width: 28px;
    height: 28px;
  }
  #copyright p {
    line-height: 28px;
    margin-left: 5px;
    font-size: 0.9rem;
  }
`;
