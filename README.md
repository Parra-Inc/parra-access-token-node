# parra-access-token-node

A utility class for signing Parra Access Token with node.js. 
For more information on Parra Access Tokens, please visit our [docs](https://docs.parra.io/topics/access-tokens) or check out our [Node.js integration guide](https://docs.parra.io/guides/node) for assistance in integrating with Parra.

## Installation

Run `npm install @parra/access-token`

## Usage

The Parra Access Token utility is for backend use with Node.js. It should never be used in the frontend.

The following is a simple example demonstrating how to sign a JWT using the Parra Access Token utility:

```javascript
const { AccessToken } = require("@parra/access-token")

const tenantId = process.env.PARRA_TENANT_ID
const apiKeyId = process.env.PARRA_API_KEY_ID
const apiKeySecret = process.env.PARRA_API_KEY_SECRET

const identity = "abc123" // The ID of the user in your system

const accessToken = new AccessToken(tenantId, apiKeyId, apiKeySecret, { identity })

const signedJwt = accessToken.toJwt()

// Payload to be returned to your user
const payload = { access_token: signedJwt }
```