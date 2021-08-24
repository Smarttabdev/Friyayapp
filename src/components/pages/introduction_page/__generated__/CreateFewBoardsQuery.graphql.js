/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateFewBoardsQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type CreateFewBoardsQueryResponse = {|
  +activeTopicsOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type CreateFewBoardsQuery = {|
  variables: CreateFewBoardsQueryVariables,
  response: CreateFewBoardsQueryResponse,
|};
*/


/*
query CreateFewBoardsQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = [
  {
    "alias": "activeTopicsOrder",
    "args": [
      {
        "kind": "Variable",
        "name": "lenseId",
        "variableName": "lenseId"
      },
      {
        "kind": "Variable",
        "name": "lenseKey",
        "variableName": "lenseKey"
      },
      {
        "kind": "Literal",
        "name": "orderType",
        "value": "topics"
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "CustomOrder",
    "kind": "LinkedField",
    "name": "activeCustomOrder",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "order",
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
    "name": "CreateFewBoardsQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateFewBoardsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "a1b493d9558f66202ea909f5883fcb63",
    "id": null,
    "metadata": {},
    "name": "CreateFewBoardsQuery",
    "operationKind": "query",
    "text": "query CreateFewBoardsQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd1d0efdcdec5041e1a1e01cc6a4fe303';

module.exports = node;
