/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type cardBodyPreviewQueryVariables = {|
  topicIds?: ?$ReadOnlyArray<string>
|};
export type cardBodyPreviewQueryResponse = {|
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
export type cardBodyPreviewQuery = {|
  variables: cardBodyPreviewQueryVariables,
  response: cardBodyPreviewQueryResponse,
|};
*/


/*
query cardBodyPreviewQuery(
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
    "name": "cardBodyPreviewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "cardBodyPreviewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f3f96a81423ba648e17bec26611c55a2",
    "id": null,
    "metadata": {},
    "name": "cardBodyPreviewQuery",
    "operationKind": "query",
    "text": "query cardBodyPreviewQuery(\n  $topicIds: [ID!]\n) {\n  topics(ids: $topicIds) {\n    edges {\n      node {\n        id\n        title\n        tagList\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '27496dcff82da7523c787557b2bc6524';

module.exports = node;
