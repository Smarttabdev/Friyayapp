/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenTwo_query$ref = any;
export type OrganizerQuizScreenTwoRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenTwoRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenTwo_query$ref
|};
export type OrganizerQuizScreenTwoRefetchQuery = {|
  variables: OrganizerQuizScreenTwoRefetchQueryVariables,
  response: OrganizerQuizScreenTwoRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenTwoRefetchQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenTwo_query_1JS2nm
}

fragment OrganizerQuizScreenTwo_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen2") {
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
    "name": "OrganizerQuizScreenTwoRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenTwo_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenTwoRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen2"
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
    "cacheID": "83fe5b1087aa1a354885c2791876ffa3",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenTwoRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenTwoRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenTwo_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenTwo_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen2\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '399ce7f5712e815f9e3967b9773ef018';

module.exports = node;
