import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  position: relative;
  background-color: white;
`;
export const CamWrapper = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  .webcam {
    border-radius: 15px;
    width: 960px;
    height: 720px;
  }
  .canvas {
    position: absolute;
    width: 960px;
    height: 720px;
    border-radius: 15px;
  }
`;
export const ButtonWrapper = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: flex-start;
`;

export const Header = styled.header`
  display: Flex;
  align-items: center;
  flex-direction: column;
`;
export const HeaderImg = styled.img`
  width: 5vw;
`;
export const Title = styled.h2`
  background-image: linear-gradient(to right, #db00ff, #455cec);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.5em;
  text-align: center;
  font-weight: 600;
  font-family: "Pretendard";
  margin-left: 10px;
`;

export const Input = styled.input`
  margin-left: 10px;
  height: 50px;
  border-radius: 10px;
  outline: none;
  border: none;
  border: 1px solid #bdbdc8;
  padding-left: 13px;

  &::placeholder {
    font-size: 16px;
    font-family: "Pretendard";
    color: #a6a6a6;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  outline: none;
  border: 0px;
  background-color: #f2f2f2;
  margin: 10px;
`;
export const TakeButton = styled.image``;
