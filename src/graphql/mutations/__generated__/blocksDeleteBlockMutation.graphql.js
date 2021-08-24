/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type blocksDeleteBlockMutationVariables = {|
  id: string
|};
export type blocksDeleteBlockMutationResponse = {|
  +deleteBlock: ?{|
    +id: ?string
  |}
|};
export type blocksDeleteBlockMutation = {|
  variables: blocksDeleteBlockMutationVariables,
  response: blocksDeleteBlockMutationResponse,
|};
*/


/*
mutation blocksDeleteBlockMutation(
  $id: ID!
) {
  deleteBlock(input: {id: $id}) {
    id
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
    "concreteType": "DeleteBlockPayload",
    "kind": "LinkedField",
    "name": "deleteBlock",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "blocksDeleteBlockMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "blocksDeleteBlockMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71b357b327e9c6613745ca14aeca864e",
    "id": null,
    "metadata": {},
    "name": "blocksDeleteBlockMutation",
    "operationKind": "mutation",
    "text": "mutation blocksDeleteBlockMutation(\n  $id: ID!\n) {\n  deleteBlock(input: {id: $id}) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'da4802cb4b0123bf6a2415f93c16bb3c';

module.exports = node;
