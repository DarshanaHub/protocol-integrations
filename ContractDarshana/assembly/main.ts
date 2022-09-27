import { PostedValidation, registersValidation } from "./model";

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 30;

// Adds a new message under the name of the sender's account id.
export function addRegisterValidation(
  talentId: string,
  typePublish: string,
  id: string
): void {
  const newRegisters = new PostedValidation(talentId, typePublish, id);
  registersValidation.push(newRegisters);
}

// Returns an array of last registers.\
export function getRegisters(): PostedValidation[] {
  const numMessages = min(MESSAGE_LIMIT, registersValidation.length);
  const startIndex = registersValidation.length - numMessages;
  const result = new Array<PostedValidation>(numMessages);
  for (let i = 0; i < numMessages; i++) {
    result[i] = registersValidation[i + startIndex];
  }
  return result;
}
