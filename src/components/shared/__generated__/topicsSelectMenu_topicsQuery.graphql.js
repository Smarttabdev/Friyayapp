/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type topicsSelectMenu_topicsQuery$ref: FragmentReference;
declare export opaque type topicsSelectMenu_topicsQuery$fragmentType: topicsSelectMenu_topicsQuery$ref;
export type topicsSelectMenu_topicsQuery = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +slug: string,
        +kind: string,
        +masks: ?{|
          +isAdmin: ?boolean,
          +isOwner: ?boolean,
          +isGuest: ?boolean,
          +isCollaborator: ?boolean,
          +isMember: ?boolean,
          +isPower: ?boolean,
        |},
        +abilities: ?{|
          +self: ?{|
            +canCreate: ?boolean
          |},
          +tips: ?{|
            +canCreate: ?boolean
          |},
          +questions: ?{|
            +canCreate: ?boolean
          |},
          +comments: ?{|
            +canCreate: ?boolean
          |},
        |},
      |}
    |}>
  |},
  +$refType: topicsSelectMenu_topicsQuery$ref,
|};
export type topicsSelectMenu_topicsQuery$data = topicsSelectMenu_topicsQuery;
export type topicsSelectMenu_topicsQuery$key = {
  +$data?: topicsSelectMenu_topicsQuery$data,
  +$fragmentRefs: topicsSelectMenu_topicsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "canCreate",
    "storageKey": null
  }
];
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
      "name": "parentId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "searchQuery"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "tagged"
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
          "topics"
        ]
      }
    ]
  },
  "name": "topicsSelectMenu_topicsQuery",
  "selections": [
    {
      "alias": "topics",
      "args": [
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "filter"
        },
        {
          "kind": "Variable",
          "name": "parentId",
          "variableName": "parentId"
        },
        {
          "kind": "Variable",
          "name": "tagged",
          "variableName": "tagged"
        },
        {
          "kind": "Variable",
          "name": "title",
          "variableName": "searchQuery"
        }
      ],
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__topicsSelectMenu_topics_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TopicEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Topic",
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
                  "name": "slug",
                  "storageKey": null
                },
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
                  "concreteType": "Masks",
                  "kind": "LinkedField",
                  "name": "masks",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isAdmin",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isOwner",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isGuest",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isCollaborator",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isMember",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isPower",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "TopicAbilities",
                  "kind": "LinkedField",
                  "name": "abilities",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Abilities",
                      "kind": "LinkedField",
                      "name": "self",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Abilities",
                      "kind": "LinkedField",
                      "name": "tips",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Abilities",
                      "kind": "LinkedField",
                      "name": "questions",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Abilities",
                      "kind": "LinkedField",
                      "name": "comments",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    }
                  ],
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e74409621498d49ea992994497561f4e';

module.exports = node;
