/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenOne_query$ref = any;
export type OrganizerQuizScreenOneRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenOneRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenOne_query$ref
|};
export type OrganizerQuizScreenOneRefetchQuery = {|
  variables: OrganizerQuizScreenOneRefetchQueryVariables,
  response: OrganizerQuizScreenOneRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenOneRefetchQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenOne_query_1JS2nm
}

fragment OrganizerQuizScreenOne_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen1") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizerQuizScreenOneRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenOne_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenOneRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen1"
          },
          (v1/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
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
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4289e5180f0e2677e1b15a5ca1392d50",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenOneRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenOneRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenOne_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenOne_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen1\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7add634be8f212322949234044cdab13';

module.exports = node;
