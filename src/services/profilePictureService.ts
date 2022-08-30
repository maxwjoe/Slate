import { v4 as uuidv4 } from "uuid";

// generatePictureString : Generates a random profile picture string
export const generatePictureString = () => {
  const PREFIX = "isAvatar_";
  const TYPE = "bottts_";
  const RAND_STRING = uuidv4().toString();
  const pictureString = PREFIX.concat(TYPE).concat(RAND_STRING);
  console.log(pictureString);
  return pictureString;
};

// getProfileImageFromAPI : Gets the random generated profile image from API
export const getProfileImageFromAPI = (userPictureString: any) => {
  if (!userPictureString) return "";
  const params = userPictureString.split("_");
  const resourceString: string = `https://avatars.dicebear.com/api/${params[1]}/${params[2]}.svg`;
  return resourceString;
};
