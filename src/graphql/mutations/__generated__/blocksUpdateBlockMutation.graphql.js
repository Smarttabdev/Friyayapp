/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type blocksUpdateBlockMutationVariables = {|
  id: string,
  position?: ?number,
  config?: ?any,
|};
export type blocksUpdateBlockMutationResponse = {|
  +updateBlock: ?{|
    +block: ?{|
      +id: string,
      +position: number,
      +config: any,
    |}
  |}
|};
export type blocksUpdateBlockMutation = {|
  variables: blocksUpdateBlockMutationVariables,
  response: blocksUpdateBlockMutationResponse,
|};
*/


/*
mutation blocksUpdateBlockMutation(
  $id: ID!
  $position: Int
  $config: JSON
) {
  updateBlock(input: {id: $id, position: $position, config: $config}) {
    block {
      id
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
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "position"
},
v3 = [
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
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "position",
            "variableName": "position"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateBlockPayload",
    "kind": "LinkedField",
    "name": "updateBlock",
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
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "blocksUpdateBlockMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "blocksUpdateBlockMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "afe17f08cb0a24eb0b5f43f46ff46356",
    "id": null,
    "metadata": {},
    "name": "blocksUpdateBlockMutation",
    "operationKind": "mutation",
    "text": "mutation blocksUpdateBlockMutation(\n  $id: ID!\n  $position: Int\n  $config: JSON\n) {\n  updateBlock(input: {id: $id, position: $position, config: $config}) {\n    block {\n      id\n      position\n      config\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6479727554a217cc09e6023a54c658ea';

module.exports = node;
