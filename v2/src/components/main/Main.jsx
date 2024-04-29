import React, { useEffect, useRef, useState } from "react";
import * as M from "./Main.style";
import axios from "axios";

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";

import logo from "../../assets/logo.svg";
import takePicture from "../../assets/takePicture.svg";

// const Main = () => {
//   const canvasRef = useRef(null);
//   const webcamRef = useRef(null);
//   // bodypix
//   const [bodypixnet, setBodypixnet] = useState();
//   // 찍힌 이미지
//   const [image, setImage] = useRecoilState(imageState);
//   // 배경 이미지
//   const [backImage, setBackImage] = useState();

//   useEffect(() => {
//     bodyPix.load().then((net) => {
//       setBodypixnet(net);
//     });
//   }, []);

//   const navigater = useNavigate();
//   useEffect(() => {
//     if (image.length === 2) {
//       navigater("result");
//     }
//   }, [image]);

//   useEffect(() => {
//     console.log(backImage);
//   }, [backImage]);

//   async function drawMask(
//     webcam,
//     canvas,
//     tempCtx,
//     tempCanvas,
//     originCtx,
//     originCanvas,
//     context
//   ) {
//     requestAnimationFrame(() =>
//       drawMask(
//         webcam,
//         canvas,
//         tempCtx,
//         tempCanvas,
//         originCtx,
//         originCanvas,
//         context
//       )
//     );
//     const segmentation = await bodypixnet.segmentPerson(webcam);
//     const mask = bodyPix.toMask(segmentation);
//     tempCtx.putImageData(mask, 0, 0);

//     // 웹캠을 저장
//     originCtx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
//     originCtx.save();
//     originCtx.globalCompositeOperation = "destination-out";
//     originCtx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
//     originCtx.restore();

