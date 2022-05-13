'use strict';

const assert = require("assert")
const jwt = require('jsonwebtoken');

const DEFAULT_ALGORITHM = 'HS256';
const ALGORITHMS = ['HS256', 'HS384', 'HS512'];

class AccessToken {

    /**
     * @constructor
     * @param {string} tenantId - The account's unique ID to which access is scoped
     * @param {string} apiKeyId - The signing key's unique ID
     * @param {string} apiKeySecret - The apiKeySecret to sign the token with
     * @param {object} options - ...
     * @param {number} [options.ttl=3600] - Time to live in seconds
     * @param {string} [options.identity] - The identity of the first person
     */
    constructor(tenantId, apiKeyId, apiKeySecret, options) {
        assert(tenantId, 'tenantId is required');
        assert(apiKeyId, 'apiKeyId is required');
        assert(apiKeySecret, 'apiKeySecret is required');

        this.tenantId = tenantId;
        this.apiKeyId = apiKeyId;
        this.apiKeySecret = apiKeySecret;
        this.ttl = options.ttl || 3600;
        this.identity = String(options.identity);
    }

    toJwt(algorithm) {
        algorithm = algorithm || DEFAULT_ALGORITHM;
        if (!ALGORITHMS.includes(algorithm)) {
            throw new Error('Algorithm not supported. Allowed values are ' + ALGORITHMS.join(', '));
        }

        var now = Math.floor(Date.now() / 1000);
        
        var payload = {
            jti: this.apiKeyId + '-' + now,
            grants: { identity: this.identity },
        };

        var header = {
            cty: 'parra-fpa;v=1',
            typ: 'JWT',
        };

        return jwt.sign(payload, this.apiKeySecret, {
            header: header,
            algorithm: algorithm,
            issuer: this.apiKeyId,
            subject: this.tenantId,
            expiresIn: this.ttl,
        });
    }
}

module.exports = { AccessToken };
