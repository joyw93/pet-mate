import styled from 'styled-components';

export const BannerContainer = styled.div`
  width: 100%;
`;

export const BannerItem = styled.div`
  width: 100%;
  height: 800px;
  background-image: url(${(props) => props.url});
`;
