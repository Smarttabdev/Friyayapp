/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GridBodyQueryVariables = {|
  topicIds?: ?$ReadOnlyArray<string>
|};
export type GridBodyQueryResponse = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +tagList: ?$ReadOnlyArray<string>,
      |}
    |}>
  |}
|};
export type GridBodyQuery = {|
  variables: GridBodyQueryVariables,
  response: GridBodyQueryResponse,
|};
*/


/*
query GridBodyQuery(
  $topicIds: [ID!]
) {
  topics(ids: $topicIds) {
    edges {
      node {
        id
        title
        tagList
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
    "name": "topicIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ids",
        "variableName": "topicIds"
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
                "name": "tagList",
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
    "name": "GridBodyQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GridBodyQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "34781bea5ee63faaa8bb9daf75fa1fd6",
    "id": null,
    "metadata": {},
    "name": "GridBodyQuery",
    "operationKind": "query",
    "text": "query GridBodyQuery(\n  $topicIds: [ID!]\n) {\n  topics(ids: $topicIds) {\n    edges {\n      node {\n        id\n        title\n        tagList\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '41098f0ac9cad6f949980cefa054c2f8';

module.exports = node;
