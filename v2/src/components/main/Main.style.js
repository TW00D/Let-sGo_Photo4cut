import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  position: relative;
  background-color: black;
`;
export const CamWrapper = styled.div`
  height: 100%;
  width: 68vw;
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
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

export const Count = styled.h1`
  background-image: linear-gradient(to right, #db00ff, #455cec);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 4em;
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
  background: rgba(255, 255, 255, 0.4);
  color: white;
  font-size: 16px;
  font-family: "Pretendard";

  &::placeholder {
    font-size: 16px;
    font-family: "Pretendard";
    color: white;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  outline: none;
  margin: 10px;
  font-size: 1.5em;
  text-align: center;
  font-weight: 500;
  font-family: "Pretendard";
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(130, 50, 234, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const ButtonSelect = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  outline: none;
  margin: 10px;
  font-size: 1.5em;
  text-align: center;
  font-weight: 400;
  font-family: "Pretendard";
  color: rgba(0, 0, 0, 0.8);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px 0 rgba(130, 50, 234, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
export const TakeButton = styled.image``;