//     // 진짜 ctx를 초기화
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     if (backImage) {
//       context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
//     }
//     context.drawImage(originCanvas, 0, 0, canvas.width, canvas.height);
//   }

//   let req;
//   const drawimage = async (webcam, context, canvas) => {
//     const originCanvas = document.createElement("canvas");
//     originCanvas.width = webcam.videoWidth;
//     originCanvas.height = webcam.videoHeight;
//     const originCtx = originCanvas.getContext("2d");

//     // 똑같은 크기의 켄바스를 만든다
//     const tempCanvas = document.createElement("canvas");
//     tempCanvas.width = webcam.videoWidth;
//     tempCanvas.height = webcam.videoHeight;
//     const tempCtx = tempCanvas.getContext("2d");

//     (async function drawMask() {
//       requestAnimationFrame(drawMask);
//       // tempcanvas에 마스크를 그린다
//       const segmentation = await bodypixnet.segmentPerson(webcam);
//       const mask = bodyPix.toMask(segmentation);
//       tempCtx.putImageData(mask, 0, 0);

//       // 웹캠을 저장
//       originCtx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
//       originCtx.save();
//       originCtx.globalCompositeOperation = "destination-out";
//       originCtx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
//       originCtx.restore();

//       // 진짜 ctx를 초기화
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       if (backImage) {
//         context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
//       }
//       context.drawImage(originCanvas, 0, 0, canvas.width, canvas.height);
//     })();
//     req = requestAnimationFrame(() =>
//       drawMask(
//         webcam,
//         canvas,
//         tempCtx,
//         tempCanvas,
//         originCtx,
//         originCanvas,
//         context
//       )
//     );
//   };

//   const clickHandler = (backImgName) => {
//     const webcam = webcamRef.current.video;
//     const canvas = canvasRef.current;
//     // 켄바스, 웹캠, 비디오 사이즈를 같게 한다

//     webcam.width = canvas.width = webcam.videoWidth;
//     webcam.height = canvas.height = webcam.videoHeight;

//     const context = canvas.getContext("2d");
//     // // 켄바스 지우기
//     // context.clearRect(0, 0, canvas.width, canvas.height);

//     // // const [webcam,context,canvas] = webcamSetter();

//     // // 배경 변경
//     // if (backImgName) {
//     //   const img = new Image();
//     //   img.src = backImgName;
//     //   setBackImage(img);
//     //   // img.onload = () => {
//     //   //   setBackImage(img);
//     //   // };
//     // } else {
//     //   setBackImage(null);
//     // }

//     // 바디픽서가 없을 땐 에러가 뜨기 때문에
//     if (bodypixnet) {
//       drawimage(webcam, context, canvas);
//       // drawimage(...value);
//     }
//   };

//   // --------- 사진 찍기
//   function snapshot() {
//     // console.log(
//     //   "canvasRef.current.toDataURL",
//     //   canvasRef.current.toDataURL("image/jpeg")
//     // );

//     // setImage((prev) => [...prev, canvasRef.current.toDataURL("image/jpeg")]);
//     setImage((prev) => [...prev, canvasRef.current.toDataURL("image/jpeg")]);

//     // setImage((prev) => [...prev,webcamRef])
//     // console.log(webcamRef.current.video.toDataURL("image/jpeg"));
//   }
//   //testcommit
//   const videoConstraints = {
//     // width: "1000px",
//     // height: "720px",
//     facingMode: "user",
//   };

//   function resetRAF() {
//     cancelAnimationFrame(req);
//   }

//   return (
//     <M.Wrapper>
//       <M.CamWrapper>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           width={1280}
//           height={720}
//           screenshotFormat="image/jpeg"
//           className="webcam"
//           //   videoConstraints={videoConstraints}
//         />
//         <canvas ref={canvasRef} className="canvas" />
//       </M.CamWrapper>
//       <M.ButtonWrapper>
//         <M.Header>
//           <M.HeaderImg src={logo}></M.HeaderImg>
//         </M.Header>
//         <div>
//           <div>
//             <M.TextImg src={setBackground}></M.TextImg>
//             <div>
//               <M.Button onClick={() => clickHandler(dinosaur)}>
//                 쥬라기 스쿨
//               </M.Button>
//               <M.Button onClick={() => clickHandler(spongibab)}>
//                 스폰지밥
//               </M.Button>
//               <M.Button onClick={() => clickHandler(playGroundImg)}>
//                 학교 운동장
//               </M.Button>
//             </div>
//           </div>
//           <div>
//             <div>
//               <M.Button onClick={() => clickHandler(schoolFrontImg)}>
//                 학교 기숙사동
//               </M.Button>
//               <M.Button onClick={() => clickHandler(schoolBackImg)}>
//                 학교 크로마키
//               </M.Button>
//               <M.Button onClick={() => clickHandler(cb)}>벚꽃</M.Button>
//             </div>
//           </div>
//         </div>
//         <div>
//           <M.TextImg2 src={setFilter}></M.TextImg2>

//           <div>
//             <M.Button onClick={() => clickHandler(dinosaur)}>
//               쥬라기 스쿨
//             </M.Button>
//             <M.Button onClick={() => clickHandler(jjanggu)}>짱구</M.Button>
//             <M.Button onClick={() => clickHandler(playGroundImg)}>
//               학교 운동장
//             </M.Button>
//           </div>
//           <div>
//             <M.Button onClick={() => clickHandler(lupi)}>잔망루피</M.Button>
//             <M.Button onClick={() => clickHandler(spongibab)}>
//               스폰지밥
//             </M.Button>
//             <M.Button onClick={() => clickHandler(playGroundImg)}>
//               학교 운동장
//             </M.Button>
//           </div>
//         </div>

//         {/* <M.Button onClick={() => resetRAF()}>배경 없애기</M.Button> */}
//         <M.TakeButton
//           src={takePicture}
//           onClick={() => snapshot()}
//         ></M.TakeButton>
//         <img src={takePicture} onClick={() => snapshot()}></img>
//         <M.TakeButton src={takePicture}></M.TakeButton>
//         {/* {
//             image.map((e,idx) => (
//                 <img src={e} key={idx} />
//             ))
//         } */}
//       </M.ButtonWrapper>
//     </M.Wrapper>
//   );
// };

// export default Main;

export default function Main() {
  const videoRef = useRef(null);

  const [filterO, setfilter] = useState("");
  const video = document.getElementById("videoCam");
  const canvas = document.getElementById("canvas");
  const [CanvasState, setCanvasState] = useState("none"); //사
  const [CameraState, setCameraState] = useState(""); //사

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

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
      formData.append("prompt", "best quality, (realistic:1.5), profile, boy, amazing quality, very aesthetic");
      formData.append("input", file);
      const uploadFile = [file]; //이미지 객체

      axios
        .post("http://localhost:5000/generate", formData)
        .then((response) => {
          console.log("File uploaded successfully:", response);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }, "image/png");

    const image = canvas.toDataURL(); // 이미지 저장하는 코드
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
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
