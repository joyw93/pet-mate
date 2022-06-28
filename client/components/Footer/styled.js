import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  background: #fff;

  #members_container {
    width: 100%;
    background-color: #eee;
    padding: 20px 0;
  }
  #members {
    display: flex;
    width: 800px;
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
    font-size: 0.8rem;
    font-weight: bold;
  }
  #members a {
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
    background-image: url('img/kwak.jpg');
  }

  #son_face {
    background-image: url('img/son.png');
  }

  #jo_face {
    background-image: url('img/jo.png');
    background-color: #fff;
  }
  #copyright {
    display: flex;
  }
  #copyright > img {
    width: 28px;
    height: 28px;
  }
  #copyright p {
    line-height: 28px;
    margin-left: 5px;
    font-size: 0.9rem;
  }
`;
