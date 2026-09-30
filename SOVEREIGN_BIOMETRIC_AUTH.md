# Specification: Sovereign Biometric Authentication Standard (No-Gateway Identity Element)

This layer implements direct hardware-isolated identity verification over the web by leveraging the **WebAuthn API standard**. It converts a user's on-device biometric data (Apple FaceID, TouchID, or Android Biometric Prompt) directly into a unique cryptographic signature, entirely removing the need for a centralized email/password login or vulnerable third-party authentication servers.

┌───────────────────┐    1. Initiate Auth Req    ┌──────────────────┐
│   BITCOIN BANK    ├───────────────────────────►│ HARDWARE ENCLAVE │
│  FRONTEND (v0)    │◄───────────────────────────┤ (Secure Element) │
└───────────────────┘     2. Assert Biometric    └──────────────────┘
                          │
                          ▼
                 [Generates Unique]
                [KeyPair per Origin]

## 1. Cryptographic Registration Payload
When a user sets up their Bitcoin Bank node identity, the browser calls the secure hardware enclave to generate a new public/private keypair bound permanently to the specific domain origin.

```javascript
const registrationOptions = {
    challenge: Uint8Array.from("bitcoin-bank-entropy-challenge-string", c => c.charCodeAt(0)),
    rp: { name: "Bitcoin Bank Ecosystem", id: window.location.hostname },
    user: {
        id: Uint8Array.from("SOVEREIGN_USER_ID", c => c.charCodeAt(0)),
        name: "sovereign_citizen@bitcoinbank",
        displayName: "Sovereign Citizen"
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256 Cryptographic Algorithm
    authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
    timeout: 60000
};

// Invokes Apple FaceID / Android Fingerprint Hardware directly
const credential = await navigator.credentials.create({ publicKey: registrationOptions });
```

## 2. Assertion and Verification Module
Every subsequent automated Layer 3 transaction requires local device biometric confirmation. The hardware signs an unalterable network challenge payload without ever exposing the private root key to the internet.

```javascript
const assertionOptions = {
    challenge: Uint8Array.from("transaction-signing-challenge-hash", c => c.charCodeAt(0)),
    rpId: window.location.hostname,
    userVerification: "required"
};

// Requests instant cryptographic confirmation via on-device hardware biometric
const assertion = await navigator.credentials.get({ publicKey: assertionOptions });
```
