/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type ActivityEnum = "someone_added_to_domain" | "someone_adds_label_to_tip" | "someone_adds_tip" | "someone_adds_topic" | "someone_archives_tip" | "someone_assigned_tip" | "someone_comments_on_tip" | "someone_completed_tip" | "someone_deletes_tip" | "someone_joins_domain" | "someone_likes_tip" | "someone_moves_tip" | "someone_shared_tip_with_me" | "someone_shared_topic_with_me" | "someone_updates_tip" | "someone_updates_topic" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type InboxLens_tipsQuery$ref: FragmentReference;
declare export opaque type InboxLens_tipsQuery$fragmentType: InboxLens_tipsQuery$ref;
export type InboxLens_tipsQuery = {|
  +tips: ?{|
    +totalCount: number,
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +slug: string,
        +cardType: ?string,
        +updatedAt: string,
        +tipAssignments: ?$ReadOnlyArray<{|
          +assignmentType: ?string,
          +assignmentId: ?string,
        |}>,
        +labels: ?$ReadOnlyArray<{|
          +id: string,
          +name: ?string,
          +kind: ?string,
          +color: ?string,
        |}>,
        +activities: ?$ReadOnlyArray<{|
          +id: string,
          +action: ?ActivityEnum,
          +read: ?boolean,
          +createdAt: string,
          +object: ?{|
            +id?: string,
            +name?: ?string,
            +kind?: ?string,
            +color?: ?string,
          |},
          +notifier: ?{|
            +id: string,
            +firstName: string,
            +name: string,
            +avatarUrl: ?string,
          |},
          +user: ?{|
            +id: string,
            +firstName: string,
            +name: string,
            +avatarUrl: ?string,
          |},
        |}>,
        +user: {|
          +id: string,
          +firstName: string,
          +name: string,
          +avatarUrl: ?string,
        |},
      |}
    |}>,
  |},
  +$refType: InboxLens_tipsQuery$ref,
|};
export type InboxLens_tipsQuery$data = InboxLens_tipsQuery;
export type InboxLens_tipsQuery$key = {
  +$data?: InboxLens_tipsQuery$data,
  +$fragmentRefs: InboxLens_tipsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "kind",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "color",
    "storageKey": null
  }
],
v3 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "firstName",
    "storageKey": null
  },
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "avatarUrl",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filter"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "labels"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicsParams"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "tips"
        ]
      }
    ]
  },
  "name": "InboxLens_tipsQuery",
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "filter"
        },
        {
          "kind": "Variable",
          "name": "labels",
          "variableName": "labels"
        },
        {
          "kind": "Variable",
          "name": "topicsParams",
          "variableName": "topicsParams"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "__InboxLens_tips_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
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
                (v0/*: any*/),
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
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cardType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "updatedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "TipAssignment",
                  "kind": "LinkedField",
                  "name": "tipAssignments",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "assignmentType",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "assignmentId",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Label",
                  "kind": "LinkedField",
                  "name": "labels",
                  "plural": true,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Activity",
                  "kind": "LinkedField",
                  "name": "activities",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "action",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "read",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "createdAt",
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
                        {
                          "kind": "InlineFragment",
                          "selections": (v2/*: any*/),
                          "type": "Label",
                          "abstractKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "User",
                      "kind": "LinkedField",
                      "name": "notifier",
                      "plural": false,
                      "selections": (v3/*: any*/),
                      "storageKey": null
                    },
                    (v4/*: any*/)
                  ],
                  "storageKey": null
                },
                (v4/*: any*/),
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '9abd7064f06f0f970609ddba525e5f50';

module.exports = node;
