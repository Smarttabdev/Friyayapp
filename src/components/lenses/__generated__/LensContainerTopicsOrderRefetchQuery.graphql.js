/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LensContainer_topicsOrderQuery$ref = any;
export type LensContainerTopicsOrderRefetchQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type LensContainerTopicsOrderRefetchQueryResponse = {|
  +$fragmentRefs: LensContainer_topicsOrderQuery$ref
|};
export type LensContainerTopicsOrderRefetchQuery = {|
  variables: LensContainerTopicsOrderRefetchQueryVariables,
  response: LensContainerTopicsOrderRefetchQueryResponse,
|};
*/


/*
query LensContainerTopicsOrderRefetchQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
) {
  ...LensContainer_topicsOrderQuery_1fsNJc
}

fragment LensContainer_topicsOrderQuery_1fsNJc on Query {
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
v3 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v4 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v5 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LensContainerTopicsOrderRefetchQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "LensContainer_topicsOrderQuery"
      }
    ],
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
    "name": "LensContainerTopicsOrderRefetchQuery",
    "selections": [
      {
        "alias": "activeTopicsOrder",
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "topics"
          },
          (v5/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "f72e10831cf10f54bdea1404e27e3fab",
    "id": null,
    "metadata": {},
    "name": "LensContainerTopicsOrderRefetchQuery",
    "operationKind": "query",
    "text": "query LensContainerTopicsOrderRefetchQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n) {\n  ...LensContainer_topicsOrderQuery_1fsNJc\n}\n\nfragment LensContainer_topicsOrderQuery_1fsNJc on Query {\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '68bd33d59d63e1b58c73e1f2f712a59d';

module.exports = node;
