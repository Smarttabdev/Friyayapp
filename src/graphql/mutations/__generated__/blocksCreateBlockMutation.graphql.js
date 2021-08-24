/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type blocksCreateBlockMutationVariables = {|
  ownerId: string,
  type: string,
  position: number,
  config: any,
  key?: ?string,
|};
export type blocksCreateBlockMutationResponse = {|
  +createBlock: ?{|
    +block: ?{|
      +id: string,
      +type: string,
      +position: number,
      +config: any,
    |}
  |}
|};
export type blocksCreateBlockMutation = {|
  variables: blocksCreateBlockMutationVariables,
  response: blocksCreateBlockMutationResponse,
|};
*/


/*
mutation blocksCreateBlockMutation(
  $ownerId: ID!
  $type: String!
  $position: Int!
  $config: JSON!
  $key: String
) {
  createBlock(input: {ownerId: $ownerId, type: $type, position: $position, config: $config, key: $key}) {
    block {
      id
      type
      position
      config
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "config"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "key"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "ownerId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "position"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "config",
            "variableName": "config"
          },
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key"
          },
          {
            "kind": "Variable",
            "name": "ownerId",
            "variableName": "ownerId"
          },
          {
            "kind": "Variable",
            "name": "position",
            "variableName": "position"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateBlockPayload",
    "kind": "LinkedField",
    "name": "createBlock",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Block",
        "kind": "LinkedField",
        "name": "block",
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
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "position",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "config",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "blocksCreateBlockMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "blocksCreateBlockMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "2b26d2abdc0bb6051bc5971f8edcb1d0",
    "id": null,
    "metadata": {},
    "name": "blocksCreateBlockMutation",
    "operationKind": "mutation",
    "text": "mutation blocksCreateBlockMutation(\n  $ownerId: ID!\n  $type: String!\n  $position: Int!\n  $config: JSON!\n  $key: String\n) {\n  createBlock(input: {ownerId: $ownerId, type: $type, position: $position, config: $config, key: $key}) {\n    block {\n      id\n      type\n      position\n      config\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b42346cc29c5f6a797dc8a5b3b52829e';

module.exports = node;
