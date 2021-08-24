/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesLane_query$ref = any;
export type ActivitiesLaneTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
|};
export type ActivitiesLaneTipsQueryResponse = {|
  +$fragmentRefs: ActivitiesLane_query$ref
|};
export type ActivitiesLaneTipsQuery = {|
  variables: ActivitiesLaneTipsQueryVariables,
  response: ActivitiesLaneTipsQueryResponse,
|};
*/


/*
query ActivitiesLaneTipsQuery(
  $cursor: String
  $topicId: ID
) {
  ...ActivitiesLane_query_sq8rb
}

fragment ActivitiesLane_query_sq8rb on Query {
  tips(first: 15, after: $cursor, topicId: $topicId, topicsParams: {"tagged":["project"]}) {
    edges {
      node {
        id
        title
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "topicsParams",
    "value": {
      "tagged": [
        "project"
      ]
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivitiesLaneTipsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivitiesLane_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivitiesLaneTipsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tip",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "topicId",
          "topicsParams"
        ],
        "handle": "connection",
        "key": "ActivitiesLane_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "e42a4bc6c7b9ee867c0bb33fb5180830",
    "id": null,
    "metadata": {},
    "name": "ActivitiesLaneTipsQuery",
    "operationKind": "query",
    "text": "query ActivitiesLaneTipsQuery(\n  $cursor: String\n  $topicId: ID\n) {\n  ...ActivitiesLane_query_sq8rb\n}\n\nfragment ActivitiesLane_query_sq8rb on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, topicsParams: {\"tagged\":[\"project\"]}) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e96f851b98c2cb79e14ec2cb75ce1f77';

module.exports = node;
