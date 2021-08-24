/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CardDetailsPreviewQueryVariables = {|
  topicIds?: ?$ReadOnlyArray<string>
|};
export type CardDetailsPreviewQueryResponse = {|
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
export type CardDetailsPreviewQuery = {|
  variables: CardDetailsPreviewQueryVariables,
  response: CardDetailsPreviewQueryResponse,
|};
*/


/*
query CardDetailsPreviewQuery(
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
    "name": "CardDetailsPreviewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CardDetailsPreviewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4e648271d0d1063906a586dcd8b05802",
    "id": null,
    "metadata": {},
    "name": "CardDetailsPreviewQuery",
    "operationKind": "query",
    "text": "query CardDetailsPreviewQuery(\n  $topicIds: [ID!]\n) {\n  topics(ids: $topicIds) {\n    edges {\n      node {\n        id\n        title\n        tagList\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9191b13609d9c5e4359b5d0cea3830be';

module.exports = node;
