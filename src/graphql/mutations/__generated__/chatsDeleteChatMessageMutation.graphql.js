/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatsDeleteChatMessageMutationVariables = {|
  id: string
|};
export type chatsDeleteChatMessageMutationResponse = {|
  +deleteChatMessage: ?{|
    +chatMessage: ?{|
      +id: string
    |}
  |}
|};
export type chatsDeleteChatMessageMutation = {|
  variables: chatsDeleteChatMessageMutationVariables,
  response: chatsDeleteChatMessageMutationResponse,
|};
*/


/*
mutation chatsDeleteChatMessageMutation(
  $id: ID!
) {
  deleteChatMessage(input: {id: $id}) {
    chatMessage {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "DeleteChatMessagePayload",
    "kind": "LinkedField",
    "name": "deleteChatMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatMessage",
        "kind": "LinkedField",
        "name": "chatMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatsDeleteChatMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatsDeleteChatMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0d1e6168c2c10ca8e3657d1a812fc5a",
    "id": null,
    "metadata": {},
    "name": "chatsDeleteChatMessageMutation",
    "operationKind": "mutation",
    "text": "mutation chatsDeleteChatMessageMutation(\n  $id: ID!\n) {\n  deleteChatMessage(input: {id: $id}) {\n    chatMessage {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3a6949fc9084f8d930eb47521844f1d7';

module.exports = node;
