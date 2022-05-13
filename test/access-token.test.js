const { AccessToken } = require("../lib/access-token")
const jwt = require("jsonwebtoken")

describe("Access Token Tests", () => {
    it("can sign and verify an access token", () => {
        const tenantId = "tenant-id"
        const apiKeyId = "api-key-id"
        const apiKeySecret = "api-key-secret"
        const identity = "1"

        const accessToken = new AccessToken(tenantId, apiKeyId, apiKeySecret, { identity })

        const signedJwt = accessToken.toJwt()

        // Verify the JWT
        const verifiedJwt = jwt.verify(signedJwt, apiKeySecret)

        expect(verifiedJwt).toEqual({
            jti: expect.any(String),
            grants: { identity },
            iat: expect.any(Number),
            exp: expect.any(Number),
            iss: apiKeyId,
            sub: tenantId
        })
    })
})