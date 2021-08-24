/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopicsTable_topicsQuery$ref: FragmentReference;
declare export opaque type TopicsTable_topicsQuery$fragmentType: TopicsTable_topicsQuery$ref;
export type TopicsTable_topicsQuery = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
      |}
    |}>
  |},
  +$refType: TopicsTable_topicsQuery$ref,
|};
export type TopicsTable_topicsQuery$data = TopicsTable_topicsQuery;
export type TopicsTable_topicsQuery$key = {
  +$data?: TopicsTable_topicsQuery$data,
  +$fragmentRefs: TopicsTable_topicsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "parentId"
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
  "name": "TopicsTable_topicsQuery",
  "selections": [
    {
      "alias": "topics",
      "args": [
        {
          "kind": "Variable",
          "name": "parentId",
          "variableName": "parentId"
        },
        {
          "kind": "Variable",
          "name": "tagged",
          "variableName": "tagged"
        }
      ],
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__TopicsTable_topics_connection",
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
// prettier-ignore
(node/*: any*/).hash = 'd0dbb23857964b62376f9200e13d955b';

module.exports = node;
