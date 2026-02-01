/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zkcash.json`.
 */
export type Zkcash = {
  "address": "ATZj4jZ4FFzkvAcvk27DW9GRkgSbFnHo49fKKPQXU7VS",
  "metadata": {
    "name": "zkcash",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Anchor program for zkcash"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "treeTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeTreeAccountForSplToken",
      "docs": [
        "* Initialize a new merkle tree for a specific SPL token.\n     * This allows each token type to have its own separate tree.\n     * Only the authority can call this."
      ],
      "discriminator": [
        19,
        59,
        201,
        78,
        69,
        86,
        50,
        209
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "SPL Token mint account"
          ]
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
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
          "name": "maxDepositAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transact",
      "docs": [
        "* Users deposit or withdraw SOL from the program.\n     * \n     * Reentrant attacks are not possible, because nullifier creation is checked by anchor first."
      ],
      "discriminator": [
        217,
        149,
        130,
        143,
        221,
        52,
        252,
        119
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "nullifier0",
          "docs": [
            "Nullifier account to mark the first input as spent.",
            "Using `init` without `init_if_needed` ensures that the transaction",
            "will automatically fail with a system program error if this nullifier",
            "has already been used (i.e., if the account already exists)."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  48
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [0]"
              }
            ]
          }
        },
        {
          "name": "nullifier1",
          "docs": [
            "Nullifier account to mark the second input as spent.",
            "Using `init` without `init_if_needed` ensures that the transaction",
            "will automatically fail with a system program error if this nullifier",
            "has already been used (i.e., if the account already exists)."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [1]"
              }
            ]
          }
        },
        {
          "name": "nullifier2",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  48
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [1]"
              }
            ]
          }
        },
        {
          "name": "nullifier3",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [0]"
              }
            ]
          }
        },
        {
          "name": "treeTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "recipient",
          "writable": true
        },
        {
          "name": "feeRecipientAccount",
          "writable": true
        },
        {
          "name": "signer",
          "docs": [
            "The account that is signing the transaction"
          ],
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
          "name": "proof",
          "type": {
            "defined": {
              "name": "proof"
            }
          }
        },
        {
          "name": "extDataMinified",
          "type": {
            "defined": {
              "name": "extDataMinified"
            }
          }
        },
        {
          "name": "encryptedOutput1",
          "type": "bytes"
        },
        {
          "name": "encryptedOutput2",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "transactSpl",
      "docs": [
        "* Users deposit or withdraw SPL tokens from the program.\n     * \n     * Reentrant attacks are not possible, because nullifier creation is checked by anchor first."
      ],
      "discriminator": [
        154,
        66,
        244,
        204,
        78,
        225,
        163,
        151
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "nullifier0",
          "docs": [
            "Nullifier account to mark the first input as spent.",
            "Using `init` without `init_if_needed` ensures that the transaction",
            "will automatically fail with a system program error if this nullifier",
            "has already been used (i.e., if the account already exists)."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  48
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [0]"
              }
            ]
          }
        },
        {
          "name": "nullifier1",
          "docs": [
            "Nullifier account to mark the second input as spent.",
            "Using `init` without `init_if_needed` ensures that the transaction",
            "will automatically fail with a system program error if this nullifier",
            "has already been used (i.e., if the account already exists)."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [1]"
              }
            ]
          }
        },
        {
          "name": "nullifier2",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  48
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [1]"
              }
            ]
          }
        },
        {
          "name": "nullifier3",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  117,
                  108,
                  108,
                  105,
                  102,
                  105,
                  101,
                  114,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "proof.input_nullifiers [0]"
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "docs": [
            "The account that is signing the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "docs": [
            "SPL Token mint account (required for token operations)"
          ]
        },
        {
          "name": "signerTokenAccount",
          "docs": [
            "Signer's token account (source for deposits)"
          ],
          "writable": true
        },
        {
          "name": "recipient"
        },
        {
          "name": "recipientTokenAccount",
          "docs": [
            "Recipient's token account (destination for withdrawals)",
            "It's relayer's job to account for the rent of the recipient_token_account, to prevent rent",
            "griefing attacks on the relayer's wallet. Relayer adds instruction to init the account."
          ],
          "writable": true
        },
        {
          "name": "treeAta",
          "docs": [
            "Tree's associated token account (destination for deposits, source for withdrawals)",
            "Created automatically if it doesn't exist"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "globalConfig"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "feeRecipientAta",
          "docs": [
            "Fee recipient's associated token account (auto-derived from fee_recipient_account + mint)",
            "Fee recipient ATA is guaranteed to exist for supported tokens"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated Token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "proof"
            }
          }
        },
        {
          "name": "extDataMinified",
          "type": {
            "defined": {
              "name": "extDataMinified"
            }
          }
        },
        {
          "name": "encryptedOutput1",
          "type": "bytes"
        },
        {
          "name": "encryptedOutput2",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updateDepositLimit",
      "docs": [
        "* Update the maximum deposit amount limit. Only the authority can call this."
      ],
      "discriminator": [
        181,
        115,
        65,
        169,
        4,
        1,
        96,
        109
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "The authority account that can update the deposit limit"
          ],
          "signer": true,
          "relations": [
            "treeAccount"
          ]
        }
      ],
      "args": [
        {
          "name": "newLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateDepositLimitForSplToken",
      "docs": [
        "* Update the maximum deposit amount limit for a specific SPL token tree.\n     * Only the authority can call this."
      ],
      "discriminator": [
        248,
        7,
        11,
        9,
        68,
        132,
        16,
        102
      ],
      "accounts": [
        {
          "name": "treeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  116,
                  114,
                  101,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "SPL Token mint account"
          ]
        },
        {
          "name": "authority",
          "docs": [
            "The authority account that can update the deposit limit"
          ],
          "signer": true,
          "relations": [
            "treeAccount"
          ]
        }
      ],
      "args": [
        {
          "name": "newLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateGlobalConfig",
      "docs": [
        "* Update global configuration for SOL and SPL tokens. Only the authority can call this."
      ],
      "discriminator": [
        164,
        84,
        130,
        189,
        111,
        58,
        250,
        200
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "The authority account that can update the global config"
          ],
          "signer": true,
          "relations": [
            "globalConfig"
          ]
        }
      ],
      "args": [
        {
          "name": "depositFeeRate",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "withdrawalFeeRate",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "feeErrorMargin",
          "type": {
            "option": "u16"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalConfig",
      "discriminator": [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      "name": "merkleTreeAccount",
      "discriminator": [
        147,
        200,
        34,
        248,
        131,
        187,
        248,
        253
      ]
    },
    {
      "name": "nullifierAccount",
      "discriminator": [
        250,
        31,
        238,
        177,
        213,
        98,
        48,
        172
      ]
    },
    {
      "name": "treeTokenAccount",
      "discriminator": [
        153,
        63,
        39,
        198,
        74,
        80,
        37,
        204
      ]
    }
  ],
  "events": [
    {
      "name": "commitmentData",
      "discriminator": [
        13,
        110,
        215,
        127,
        244,
        62,
        234,
        34
      ]
    },
    {
      "name": "splCommitmentData",
      "discriminator": [
        236,
        10,
        189,
        217,
        173,
        102,
        131,
        85
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Not authorized to perform this action"
    },
    {
      "code": 6001,
      "name": "extDataHashMismatch",
      "msg": "External data hash does not match the one in the proof"
    },
    {
      "code": 6002,
      "name": "unknownRoot",
      "msg": "Root is not known in the tree"
    },
    {
      "code": 6003,
      "name": "invalidPublicAmountData",
      "msg": "Public amount is invalid"
    },
    {
      "code": 6004,
      "name": "insufficientFundsForWithdrawal",
      "msg": "Insufficient funds for withdrawal"
    },
    {
      "code": 6005,
      "name": "insufficientFundsForFee",
      "msg": "Insufficient funds for fee"
    },
    {
      "code": 6006,
      "name": "invalidProof",
      "msg": "Proof is invalid"
    },
    {
      "code": 6007,
      "name": "invalidFee",
      "msg": "Invalid fee: fee must be less than MAX_ALLOWED_VAL (2^248)."
    },
    {
      "code": 6008,
      "name": "invalidExtAmount",
      "msg": "Invalid ext amount: absolute ext_amount must be less than MAX_ALLOWED_VAL (2^248)."
    },
    {
      "code": 6009,
      "name": "publicAmountCalculationError",
      "msg": "Public amount calculation resulted in an overflow/underflow."
    },
    {
      "code": 6010,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow/underflow occurred"
    },
    {
      "code": 6011,
      "name": "depositLimitExceeded",
      "msg": "Deposit limit exceeded"
    },
    {
      "code": 6012,
      "name": "invalidFeeRate",
      "msg": "Invalid fee rate: must be between 0 and 10000 basis points"
    },
    {
      "code": 6013,
      "name": "invalidFeeRecipient",
      "msg": "Fee recipient does not match global configuration"
    },
    {
      "code": 6014,
      "name": "invalidFeeAmount",
      "msg": "Fee amount is below minimum required (must be at least (1 - fee_error_margin) * expected_fee)"
    },
    {
      "code": 6015,
      "name": "recipientMismatch",
      "msg": "Recipient account does not match the ExtData recipient"
    },
    {
      "code": 6016,
      "name": "merkleTreeFull",
      "msg": "Merkle tree is full: cannot add more leaves"
    },
    {
      "code": 6017,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account: account is not owned by the token program"
    },
    {
      "code": 6018,
      "name": "invalidMintAddress",
      "msg": "Invalid mint address: mint address is not allowed"
    },
    {
      "code": 6019,
      "name": "invalidTokenAccountMintAddress",
      "msg": "Invalid token account mint address"
    }
  ],
  "types": [
    {
      "name": "commitmentData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "commitment",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "encryptedOutput",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "extDataMinified",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "extAmount",
            "type": "i64"
          },
          {
            "name": "fee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "globalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "depositFeeRate",
            "type": "u16"
          },
          {
            "name": "withdrawalFeeRate",
            "type": "u16"
          },
          {
            "name": "feeErrorMargin",
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "merkleTreeAccount",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "nextIndex",
            "type": "u64"
          },
          {
            "name": "subtrees",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                26
              ]
            }
          },
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "rootHistory",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                100
              ]
            }
          },
          {
            "name": "rootIndex",
            "type": "u64"
          },
          {
            "name": "maxDepositAmount",
            "type": "u64"
          },
          {
            "name": "height",
            "type": "u8"
          },
          {
            "name": "rootHistorySize",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "nullifierAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "This account's existence indicates that the nullifier has been used.",
              "No fields needed other than bump for PDA verification."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "proof",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proofA",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "proofB",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "proofC",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "publicAmount",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "extDataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "inputNullifiers",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                2
              ]
            }
          },
          {
            "name": "outputCommitments",
            "type": {
              "array": [
                {
                  "array": [
                    "u8",
                    32
                  ]
                },
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "splCommitmentData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "mintAddress",
            "type": "pubkey"
          },
          {
            "name": "commitment",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "encryptedOutput",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "treeTokenAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
