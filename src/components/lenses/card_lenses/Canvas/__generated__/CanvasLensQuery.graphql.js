/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CanvasLensQueryVariables = {|
  ownerId: string,
  blockKey?: ?string,
|};
export type CanvasLensQueryResponse = {|
  +blocks: ?$ReadOnlyArray<{|
    +id: string,
    +type: string,
    +position: number,
    +config: any,
  |}>
|};
export type CanvasLensQuery = {|
  variables: CanvasLensQueryVariables,
  response: CanvasLensQueryResponse,
|};
*/


/*
query CanvasLensQuery(
  $ownerId: ID!
  $blockKey: String
) {
  blocks(ownerId: $ownerId, key: $blockKey) {
    id
    type
    position
    config
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "blockKey"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "ownerId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "key",
        "variableName": "blockKey"
      },
      {
        "kind": "Variable",
        "name": "ownerId",
        "variableName": "ownerId"
      }
    ],
    "concreteType": "Block",
    "kind": "LinkedField",
    "name": "blocks",
    "plural": true,
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CanvasLensQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CanvasLensQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "821f5487b6c876a1c15e30df63b84dc7",
    "id": null,
    "metadata": {},
    "name": "CanvasLensQuery",
    "operationKind": "query",
    "text": "query CanvasLensQuery(\n  $ownerId: ID!\n  $blockKey: String\n) {\n  blocks(ownerId: $ownerId, key: $blockKey) {\n    id\n    type\n    position\n    config\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4c7b0a00180b059c9d3971136d1f8564';

module.exports = node;
