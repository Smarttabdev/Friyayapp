/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AddCardsToBoards_query$ref: FragmentReference;
declare export opaque type AddCardsToBoards_query$fragmentType: AddCardsToBoards_query$ref;
export type AddCardsToBoards_query = {|
  +topics: ?{|
    +totalCount: number,
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +defaultViewId: ?string,
        +tips: ?{|
          +totalCount: number,
          +edges: ?$ReadOnlyArray<?{|
            +node: ?{|
              +id: string,
              +title: ?string,
            |}
          |}>,
        |},
      |}
    |}>,
  |},
  +tips: ?{|
    +totalCount: number
  |},
  +$refType: AddCardsToBoards_query$ref,
|};
export type AddCardsToBoards_query$data = AddCardsToBoards_query;
export type AddCardsToBoards_query$key = {
  +$data?: AddCardsToBoards_query$data,
  +$fragmentRefs: AddCardsToBoards_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "Literal",
  "name": "sort",
  "value": "created_at desc"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
      "name": "topicId"
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
  "name": "AddCardsToBoards_query",
  "selections": [
    {
      "alias": "topics",
      "args": [
        {
          "kind": "Literal",
          "name": "all",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "parentId",
          "variableName": "topicId"
        },
        (v0/*: any*/)
      ],
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__AddCardsToBoards_topics_connection",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
                (v2/*: any*/),
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "defaultViewId",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    (v0/*: any*/)
                  ],
                  "concreteType": "TipConnection",
                  "kind": "LinkedField",
                  "name": "tips",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
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
                            (v2/*: any*/),
                            (v3/*: any*/)
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": "tips(sort:\"created_at desc\")"
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
      "args": null,
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "tips",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '1df4def474ea6c233c120258845a7b8d';

module.exports = node;
