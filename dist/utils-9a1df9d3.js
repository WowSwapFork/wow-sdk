var e=require("./index-8256d5ba.js"),r=require("./index-29756f86.js");require("cross-fetch/polyfill"),require("limiter"),require("exponential-backoff"),require("ethers"),require("graphql-request"),require("@openzeppelin/merkle-tree");const n=function(t,i,o,l="v4"){try{let f;function m(e){if(f)return e;const r=p?.data;return{signature:r?.toString()||"",signingScheme:S}}const S="eth_sign"===l?r.EcdsaSigningScheme.ETHSIGN:r.EcdsaSigningScheme.EIP712;let v,p=null;try{switch(l){case"default":case"v3":v=new e.TypedDataVersionedSigner(o);break;case"int_v4":v=new e.IntChainIdTypedDataV4Signer(o);break;default:v=o}}catch(w){throw console.error("Wallet not supported:",w),new r.CowError("Wallet not supported")}const E=function(e,r){try{var n=Promise.resolve(i({...t,signer:v,signingScheme:S})).then(function(e){p=e})}catch(e){return r(e)}return n&&n.then?n.then(void 0,r):n}(0,function(e){if(void 0===(r=e).code&&void 0===r.message)throw console.error(e),e;var r;const m=[a,g].some(r=>[e.message,e.toString()].some(e=>r.test(e)));if(e.code!==c&&!m){if(h.test(e.message)){const e=n(t,i,o,"int_v4");return f=1,e}if(e.code===s){const e=n(t,i,o,"eth_sign");return f=1,e}if(d.test(e.message)){const e=n(t,i,o,"v3");return f=1,e}if(u.test(e.message)){const e=n(t,i,o,"eth_sign");return f=1,e}throw console.error(e),e}switch(l){case"v4":const r=n(t,i,o,"default");return f=1,r;case"default":const s=n(t,i,o,"v3");return f=1,s;case"v3":const c=n(t,i,o,"eth_sign");return f=1,c;default:throw e}});return Promise.resolve(E&&E.then?E.then(m):m(E))}catch(I){return Promise.reject(I)}},t=function(e){try{const{chainId:n,signer:t,signingScheme:i,orderUids:o}=e,s=m(n);return Promise.resolve(r.signOrderCancellations(s,o,t,l[i]))}catch(e){return Promise.reject(e)}},i=function(e){try{const{chainId:n,signer:t,signingScheme:i,orderUid:o}=e,s=m(n);return Promise.resolve(r.signOrderCancellation(s,o,t,l[i]))}catch(e){return Promise.reject(e)}},o=function(e){try{const{chainId:n,signer:t,order:i,signingScheme:o}=e,s=m(n);return Promise.resolve(r.signOrder(s,i,t,l[o]))}catch(e){return Promise.reject(e)}},s=-32603,c=-32601,a=/Method not found/i,d=/eth_signTypedData_v4 does not exist/i,u=/eth_signTypedData_v3 does not exist/i,g=/RPC request failed/i,h=/provided chainid .* must match the active chainid/i,l={[r.EcdsaSigningScheme.EIP712]:r.SigningScheme.EIP712,[r.EcdsaSigningScheme.ETHSIGN]:r.SigningScheme.ETHSIGN};function m(n){const t=r.COW_PROTOCOL_SETTLEMENT_CONTRACT_ADDRESS[n];if(!t)throw new r.CowError("Unsupported network. Settlement contract is not deployed");return e.domain(n,t)}exports.getDomain=m,exports.signOrder=function(e,r,t){return n({order:e,chainId:r},o,t)},exports.signOrderCancellation=function(e,r,t){return n({orderUid:e,chainId:r},i,t)},exports.signOrderCancellations=function(e,r,i){return n({orderUids:e,chainId:r},t,i)};
//# sourceMappingURL=utils-9a1df9d3.js.map