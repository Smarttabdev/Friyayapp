/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ActivityEnum = "someone_added_to_domain" | "someone_adds_label_to_tip" | "someone_adds_tip" | "someone_adds_topic" | "someone_archives_tip" | "someone_assigned_tip" | "someone_comments_on_tip" | "someone_completed_tip" | "someone_deletes_tip" | "someone_joins_domain" | "someone_likes_tip" | "someone_moves_tip" | "someone_shared_tip_with_me" | "someone_shared_topic_with_me" | "someone_updates_tip" | "someone_updates_topic" | "%future added value";
export type ActivityLensTipActivitiesQueryVariables = {||};
export type ActivityLensTipActivitiesQueryResponse = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +activities: ?$ReadOnlyArray<{|
          +action: ?ActivityEnum,
          +read: ?boolean,
          +createdAt: string,
          +reportable: ?{|
            +id?: string,
            +title?: ?string,
          |},
          +object: ?{|
            +name?: ?string,
            +color?: ?string,
            +kind?: ?string,
          |},
          +notifier: ?{|
            +id: string,
            +name: string,
          |},
        |}>,
      |}
    |}>
  |}
|};
export type ActivityLensTipActivitiesQuery = {|
  variables: ActivityLensTipActivitiesQueryVariables,
  response: ActivityLensTipActivitiesQueryResponse,
|};
*/


/*
query ActivityLensTipActivitiesQuery {
  tips(first: 15) {
    edges {
      node {
        id
        title
        activities {
          action
          read
          createdAt
          reportable {
            __typename
            ... on Tip {
              id
              title
            }
            id
          }
          object {
            __typename
            ... on Label {
              name
              color
              kind
            }
            id
          }
          notifier {
            id
            name
          }
          id
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "action",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "read",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "color",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kind",
      "storageKey": null
    }
  ],
  "type": "Label",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "notifier",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLensTipActivitiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Activity",
                    "kind": "LinkedField",
                    "name": "activities",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "reportable",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/)
                            ],
                            "type": "Tip",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "object",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "tips(first:15)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActivityLensTipActivitiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Activity",
                    "kind": "LinkedField",
                    "name": "activities",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "reportable",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/)
                            ],
                            "type": "Tip",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "object",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v1/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "tips(first:15)"
      }
    ]
  },
  "params": {
    "cacheID": "7ec00c6b29f6af1c1fba5c2c201cd674",
    "id": null,
    "metadata": {},
    "name": "ActivityLensTipActivitiesQuery",
    "operationKind": "query",
    "text": "query ActivityLensTipActivitiesQuery {\n  tips(first: 15) {\n    edges {\n      node {\n        id\n        title\n        activities {\n          action\n          read\n          createdAt\n          reportable {\n            __typename\n            ... on Tip {\n              id\n              title\n            }\n            id\n          }\n          object {\n            __typename\n            ... on Label {\n              name\n              color\n              kind\n            }\n            id\n          }\n          notifier {\n            id\n            name\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2ae90cdfa3914177e7f1d26286b63396';

module.exports = node;
