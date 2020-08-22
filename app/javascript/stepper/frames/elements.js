import styled from "styled-components";
import { getColor } from "helpers/palette";

export const Title = styled.h2`
  font-size: 2.4rem;
  line-height: 48px;
  font-weight: 300;
  margin-bottom: 1.5rem;
`;
export const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  margin-left: 1.5rem;
`;
export const Label = styled(SubTitle)``;
export const Details = styled.p`
  margin-left: 2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
`;
export const StyledFrame = styled.div`
  border-top: 1px solid ${getColor("lightBorder")};
  color: rgba(41, 41, 41, 1);
  height: 100%;
  font-size: 1.1rem;
  margin-top: 4rem;
  padding: 2rem 2rem 0 2rem;
`;
