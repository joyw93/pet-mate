import styled from "styled-components";

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
    padding-bottom: 20px;
  }
  #members {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;
    justify-content: space-around;
  }
  #members > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  #members p,
  #members > div > a {
    display: block;
    margin-top: 7px;
    font-size: 0.9em;
  }
  #members p {
    font-weight: bold;
  }
  #members div div a {
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
    background-image: url("../../img/kwak.jpg");
  }

  #son_face {
    background-image: url("../../img/son.png");
  }

  #jo_face {
    background-image: url("../../img/jo.png");
    background-color: #fff;
  }
  #copyright {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 0;
  }
  #copyright > a,
  #copyright img {
    display: block;
    width: 32px;
    height: 32px;
  }
  #copyright p {
    line-height: 32px;
    margin-left: 5px;
    font-size: 0.9rem;
  }
`;
