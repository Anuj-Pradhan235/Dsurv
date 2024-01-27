import React,{useState} from "react";
import {Principal} from "@dfinity/principal";
import { token_backend} from "../../../declarations/token_backend";
import { createActor , canisterId} from "../../../declarations/token_backend";
import { AuthClient } from "@dfinity/auth-client";
function Transfer() {
  const [recipientId,setId]=useState("");
  const[amount,setAmount]=useState("");
  const[disabled,setDisabled]=useState(false);
  const [feedBack,setFeedBack]=useState("");
  const[hidden,setHidden]=useState(true);
  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const recipient=Principal.fromText(recipientId);
    const amountToTransfer=Number(amount);

    const authClient=await AuthClient.create();
    const identity =await authClient.getIdentity();

    const authenticatedCanister=createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });

    const result=await authenticatedCanister.transfer(recipient,amountToTransfer);
    setFeedBack(result);
    setHidden(false);
    setDisabled(false);
    
    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedBack}</p>
      </div>
    </div>
  );
}

export default Transfer;
