/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LensContainer_filtersOrderQuery$ref = any;
type LensContainer_topicsOrderQuery$ref = any;
export type LensContainerQueryVariables = {|
  parentTopicId: string,
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
  boardTabsClosedConfig: string,
|};
export type LensContainerQueryResponse = {|
  +boardTabsClosed: ?{|
    +value: ?any
  |},
  +$fragmentRefs: LensContainer_topicsOrderQuery$ref & LensContainer_filtersOrderQuery$ref,
|};
export type LensContainerQuery = {|
  variables: LensContainerQueryVariables,
  response: LensContainerQueryResponse,
|};
*/


/*
query LensContainerQuery(
  $parentTopicId: ID!
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
  $boardTabsClosedConfig: String!
) {
  ...LensContainer_topicsOrderQuery_1fsNJc
  ...LensContainer_filtersOrderQuery_1fsNJc
  boardTabsClosed: config(owner: $parentTopicId, config: $boardTabsClosedConfig) {
    value
    id
  }
}

fragment LensContainer_filtersOrderQuery_1fsNJc on Query {
  activeFiltersOrder: activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
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
  "name": "boardTabsClosedConfig"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "parentTopicId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v5 = [
  {
    "kind": "Variable",
    "name": "config",
    "variableName": "boardTabsClosedConfig"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "parentTopicId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v7 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v8 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v9 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v10 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v11/*: any*/),
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
    "name": "LensContainerQuery",
    "selections": [
      {
        "alias": "boardTabsClosed",
        "args": (v5/*: any*/),
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": (v10/*: any*/),
        "kind": "FragmentSpread",
        "name": "LensContainer_topicsOrderQuery"
      },
      {
        "args": (v10/*: any*/),
        "kind": "FragmentSpread",
        "name": "LensContainer_filtersOrderQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "LensContainerQuery",
    "selections": [
      {
        "alias": "activeTopicsOrder",
        "args": [
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "topics"
          },
          (v9/*: any*/)
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": (v12/*: any*/),
        "storageKey": null
      },
      {
        "alias": "activeFiltersOrder",
        "args": [
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "filters"
          },
          (v9/*: any*/)
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": (v12/*: any*/),
        "storageKey": null
      },
      {
        "alias": "boardTabsClosed",
        "args": (v5/*: any*/),
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b40db391335aa3256dc8670f04c5cba0",
    "id": null,
    "metadata": {},
    "name": "LensContainerQuery",
    "operationKind": "query",
    "text": "query LensContainerQuery(\n  $parentTopicId: ID!\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n  $boardTabsClosedConfig: String!\n) {\n  ...LensContainer_topicsOrderQuery_1fsNJc\n  ...LensContainer_filtersOrderQuery_1fsNJc\n  boardTabsClosed: config(owner: $parentTopicId, config: $boardTabsClosedConfig) {\n    value\n    id\n  }\n}\n\nfragment LensContainer_filtersOrderQuery_1fsNJc on Query {\n  activeFiltersOrder: activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n\nfragment LensContainer_topicsOrderQuery_1fsNJc on Query {\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '147abf30cdd655630818dbde5f71b0ad';

module.exports = node;
