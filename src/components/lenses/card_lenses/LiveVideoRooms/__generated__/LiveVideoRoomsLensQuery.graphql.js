/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LiveVideoRoomsLens_liveVideoChats$ref = any;
export type LiveVideoRoomsLensQueryVariables = {|
  topicId: string
|};
export type LiveVideoRoomsLensQueryResponse = {|
  +$fragmentRefs: LiveVideoRoomsLens_liveVideoChats$ref
|};
export type LiveVideoRoomsLensQuery = {|
  variables: LiveVideoRoomsLensQueryVariables,
  response: LiveVideoRoomsLensQueryResponse,
|};
*/


/*
query LiveVideoRoomsLensQuery(
  $topicId: ID!
) {
  ...LiveVideoRoomsLens_liveVideoChats_1QjtfV
}

fragment LiveVideoRoomsLens_liveVideoChats_1QjtfV on Query {
  tips(liveVideoChats: true, topicId: $topicId, subtopics: true) {
    edges {
      node {
        id
        title
        topic {
          id
          title
        }
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
    "name": "topicId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveVideoRoomsLensQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "LiveVideoRoomsLens_liveVideoChats"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveVideoRoomsLensQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "liveVideoChats",
            "value": true
          },
          {
            "kind": "Literal",
            "name": "subtopics",
            "value": true
          },
          (v1/*: any*/)
        ],
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Topic",
                    "kind": "LinkedField",
                    "name": "topic",
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c34ec51578df2a1fe52e59f4e945442d",
    "id": null,
    "metadata": {},
    "name": "LiveVideoRoomsLensQuery",
    "operationKind": "query",
    "text": "query LiveVideoRoomsLensQuery(\n  $topicId: ID!\n) {\n  ...LiveVideoRoomsLens_liveVideoChats_1QjtfV\n}\n\nfragment LiveVideoRoomsLens_liveVideoChats_1QjtfV on Query {\n  tips(liveVideoChats: true, topicId: $topicId, subtopics: true) {\n    edges {\n      node {\n        id\n        title\n        topic {\n          id\n          title\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '382017865090b216bda8dfd636760a44';

module.exports = node;
