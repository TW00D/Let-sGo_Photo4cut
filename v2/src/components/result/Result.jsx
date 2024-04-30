import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { imageState } from "../../global/image";
import * as R from "./Result.style";
import logo from "../../assets/logo.png";
import SampleCom from "./sampleCom/SampleCom";
import setColor from "../../assets/setColor.svg";
import setImg from "../../assets/setImg.svg";
import setText from "../../assets/setText.svg";
import setOption from "../../assets/setOption.svg";
import cloud from "../../assets/backImg/cloud.jpg";
import galaxy from "../../assets/backImg/galaxy.jpg";
import newLogo from "../../assets/logo.svg";

const Result = () => {
  // 기본색은 검정
  const [resultBackColor, setResultBackColor] = useState("black");
  const [resultBackImg, setResultBackImg] = useState();
  const [comment, setCommnet] = useState("Let's Go에 많은 관심 부탁드립니다");
  //   const [commentOption,setCommentOption] = useState({
  //     color:"white",
  //     bold:false,
  //     ital:false,
  //   })
  const [commentColor, setCommentColor] = useState("white");
  const [commentBold, setCommentBold] = useState(false);
  const [commentItal, setCommentItal] = useState(false);

  const [image, setImage] = useRecoilState(imageState);

  const colors = [
    "black",
    "#eeeeee", // 흰색
    "#FEC7CD",
    "#50bcdf",
  ];

  /**배경을 단색으로 했을 때 */
  function colorHandler(color) {
    // 이미지 없애기
    setResultBackImg("");
    setResultBackColor(color);
  }
  /**배경을 사진으로 했을 때 */
  function imageHandler(imgSrc) {
    // 검정색 초기화
    setResultBackColor("black");
    setResultBackImg(imgSrc);
  }

  const navigater = useNavigate();
  function exitHandler() {
    if (window.confirm("편집을 끝내고 나가실건가요?") === true) {
      setImage([]); // 이미지 초기화
      navigater("/");
    }
  }

  useEffect(() => {
    console.log(resultBackImg);
  }, [resultBackImg]);

  return (
    <R.Wrapper>
      <R.ResultWrapper>
        <R.ResultContent backColor={resultBackColor}>
          {image.map((i, idx) => (
            <R.UserImg key={idx} src={i} />
          ))}
          {resultBackImg && <R.ResultImg src={resultBackImg} />}
          <R.ResultLogo
            color={commentColor}
            bold={commentBold}
            ital={commentItal}
          >
            <p>{comment}</p>
            <img src={logo} />
          </R.ResultLogo>
        </R.ResultContent>
      </R.ResultWrapper>
      <R.ButtonWrapper>
        <R.logo src={newLogo} />
        <R.BasicBackWrapper>
          <R.ExplanText src={setColor} />
          <R.BasicBacks>
            {colors.map((i) => (
              <R.BasicBack
                key={i}
                backColor={i}
                onClick={() => colorHandler(i)}
              />
            ))}
            <input
              type="color"
              value={resultBackColor}
              placeholder="선택"
              onChange={(e) => colorHandler(e.target.value)}
            />
          </R.BasicBacks>
        </R.BasicBackWrapper>
        <R.ImgBackWrapper>
          <R.ExplanText src={setImg} />
          <R.ImgBack>
            <SampleCom
              clickHandler={() => setResultBackImg(cloud)}
              source={cloud}
            />
            <SampleCom
              clickHandler={() => setResultBackImg(galaxy)}
              source={galaxy}
            />
            <SampleCom
              clickHandler={() => setResultBackImg(galaxy)}
              source={galaxy}
            />
          </R.ImgBack>
        </R.ImgBackWrapper>

        <R.CommentWrapper>
          <R.ExplanText src={setText} />
          <input
            type="text"
            value={comment}
            onChange={(e) => setCommnet(e.target.value)}
          />
        </R.CommentWrapper>
        <R.CommentOptionWrapper>
          <R.ExplanText src={setOption} />
          <R.CommentOptions>
            <R.CommentOptionColor
              selected={commentColor === "black"}
              att="black"
              onClick={() => setCommentColor("black")}
            >
              검정색
            </R.CommentOptionColor>
            <R.CommentOptionColor
              att="white"
              selected={commentColor === "white"}
              onClick={() => setCommentColor("white")}
            >
              흰색
            </R.CommentOptionColor>
            <R.CommentOptionSplit>|</R.CommentOptionSplit>
            <R.CommentOptionBold
              selected={commentBold}
              onClick={() => setCommentBold((prev) => !prev)}
            >
              굵게
            </R.CommentOptionBold>
            <R.CommentOptionSplit>|</R.CommentOptionSplit>
            <R.CommentOptionItal
              selected={commentItal}
              onClick={() => setCommentItal((prev) => !prev)}
            >
              이텔릭
            </R.CommentOptionItal>
          </R.CommentOptions>
        </R.CommentOptionWrapper>
      </R.ButtonWrapper>
      <R.ExitWrapper>
        <R.Exit onClick={exitHandler}>나가기</R.Exit>
      </R.ExitWrapper>
    </R.Wrapper>
  );
};

export default Result;
