/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type topicsSelectMenuOrderTopicsQueryVariables = {|
  ids?: ?$ReadOnlyArray<string>
|};
export type topicsSelectMenuOrderTopicsQueryResponse = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +slug: string,
        +kind: string,
      |}
    |}>
  |}
|};
export type topicsSelectMenuOrderTopicsQuery = {|
  variables: topicsSelectMenuOrderTopicsQueryVariables,
  response: topicsSelectMenuOrderTopicsQueryResponse,
|};
*/


/*
query topicsSelectMenuOrderTopicsQuery(
  $ids: [ID!]
) {
  topics(ids: $ids, all: true) {
    edges {
      node {
        id
        title
        slug
        kind
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "all",
        "value": true
      },
      {
        "kind": "Variable",
        "name": "ids",
        "variableName": "ids"
      }
    ],
    "concreteType": "TopicConnection",
    "kind": "LinkedField",
    "name": "topics",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "topicsSelectMenuOrderTopicsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "topicsSelectMenuOrderTopicsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4d42319ecd2b6548b5bbf6f459bd8faa",
    "id": null,
    "metadata": {},
    "name": "topicsSelectMenuOrderTopicsQuery",
    "operationKind": "query",
    "text": "query topicsSelectMenuOrderTopicsQuery(\n  $ids: [ID!]\n) {\n  topics(ids: $ids, all: true) {\n    edges {\n      node {\n        id\n        title\n        slug\n        kind\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '991241f32daffb2679ba3f40ca175912';

module.exports = node;
