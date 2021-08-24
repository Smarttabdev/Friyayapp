/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatsMarkReadChatMessageMutationVariables = {|
  id: string
|};
export type chatsMarkReadChatMessageMutationResponse = {|
  +markReadChatMessage: ?{|
    +chatMessage: ?{|
      +id: string,
      +unread: ?boolean,
    |}
  |}
|};
export type chatsMarkReadChatMessageMutation = {|
  variables: chatsMarkReadChatMessageMutationVariables,
  response: chatsMarkReadChatMessageMutationResponse,
|};
*/


/*
mutation chatsMarkReadChatMessageMutation(
  $id: ID!
) {
  markReadChatMessage(input: {id: $id}) {
    chatMessage {
      id
      unread
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
    "concreteType": "MarkReadChatMessagePayload",
    "kind": "LinkedField",
    "name": "markReadChatMessage",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unread",
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
    "name": "chatsMarkReadChatMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatsMarkReadChatMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c196d2c5de28ae2ecdc5d24d21c97128",
    "id": null,
    "metadata": {},
    "name": "chatsMarkReadChatMessageMutation",
    "operationKind": "mutation",
    "text": "mutation chatsMarkReadChatMessageMutation(\n  $id: ID!\n) {\n  markReadChatMessage(input: {id: $id}) {\n    chatMessage {\n      id\n      unread\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '89240c111102da4da9898a08e6c4a146';

module.exports = node;
