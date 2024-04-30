import React, { useEffect, useRef, useState } from "react";

import * as M from "./Main.style";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { imageState } from "../../global/image";
import logo from "../../assets/logo.svg";
import takePicture from "../../assets/takePicture.svg";
import { useRecoilState } from "recoil";

export default function Main() {
  const videoRef = useRef(null);

  const [filterO, setfilter] = useState("");
  const video = document.getElementById("videoCam");
  const canvas = document.getElementById("canvas");
  const [CanvasState, setCanvasState] = useState("none"); //사
  const [CameraState, setCameraState] = useState(""); //사

  const [isFin, setisFin] = useState(false);
  const [image, setImage] = useRecoilState(imageState);
  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  useEffect(() => {
    console.log(image);
    if (image.length === 2) {
      setisFin(true);
    }
  }, [image]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isFin) {
      navigate("/result");
    }
  }, [isFin, navigate]);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  function GoToCamera(target) {
    // 다시 촬영
    const context = canvas.getContext("2d");
    context.scale(-1, 1); // 좌우 반전
    context.translate(-1024, 0); // 좌우 반전
    context.drawImage(video, 0, 0, "1024", "768");
    setCanvasState("none");
    setCameraState("");
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }

  function sreenShot(target) {
    // 카메라 촬영
    setCanvasState(""); // 켄버스 켜기
    setCameraState("none"); //비디오 끄기
    const video = document.getElementById("videoCam");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.scale(-1, 1); // 좌우 반전
    context.translate(-1024, 0); // 좌우 반전
    context.drawImage(video, 0, 0, "1024", "768");
    canvas.toBlob((blob) => {
      //캔버스의 이미지를 파일 객체로 만드는 과정
      let file = new File([blob], "fileName.jpg", { type: "image/png" });
      const formData = new FormData();
      formData.append(
        "prompt",
        "best quality, (realistic:1.5), profile, boy, amazing quality, very aesthetic"
      );
      formData.append("input", file);
      const uploadFile = [file]; //이미지 객체
      axios
        .post("http://localhost:5000/generate", formData)
        .then((response) => {
          console.log("File uploaded successfully:", response);
          console.log(response.data);
          setImage((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }, "image/png");

    const image = canvas.toDataURL(); // 이미지 저장하는 코드
    const link = document.createElement("a");
    link.href = image;
    // link.download = "Let'Go";
    link.click();

    const s = videoRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
  }

  return (
    <M.Wrapper>
      <M.CamWrapper>
        <video
          id="videoCam"
          ref={videoRef}
          autoPlay
          style={{
            display: CameraState,
            width: "1280px",
            height: "720px",
            webkitTransform: "rotateY(180deg)",
          }}
        />
        <canvas
          id="canvas"
          width="1280px"
          height="720px"
          style={{ display: CanvasState }}
        ></canvas>
      </M.CamWrapper>
      <M.ButtonWrapper>
        <M.Header>
          <M.HeaderImg src={logo}></M.HeaderImg>
          <M.Title>레츠고 AI네컷</M.Title>
          <M.ContentWrapper>
            <M.Title>성별</M.Title>
            <div>
              <M.Button>여성</M.Button>
              <M.Button>남성</M.Button>
            </div>
          </M.ContentWrapper>
          <M.ContentWrapper>
            <M.Title>프롬프트</M.Title>
            <div>
              <M.Input></M.Input>
            </div>
          </M.ContentWrapper>
        </M.Header>

        {/* <M.TakeButton
          src={takePicture}
          onClick={() => snapshot()}
        ></M.TakeButton>
        <img src={takePicture} onClick={() => snapshot()}></img>
        <M.TakeButton src={takePicture}></M.TakeButton> */}

        {CanvasState === "none" ? (
          <div
            onClick={sreenShot}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70px",
              height: "70px",
              margin: "10px",
              borderRadius: "100px",
              position: "absolute",
              zIndex: "101",
              bottom: "5%",
              left: "46%",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: "60px",
                height: "60px",
                border: "2px solid",
                borderRadius: "100px",
              }}
            ></div>
          </div>
        ) : (
          <div
            onClick={GoToCamera}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70px",
              height: "70px",
              margin: "10px",
              borderRadius: "10px",
              position: "absolute",
              zIndex: "101",
              bottom: "5%",
              left: "46%",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <p>다시 촬영</p>
          </div>
        )}
      </M.ButtonWrapper>
    </M.Wrapper>
  );
}
