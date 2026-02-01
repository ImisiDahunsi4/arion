/**
 * ZK Proof Generation Utilities (Browser Compatible)
 * 
 * This file provides functions for generating zero-knowledge proofs for privacy-preserving 
 * transactions on Solana. It is adapted for browser usage (no fs/child_process).
 */

import * as anchor from "@coral-xyz/anchor";
// @ts-ignore
import { groth16 } from 'snarkjs';
import { utils } from 'ffjavascript';
import { FIELD_SIZE } from './constants';

// Define interfaces for the proof structures
export interface Proof {
  pi_a: string[];
  pi_b: string[][];
  pi_c: string[];
  protocol: string;
  curve: string;
}

/**
 * Generates a ZK proof using snarkjs and formats it for use on-chain
 * 
 * @param input The circuit inputs to generate a proof for
 * @param keyBasePath The base path for the circuit keys (.wasm and .zkey files) - defaults to /circuits/transaction2
 * @returns A proof object with formatted proof elements and public signals
 */
export async function prove(input: any, keyBasePath: string = '/circuits/transaction2'): Promise<{
  proof: Proof
  publicSignals: string[];
}> {
  // In browser, snarkjs fetches these paths if provided as strings
  return await groth16.fullProve(
    utils.stringifyBigInts(input),
    `${keyBasePath}.wasm`,
    `${keyBasePath}.zkey`,
  )
}

export function parseProofToBytesArray(
  proof: Proof,
  compressed: boolean = false,
): {
  proofA: number[];
  proofB: number[][];
  proofC: number[];
} {
  const proofJson = JSON.stringify(proof, null, 1);
  const mydata = JSON.parse(proofJson.toString());
  try {
    for (const i in mydata) {
      if (i == "pi_a" || i == "pi_c") {
        for (const j in mydata[i]) {
          mydata[i][j] = Array.from(
            utils.leInt2Buff(utils.unstringifyBigInts(mydata[i][j]), 32),
          ).reverse();
        }
      } else if (i == "pi_b") {
        for (const j in mydata[i]) {
          for (const z in mydata[i][j]) {
            mydata[i][j][z] = Array.from(
              utils.leInt2Buff(utils.unstringifyBigInts(mydata[i][j][z]), 32),
            );
          }
        }
      }
    }

    if (compressed) {
      const proofA = mydata.pi_a[0];
      // negate proof by reversing the bitmask
      const proofAIsPositive = yElementIsPositiveG1(
        new anchor.BN(mydata.pi_a[1]),
      )
        ? false
        : true;
      proofA[0] = addBitmaskToByte(proofA[0], proofAIsPositive);
      const proofB = mydata.pi_b[0].flat().reverse();
      const proofBY = mydata.pi_b[1].flat().reverse();
      const proofBIsPositive = yElementIsPositiveG2(
        new anchor.BN(proofBY.slice(0, 32)),
        new anchor.BN(proofBY.slice(32, 64)),
      );
      proofB[0] = addBitmaskToByte(proofB[0], proofBIsPositive);
      const proofC = mydata.pi_c[0];
      const proofCIsPositive = yElementIsPositiveG1(
        new anchor.BN(mydata.pi_c[1]),
      );
      proofC[0] = addBitmaskToByte(proofC[0], proofCIsPositive);
      return {
        proofA,
        proofB,
        proofC,
      };
    }
    return {
      proofA: [mydata.pi_a[0], mydata.pi_a[1]].flat(),
      proofB: [
        mydata.pi_b[0].flat().reverse(),
        mydata.pi_b[1].flat().reverse(),
      ].flat(),
      proofC: [mydata.pi_c[0], mydata.pi_c[1]].flat(),
    };
  } catch (error: any) {
    console.error("Error while parsing the proof.", error.message);
    throw error;
  }
}

// mainly used to parse the public signals of groth16 fullProve
export function parseToBytesArray(publicSignals: string[]): number[][] {
  const publicInputsJson = JSON.stringify(publicSignals, null, 1);
  const publicInputsBytesJson = JSON.parse(publicInputsJson.toString());
  try {
    const publicInputsBytes = new Array<Array<number>>();
    for (const i in publicInputsBytesJson) {
      const ref: Array<number> = Array.from([
        ...utils.leInt2Buff(utils.unstringifyBigInts(publicInputsBytesJson[i]), 32),
      ]).reverse();
      publicInputsBytes.push(ref);
    }

    return publicInputsBytes;
  } catch (error: any) {
    console.error("Error while parsing public inputs.", error.message);
    throw error;
  }
}

function yElementIsPositiveG1(yElement: anchor.BN): boolean {
  return yElement.lte(FIELD_SIZE.sub(yElement));
}

function yElementIsPositiveG2(yElement1: anchor.BN, yElement2: anchor.BN): boolean {
  const fieldMidpoint = FIELD_SIZE.div(new anchor.BN(2));

  // Compare the first component of the y coordinate
  if (yElement1.lt(fieldMidpoint)) {
    return true;
  } else if (yElement1.gt(fieldMidpoint)) {
    return false;
  }

  // If the first component is equal to the midpoint, compare the second component
  return yElement2.lt(fieldMidpoint);
}

function addBitmaskToByte(byte: number, yIsPositive: boolean): number {
  if (!yIsPositive) {
    return (byte |= 1 << 7);
  } else {
    return byte;
  }
}