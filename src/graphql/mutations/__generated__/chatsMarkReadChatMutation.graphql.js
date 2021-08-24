/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatsMarkReadChatMutationVariables = {|
  id: string
|};
export type chatsMarkReadChatMutationResponse = {|
  +markReadChat: ?{|
    +tip: ?{|
      +id: string,
      +chatUnreads: ?number,
    |}
  |}
|};
export type chatsMarkReadChatMutation = {|
  variables: chatsMarkReadChatMutationVariables,
  response: chatsMarkReadChatMutationResponse,
|};
*/


/*
mutation chatsMarkReadChatMutation(
  $id: ID!
) {
  markReadChat(input: {id: $id}) {
    tip {
      id
      chatUnreads
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
    "concreteType": "MarkReadChatPayload",
    "kind": "LinkedField",
    "name": "markReadChat",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
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
            "name": "chatUnreads",
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
    "name": "chatsMarkReadChatMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatsMarkReadChatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "74efd2a374c09a7daa365c9c8490d32b",
    "id": null,
    "metadata": {},
    "name": "chatsMarkReadChatMutation",
    "operationKind": "mutation",
    "text": "mutation chatsMarkReadChatMutation(\n  $id: ID!\n) {\n  markReadChat(input: {id: $id}) {\n    tip {\n      id\n      chatUnreads\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4c6a162d3eeaa576581d3f5a0b441c80';

module.exports = node;
