import Link from "next/link";
import { SanchaekContainer, SanchaekBanner } from "./styled";
import ContentList from "./ContentList";

const SanchaekMain = () => {
  return (
    <SanchaekContainer>
      <SanchaekBanner>
        <Link href="/sanchaek/post">
          <a>
            <img src="../img/sanchaekbanner.png" />
          </a>
        </Link>
      </SanchaekBanner>
      <ContentList />
    </SanchaekContainer>
  );
};

export default SanchaekMain;
