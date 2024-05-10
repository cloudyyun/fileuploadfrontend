import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
    UserPoolId: "us-east-1_eLBDiMGBB",
    ClientId: "7pasn3uv8lbvcdk7hudjor94cd",
};
export default new CognitoUserPool(poolData);