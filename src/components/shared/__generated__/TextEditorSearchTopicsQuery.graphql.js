/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TextEditorSearchTopicsQueryVariables = {|
  title?: ?string
|};
export type TextEditorSearchTopicsQueryResponse = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +slug: string,
        +tagList: ?$ReadOnlyArray<string>,
      |}
    |}>
  |}
|};
export type TextEditorSearchTopicsQuery = {|
  variables: TextEditorSearchTopicsQueryVariables,
  response: TextEditorSearchTopicsQueryResponse,
|};
*/


/*
query TextEditorSearchTopicsQuery(
  $title: String
) {
  topics(first: 10, all: true, title: $title) {
    edges {
      node {
        id
        title
        slug
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
    "name": "title"
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
        "kind": "Literal",
        "name": "first",
        "value": 10
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
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
    "name": "TextEditorSearchTopicsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TextEditorSearchTopicsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b245a721c71ea9d5d7138c839fb3d9a",
    "id": null,
    "metadata": {},
    "name": "TextEditorSearchTopicsQuery",
    "operationKind": "query",
    "text": "query TextEditorSearchTopicsQuery(\n  $title: String\n) {\n  topics(first: 10, all: true, title: $title) {\n    edges {\n      node {\n        id\n        title\n        slug\n        tagList\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'aebb36cd2826bc65f6ed3b88276c1a59';

module.exports = node;
