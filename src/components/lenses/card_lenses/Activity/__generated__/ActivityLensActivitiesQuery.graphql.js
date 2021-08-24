/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ActivityEnum = "someone_added_to_domain" | "someone_adds_label_to_tip" | "someone_adds_tip" | "someone_adds_topic" | "someone_archives_tip" | "someone_assigned_tip" | "someone_comments_on_tip" | "someone_completed_tip" | "someone_deletes_tip" | "someone_joins_domain" | "someone_likes_tip" | "someone_moves_tip" | "someone_shared_tip_with_me" | "someone_shared_topic_with_me" | "someone_updates_tip" | "someone_updates_topic" | "%future added value";
export type ActivityLensActivitiesQueryVariables = {||};
export type ActivityLensActivitiesQueryResponse = {|
  +activities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +action: ?ActivityEnum,
        +read: ?boolean,
        +createdAt: string,
        +reportableType: ?string,
        +reportable: ?{|
          +id?: string,
          +title?: ?string,
          +slug?: string,
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
      |}
    |}>
  |}
|};
export type ActivityLensActivitiesQuery = {|
  variables: ActivityLensActivitiesQueryVariables,
  response: ActivityLensActivitiesQueryResponse,
|};
*/


/*
query ActivityLensActivitiesQuery {
  activities(first: 15) {
    edges {
      node {
        action
        read
        createdAt
        reportableType
        reportable {
          __typename
          ... on Tip {
            id
            title
            slug
          }
          ... on Topic {
            id
            title
            slug
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
  "name": "action",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "read",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reportableType",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v9/*: any*/),
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
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "notifier",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = [
  (v6/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityLensActivitiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ActivityConnection",
        "kind": "LinkedField",
        "name": "activities",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivityEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Activity",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                        "selections": (v8/*: any*/),
                        "type": "Tip",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v8/*: any*/),
                        "type": "Topic",
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
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "activities(first:15)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActivityLensActivitiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ActivityConnection",
        "kind": "LinkedField",
        "name": "activities",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivityEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Activity",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "reportable",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v13/*: any*/),
                        "type": "Tip",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v13/*: any*/),
                        "type": "Topic",
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
                      (v12/*: any*/),
                      (v5/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "activities(first:15)"
      }
    ]
  },
  "params": {
    "cacheID": "76c136316079d7b837d2494dcd58f48a",
    "id": null,
    "metadata": {},
    "name": "ActivityLensActivitiesQuery",
    "operationKind": "query",
    "text": "query ActivityLensActivitiesQuery {\n  activities(first: 15) {\n    edges {\n      node {\n        action\n        read\n        createdAt\n        reportableType\n        reportable {\n          __typename\n          ... on Tip {\n            id\n            title\n            slug\n          }\n          ... on Topic {\n            id\n            title\n            slug\n          }\n          id\n        }\n        object {\n          __typename\n          ... on Label {\n            name\n            color\n            kind\n          }\n          id\n        }\n        notifier {\n          id\n          name\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b76b6f8f2dada512d3c08c1cd9960fae';

module.exports = node;
