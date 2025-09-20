import { apiConnector } from "./apiconnector";
import { selfAssessmentEndpoints } from "../apis";
import getJwtToken from "../../Utils/getJwtToken";

const headerWithToken = async () => {
    const token = await getJwtToken(); // Resolve the token asynchronously
    return { "Authorization": `Bearer ${token}` };
};

const {
  GET_SELF_ASSESSMENT_NAMES,
  GET_SELF_ASSESSMENT_QUESTIONS,
  GET_SELF_ASSESSMENT_RESULT,
} = selfAssessmentEndpoints;
