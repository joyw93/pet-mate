import { FooterContainer } from './styled';

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <div id='members_container'>
          <div id='members'>
            <div>
              <div id='kwak_face'>
                <a href='https://github.com/kkwakkwake'></a>
              </div>
              <p>곽성이 FrontEnd</p>
              <p>glowupup@naver.com</p>
            </div>
            <div>
              <div id='son_face'>
                <a href='https://github.com/lili-ys'></a>
              </div>
              <p>손유경 FrontEnd</p>
              <p>mdlife94@gmail.com</p>
            </div>
            <div>
              <div id='jo_face'>
                <a href='https://github.com/joyw93'></a>
              </div>
              <p>조용원 BackEnd</p>
              <p>joyw93@naver.com</p>
            </div>
          </div>
        </div>
        <div id='copyright'>
          <a href='https://github.com/joyw93/pet-mate'>
            <img src='img/git.png' alt='github' />
          </a>
          <p>Copyright ⓒ 2022 PETMATE</p>
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;
