import { context, PersistentVector } from "near-sdk-as";

// If the user attaches more than 0.01N the message is premium

/** 
 * Exporting a new class PostedValidation so it can be used outside of this file.
 */
@nearBindgen
export class PostedValidation{
  sender: string;
  constructor(public talentId:string,public typePublish: string,public id:string) {
    this.sender = context.predecessor
  }
}

/**
 * Any changes to the PersistentVector will be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const registersValidation = new PersistentVector<PostedValidation>("unique-id-1")
