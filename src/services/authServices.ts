import axios from "axios";
import { IAuth } from "../interfaces/AuthInterface";
import { v4 as uuid } from "uuid";
import { randomInt } from "crypto";
import { generatePictureString } from "./profilePictureService";
import { IArticle, IList, ISource } from "../interfaces/DataInterfaces";
import sourceService from "./sourceService";
import articleService from "./articleService";
import ListService from "./listService";

const API_URL: string = `${process.env.REACT_APP_API_BASE_ENDPOINT}/api/users/`;
console.log(API_URL);

// register : Registers the user in the backend
const register = async (userData: IAuth) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data as IAuth;
};

// login :logs the user in by contacting backend and getting data
const login = async (userData: IAuth) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data as IAuth;
};

// updateUser : Updates the user in the backend
const updateUser = async (userObj: IAuth, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(API_URL, userObj, config);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// logout : Logs out the user
const logout = async () => {
  localStorage.removeItem("user");
};

// registerDemo : Registers a Demo User
const registerDemo = async () => {
  // Register the user
  const userData: any = {
    username: "Demo User",
    email: `${uuid()}@demo_${Math.floor(Math.random() * 10)}.com`,
    password: uuid().toString(),
    profileImage: generatePictureString(),
    isDemo: true,
  };

  const registerResponse = await register(userData);

  const userLS: any = JSON.parse(localStorage.getItem("user") as string);
  const token: string = userLS?.token as string;

  //   // Generate demo sources
  //   const sourceOne: any = {
  //     title: "Korean News",
  //     language: "ko",
  //   };

  //   const sourceTwo: any = {
  //     title: "Think of something",
  //     language: "de",
  //   };

  //   const sourceOneObj: ISource = await sourceService.createSource(
  //     sourceOne,
  //     token
  //   );

  //   const listOne: any = {
  //     title: "Korean Vocab",
  //     source: sourceOneObj._id,
  //   };

  //   const listOneObj: IList = await ListService.createList(listOne, token);

  //   const articleOne: any = {
  //     title: "News Extract",
  //     source: sourceOneObj._id,
  //     associatedList: listOneObj._id,
  //     content: `국내 최초 달 탐사선 다누리가 촬영한 첫번째 지구와 달 사진이 공개됐다. 우리나라가 지구 중력권을 벗어난 곳에서 처음 찍은 사진이다.

  // 과학기술정보통신부와 한국항공우주연구원은 지난달 26일 지구에서 124만㎞ 떨어진 곳에서 다누리의 고해상도카메라로 촬영한 달과 지구의 사진을 1일 공개했다.

  // 고해상도카메라는 우리나라가 개발할 달 착륙선의 착률 후보지를 찾기 위한 장비다. 이번에 공개한 사진은 임무 목적상 촬영거리인 100㎞보다 1만 2천배 이상 떨어진 거리에서 기능 점검을 위해 촬영한 것이다.

  // 다누리 임무운영을 담당하는 항우연 조영호 박사는 "다누리 본체와 탑재체 모두 정상 운영되고 있다. 이번에 다누리가 보내온 지구와 달 사진은 먼 거리에서 촬영해 해상도가 좋지는 않지만, 의미있는 결과물을 보여드릴 수 있어 기쁘다"라고 밝혔다.

  // 또 다누리의 다른 탑재체인 자기장측정기는 다누리 발사 후 약 5시간 뒤, 지구 자기장의 경계면인 자기권계면 관측에 성공했다. 자기권계면은 지구자기장에 의해 형성된 경계면으로, 우주에서 유입되는 강한 우주선과 태양풍을 차단해 지구에 생명체가 살 수 있는 환경을 만드는 보호막 역할을 한다.

  // 해외 관측자료를 통해서만 확인할 수 있던 자기권계면을 우리나라가 개발한 다누리로 직접 관측했다는 점에서 의미 있다고 과기정통부는 설명했다.`,
  //   };

  //   const newArticle: IArticle = await articleService.createArticle(
  //     articleOne,
  //     token
  //   );

  return registerResponse;
};

const authService = {
  register,
  registerDemo,
  logout,
  updateUser,
  login,
};

export default authService;
