/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sol_forms_escrow.json`.
 */
export type SolFormsEscrow = {
  "address": "KzXK3nTcUD6KaG5aBkBmRkMy61un83K8YoQNzv72zqb",
  "metadata": {
    "name": "solFormsEscrow",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEntry",
      "discriminator": [
        248,
        207,
        142,
        242,
        66,
        162,
        150,
        16
      ],
      "accounts": [
        {
          "name": "formEntry",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "budget",
          "type": "u64"
        },
        {
          "name": "cpr",
          "type": "u64"
        },
        {
          "name": "entryId",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "creator",
          "type": "string"
        }
      ]
    },
    {
      "name": "reward",
      "discriminator": [
        1,
        189,
        15,
        193,
        243,
        42,
        133,
        82
      ],
      "accounts": [
        {
          "name": "formEntry",
          "writable": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "formState",
      "discriminator": [
        58,
        23,
        217,
        27,
        4,
        230,
        20,
        75
      ]
    }
  ],
  "types": [
    {
      "name": "formState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cpr",
            "type": "u64"
          },
          {
            "name": "budget",
            "type": "u64"
          },
          {
            "name": "entryId",
            "type": "u64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "string"
          }
        ]
      }
    }
  ]
};
