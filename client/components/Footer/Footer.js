import { FooterContainer } from "./styled";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <div id="members_container">
          <div id="members">
            <div>
              <div id="kwak_face">
                <a href="https://github.com/kkwakkwake"></a>
              </div>
              <p>곽성이 FrontEnd</p>
              <a href="mailto:glowupup@naver.com">glowupup@naver.com</a>
            </div>
            <div>
              <div id="son_face">
                <a href="https://github.com/ys9494"></a>
              </div>
              <p>손유경 FrontEnd</p>
              <a href="mailto:ykson94@gmail.com">ykson94@gmail.com</a>
            </div>
            <div>
              <div id="jo_face">
                <a href="https://github.com/joyw93"></a>
              </div>
              <p>조용원 BackEnd</p>
              <a href="mailto:joyw93@naver.com">joyw93@naver.com</a>
            </div>
          </div>
        </div>
        <div id="copyright">
          <a href="https://github.com/joyw93/pet-mate">
            <img src="../../img/git.png" alt="github" />
          </a>
          <p>Copyright ⓒ 2022 PETMATE</p>
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;
