import { apiConnector } from "./apiconnector";
import getJwtToken from "../../Utils/getJwtToken";
import { settingsEndpoints } from "../apis"

const { UPDATE_PROFILE_DATE } = settingsEndpoints;

// Api for updating profile data
export const updateProfileData = async (fullName, dateOfBirth) => {
  let result = null;
  try {
    const token = await getJwtToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await apiConnector(
      "POST",
      `${UPDATE_PROFILE_DATE}`,
      { fullName, dateOfBirth },
      headers
    );
    result = response.data;
  } catch (error) {
    if (error.response){
        result = error.response.data;
        console.error(result.message);
    }
  }
  return result;
};
